const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require('../models/Course');
const {uploadImageToCloudinary} = require('../utils/imageUploader');
const CourseProgress = require("../models/CourseProgress");
const {convertSecondsToDuration} = require('../utils/secToDuration')
require('dotenv').config();


exports.updateProfile = async (req, res) => {
    try {
        // get data from req
        const {dateOfBirth="", about="", contactNumber, gender} = req.body;
        // get user id put in user in authentication
        const id = req.user.id;

        // validation
        if (!contactNumber || !gender) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }

        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;

        // find profile
        const profileDetails = await Profile.findById(profileId);

        // update profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;
        profileDetails.gender = gender;
        
        // save updated data using save method
        await profileDetails.save();

        const updatedUserDetails = await User.findById(id)
                                        .populate('additionalDetails').exec();

        // return response
        return res.status(200).json({
            success: true,
            message : 'Profile Updated successfully',
            updatedUserDetails,
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });  
    }
}

// delete account

exports.deleteAccount = async (req, res) => {
    try {
        // get id
        const id = req.user.id;

        // validate
        const userDetails = await User.findById(id);
        if (!userDetails) {
            return res.status(404).json({
                success : false,
                message : 'User not found',
            });
        }

        // delete profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
        
        // TODO : unenroll user from all the enrolled courses and verify it
        for (let courseId of userDetails.courses) {
            await Course.findByIdAndUpdate(courseId, 
                                            {$pull : {
                                                studentsEnrolled : id,
                                            }});
        }


        // delete user
        await User.findByIdAndDelete({_id:id});


        return res.status(200).json({
            success: true,
            message: 'User deleted successfully',
        });

    } catch(error) {
        return res.status(500).json({
            success: false,
            message: 'User cannot be deleted',
            error: error.message,
        }); 
    }
} 

exports.getAllUserDetails = async (req, res) => {
    try {
        // get id
        const id = req.user.id;

        const userDetails = await User.findById(id).populate('additionalDetails').exec();

        userDetails.password = undefined;

        return res.status(200).json({
            success: true,
            message: 'User Data fetched successfully',
            data: userDetails,
        })



    } catch (error) {
        return res.status(500).json({
            success: false,
            message : "Cannot fetch user details"
        })
    }
}

exports.getEnrolledCourses = async (req, res) => {
    try {
        // get id
        const userId = req.user.id;

        let userDetails = await User.findById({_id:userId})
                                .populate({
                                    path: "courses",
                                    populate: {
                                        path: "courseContent",
                                        populate: {
                                            path: "subSection"
                                        }
                                    }
                                })                                
                                .exec();

        userDetails.password = undefined;
        userDetails.confirmPassword = undefined;

        userDetails = userDetails.toObject();
        var SubsectionLength = 0;

        for (var i = 0 ; i < userDetails.courses.length ; i++) {
            let totalDurationInSeconds = 0;
            SubsectionLength = 0;

            for (var j = 0 ; j < userDetails.courses[i].courseContent.length ; j++) {
                totalDurationInSeconds += userDetails.courses[i].courseContent[j].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0);
                SubsectionLength += userDetails.courses[i].courseContent[j].subSection.length;
            }
            userDetails.courses[i].totalDuration = convertSecondsToDuration(totalDurationInSeconds);
            let courseProgressCount = await CourseProgress.findOne({
                courseId: userDetails.courses[i]._id,
                userId: userId,
            })
            courseProgressCount = courseProgressCount?.completedVideos.length;

            if (SubsectionLength === 0) {
                userDetails[i].progressPercentage = 100;
            }
            else {
                const multiplier = Math.pow(10, 2);
                userDetails.courses[i].progressPercentage = 
                    Math.round(
                        (courseProgressCount / SubsectionLength) * 100 * multiplier
                    ) / multiplier
            }

        }

        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find user with id: ${userDetails._id}`
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Enrolled Courses fetched successfully',
            data : userDetails.courses,
        })



    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message : "Cannot fetch user details",
        })
    }
}

// add update display picture and getenrolled courses
exports.updateDisplayPicture = async (req, res) => {
    try {
        const userId = req.user.id;
        const profileImage = req.files.imageFile;
        console.log(profileImage);

        const uploadDetails = await uploadImageToCloudinary(profileImage, process.env.FOLDER_NAME);

        const updatedUser = await User.findByIdAndUpdate({_id:userId},
                                                        {image: uploadDetails.secure_url},
                                                        {new: true});

        return res.status(200).json({
            success:true,
            message: 'Profile picture updated successfully',
            updatedUser,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message : "Cannot update profile picture",
            error : error.message,
        })
    }
}

exports.instructorDashboard = async(req, res) => {
    try {
        const courseDetails = await Course.find({instructor: req.user.id});

        const courseData = courseDetails.map((course) => {
            const totalStudentsEnrolled = course.studentsEnrolled.length;
            const totalAmountGenerated = totalStudentsEnrolled * course.price;

            // create new object to store additional details
            const courseDataWithStats = {
                _id: course._id,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                totalStudentsEnrolled: totalStudentsEnrolled,
                totalAmountGenerated: totalAmountGenerated,
            }
            return courseDataWithStats;
        })

        return res.status(200).json({
            success: true,
            courses: courseData,
        })


    } catch (error) {
        console.log("Error while getting instructro dashboard data", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server errror",
        })
    }
}



