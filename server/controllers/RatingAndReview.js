const RatingAndReview = require('../models/RatingAndReview');
const Course = require('../models/Course');
const { default: mongoose } = require('mongoose');

exports.createRating = async (req, res) => {
    try {
        // get user id
        const userId = req.user.id;
        // fetch data from req body
        const {courseId, rating, review} = req.body;
        // check if user is enrolled or not
        const courseDetails = await Course.findOne(
                                        {_id: courseId,
                                        studentsEnrolled: {$elemMatch: {$eq: userId}},
                                    });
        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: "Student is not enrolled in the course",
            });
        }

        const alreadyReviewed = await RatingAndReview.findOne({
                                            user: userId,
                                            course: courseId,
                                    });
        if (alreadyReviewed) {
            return res.status(403).json({
                success: false,
                message : "Course is already reviewed by the user",
            });
        }

        const ratingReviews = await RatingAndReview.create({
                                    rating, review,
                                    user: userId,
                                    course: courseId,
                                });
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id: courseId},
                                    {
                                        $push : {
                                            ratingAndReviews : ratingReviews._id,
                                        }
                                    },
                                    {new: true});
        console.log(updatedCourseDetails);
        return res.status(200).json({
            success: true,
            message : "Rating and Review created successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message : error.message,
        })
    }
}


exports.getAverageRating = async (req, res) => {
    try {
        // get course id
        const {courseId} = req.body;
        // calculate average rating

        const result = await RatingAndReview.aggregate([
            {
                $match: {
                    course: mongoose.Types.ObjectId(courseId),
                },
                $group : {
                    _id: null,
                    averageRating: {$avg : "$rating"}
                }
            }
        ]);

        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                averageRating : result[0].averageRating,
            })
        }
        
        // if no rating exists
        return res.status(200).json({
            success: true,
            message : 'Course is not rated yet.',
            averageRating: 0,
        })

    } catch (error) {
        return res.status(500).json({
            success: true,
            message: 'Could not find average rating',
            error: error.message,
        });
    }
};

exports.getAllRating = async (req, res) => {
    try {
        
        const allReviews = await RatingAndReview.find({})
                            .sort({rating: 'desc'})
                            .populate({
                                path: "user",
                                select: "firstName lastName email image"
                            })
                            .populate({
                                path: "course",
                                select : "courseName",
                            })
                            .exec();
        
        return res.status(200).json({
            success: true,
            message: "All reviews fetched successfully",
            data: allReviews,
        })

    } catch (error) {
        return res.status(500).json({
            success: true,
            message: 'Could not get ratings',
            error: error.message,
        });
    }
}