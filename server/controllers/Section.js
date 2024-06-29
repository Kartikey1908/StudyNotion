const Section = require('../models/Section');
const Course = require('../models/Course');
const SubSection = require('../models/SubSection');

exports.createSection = async (req, res) => {
    try {
        // data fetch
        const {sectionName, courseId} = req.body;

        // data validation
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message : 'Missing properties',
            });
        }
        // create section
        const newSection = await Section.create({sectionName});
        // update course
        const updatedCourseDetails = await Course.findByIdAndUpdate(
                                            courseId,
                                            {
                                                $push : {courseContent : newSection._id}
                                            },
                                            {new : true}
                                        ).populate({
                                            path: "courseContent",
                                            populate: {
                                                path : "subSection",
                                            }
                                        })
                                        .exec();
        return res.status(200).json({
            success: true,
            message : 'Section created successfully',
            updatedCourseDetails,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message : 'Unable to create section please try again',
            error : error.message,
        });
    }
}

exports.updateSection = async (req, res) => {
    try {
        
        const {sectionName, sectionId, courseId} = req.body;

        if (!sectionName || !sectionId) {
            return res.status(400).json({
                success: false,
                message : 'Missing properties',
            });
        }

        const updatedSection = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new:true});

        const updatedCourseDetails = await Course.findById(courseId)
                                        .populate({
                                            path: "courseContent",
                                            populate : {
                                                path : "subSection"
                                            }
                                        })
        

        return res.status(200).json({
            success: true,
            message : 'Section Updated Successfully',
            data : updatedCourseDetails,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message : 'Unable to update section please try again',
            error : error.message,
        });
    }
}

exports.deleteSection = async (req, res) => {
    try {

        const {sectionId, courseId} = req.body;

        

        await Course.findByIdAndUpdate(courseId,
                                    {$pull : {
                                        courseContent : sectionId
                                    }}, {new: true})

        const section = await Section.findById(sectionId);

        if (!section) {
            return res.status(404).json({
                success: false,
                message: "Section not found",
            })
        }

        // delete subsection
        await SubSection.deleteMany({_id : {$in : section.subSection}});

        await Section.findByIdAndDelete(sectionId);

        const course = await Course.findById(courseId).populate({
            path : "courseContent",
            populate: {
                path : "subSection"
            }
        })
        .exec();

        return res.status(200).json({
            success: true,
            message : 'Section Deleted Successfully',
            courseDetails : course,
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message : 'Unable to delete section please try again',
            error : error.message,
        });
    }
}