const CourseProgress = require('../models/CourseProgress');
const SubSection = require('../models/SubSection')


exports.updateCourseProgress = async(req, res) => {

    const {courseId, subSectionId} = req.body;
    const userId = req.user.id;
    console.log(courseId, " " , userId);

    try {
        const subSection = await SubSection.findById(subSectionId);

        if (!subSection) {
            return res.status(404).json({
                success: false,
                error: "Invalid SubSection ID",
            })
        }

        let courseProgress = await CourseProgress.findOne({
            courseId: courseId,
            userId: userId,
        })

        if (!courseProgress) {
            return res.status(404).json({
                success: false,
                message: "Course Progress does not exist"
            });
        }
        else {
            // check for re-completing video
            if (courseProgress.completedVideos.includes(subSectionId)) {
                return res.status(400).json({
                    success: false,
                    error: "SubSection already completed"
                })
            }

            courseProgress.completedVideos.push(subSectionId);
            await courseProgress.save();
            return res.status(200).json({
                success: true,
                message: "Lecture Completed"
            })
        }


    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Internal server errror"
        });
    }


}