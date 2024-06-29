const Course = require('../models/Course');
const Category = require('../models/Categories');
const User = require('../models/User');
const Section = require('../models/Section')
const SubSection = require('../models/SubSection')
const CourseProgress = require('../models/CourseProgress')
const {uploadImageToCloudinary} = require("../utils/imageUploader");
const { convertSecondsToDuration } = require('../utils/secToDuration');
require("dotenv").config();

// create course handler
exports.createCourse = async(req, res) => {
    try {
        // TODO : thumbnail ka system chalu kar dena ek baar front end hone pe
        // fetch data
        const {courseName, courseDescription, whatYouWillLearn, price, category, tags, instructions, status} = req.body;
        const tag = JSON.parse(tags);
        const instruction = JSON.parse(instructions);
        console.log(tag);
        // get thumbnail
        const thumbnail = req.files.thumbnail;
        if (!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail || !tag) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
                
            });
        }

        if (!status || status === undefined) {
            status = "Draft";
        }

        // check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor Details: ", instructorDetails);
        // TODO : Veify that instructorDetails._id and user id is same

        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: 'Instructor Details not found',
            });
        }

        // check tag valid or not
        const categoryDetails = await Category.findById(category); // we get tag as id
        if (!categoryDetails) {
            return res.status(404).json({
                success:false,
                message : "Category details not found",
            });
        }

        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        // create an entry for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn:whatYouWillLearn,
            price,
            category:categoryDetails._id,
            instructions: instruction,
            thumbnail:thumbnailImage.secure_url,
            tag : tag,
            status: status,
        })

        // update user, add new course to id
        await User.findByIdAndUpdate(
            {_id: instructorDetails._id},
            {
                $push : {
                    courses:newCourse._id,
                }
            },
            {new : true},
        );

        // update tag ka schema
        await Category.findByIdAndUpdate(
            {_id:categoryDetails._id},
            {
                $push : {
                    courses : newCourse._id,
                }
            }
        );

        return res.status(200).json({
            success:true,
            message: 'Couse created successfully',
            data : newCourse,
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message: 'Failed to create course',
            error:error.message,
        })
    }
}

exports.editCourse = async (req, res) => {
    try {
        
        const { courseId } = req.body;
        const updates = req.body;
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        // updating thumbnail image
        if (req.files) {
            const thumbnail = req.files.thumbnailImage;
            const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
            course.thumbnail = thumbnailImage.secure_url;
        }

        for (const key in updates) {
            if (updates.hasOwnProperty(key)) {
                if (key === "tag" || key === "instructions") {
                    course[key] = JSON.parse(updates[key]);
                }
                else {
                    course[key] = updates[key];
                }
            }
        }

        await course.save();

        const updatedCourse = await Course.findOne({
            _id: courseId,
        })
        .populate({
            path: "instructor",
            populate: {
                path: "additionalDetails",
            },
        })
        .populate("category")
        // .populate("ratingAndReviews")
        .populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
        .exec();

        return res.status(200).json({
            success: true,
            message: "Course updated successfully",
            data : updatedCourse,
        })

    } catch (error) {
        console.log("Error while updating course", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}





// get all courses 
exports.getAllCoures = async (req, res) => {
    try {
        const allCourses = await Course.find(
            {status: "Published"},
            {
                courseName: true,
                price: true,
                thumbnail: true,
                instructor: true,
                ratingAndReviews: true,
                studentsEnrolled: true,
            }
        )
        .populate("instructor")
        .exec();

        return res.status(200).json({
            success: true,
            messages : 'Data for all courses fetched successfully',
            data : allCourses,
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message: 'Cannot Fetch course data',
            error:error.message,
        })
    }
}

// get Course details
exports.getCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body;
        if (!courseId) {
            return res.status(400).json({
                success: false,
                message : "Course Id should be sent",
            })
        }

        // find course details
        const courseDetails = await Course.findOne(
                                    {_id: courseId})
                                    .populate(
                                        {
                                            path: "instructor",
                                            populate: {
                                                path: "additionalDetails",
                                            }
                                        }
                                    )
                                    .populate("category")
                                    // .populate("ratingAndReviews")
                                    .populate({
                                        path : "courseContent",
                                        populate : {
                                            path : "subSection",
                                            select: "-videoUrl"
                                        },
                                    })
                                    .exec();
        if (!courseDetails)
        {
            return res.status(404).json({
                success: false,
                message : `Could not find the course with id ${courseId}`
            });
        }

        let totalDurationInSeconds = 0;
        courseDetails?.courseContent?.forEach((content) => {
            content?.subSection?.forEach((subSection) => {
                const timeDurationInSeconds = parseFloat(subSection?.timeDuration);
                totalDurationInSeconds += timeDurationInSeconds;
            })
        })
        const totalDuration = convertSecondsToDuration(totalDurationInSeconds);


        return res.status(200).json({
            success: true,
            message : 'Course details fectched successfully',
            data : {
                courseDetails,
                totalDuration,
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message : error.message,
        })
    }
}

// TODO : create route for this 
exports.getFullCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user.id;
        const courseDetails = await Course.findOne({
            _id: courseId,
        })
        .populate({
            path: "instructor",
            populate: {
                path: "additionalDetails"
            },
        })
        .populate("category")
        // .populate("ratingAndReviews")
        .populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
        .exec();

        let courseProgressCount = await CourseProgress.findOne({
            courseId: courseId,
            userId: userId
        })

        console.log("courseProgressCount: ", courseProgressCount);

        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message : `Could not find the course with id ${courseId}`
            });
        }

        let totalDurationInSeconds = 0;
        courseDetails.courseContent.forEach((content) => {
            content.subSection.forEach((subSection) => {
                const timeDurationInSeconds = parseInt(subSection.timeDuration);
                totalDurationInSeconds += timeDurationInSeconds;
            })
        })

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

        return res.status(200).json({
            success: true,
            message : 'Course details fectched successfully',
            data : {
                courseDetails,
                totalDuration,
                completedLectures: courseProgressCount?.completedVideos
                    ? courseProgressCount?.completedVideos
                    : [],
            },
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message : error.message,
        })
    }
}

exports.getInstructorCourses = async(req, res) => {
    try {
        
        const instructorId = req.user.id;

        const instructorCourses = await Course.find({
            instructor: instructorId,
        }).sort({createdAt: -1})

        return res.status(200).json({
            success: true,
            data: instructorCourses,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message : "Failed to retrieve instructor courses",
            error : error.message
        })
    }
}

exports.deleteCourse = async (req, res) => {
    try {
        
        const {courseId} = req.body;
        console.log(req.body);
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            })
        }

        const studentsEnrolled = course.studentsEnrolled;
        for (const studentId of studentsEnrolled) {
            await User.findByIdAndUpdate(studentId, {
                $pull : {
                    courses: courseId
                },
            })
        }

        const courseSections = course.courseContent;
        for (const sectionId of courseSections) {
            const section = await Section.findById(sectionId);

            if (section) {
                const subSections = section.subSection;
                for (const subSectionId of subSections) {
                    await SubSection.findByIdAndDelete(subSectionId)
                }
            }

            // Delete section
            await Section.findByIdAndDelete(sectionId);
        }

        // Delete course
        await Course.findByIdAndDelete(courseId);

        await Category.findByIdAndUpdate(
            {_id:categoryDetails._id},
            {
                $pull : {
                    courses : courseId,
                }
            }
        );

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully"
        })

    } catch (error) {
        console.log("Error while deleting course", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        })
    }
}