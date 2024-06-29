const SubSection = require('../models/SubSection');
const Section = require('../models/Section');
const {uploadImageToCloudinary} = require('../utils/imageUploader');
require('dotenv').config();

// create subsection

exports.createSubSection = async (req, res) => {
    try {

        // get data from req
        const {sectionId, title, description} = req.body;
        const videoFile = req.files.videoFile;
    

        // validate
        if (!sectionId || !title || !description ) {
            return res.status(400).json({
                success: false,
                message : 'All fields are required',
            })
        }

        // upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(videoFile, process.env.FOLDER_NAME);

        // create subsection
        const subSectionDetails = await SubSection.create({
            title: title,
            timeDuration: uploadDetails.duration,
            description : description,
            videoUrl : uploadDetails.secure_url,        
        })

        // update section
        const updatedSection = await Section.findByIdAndUpdate({_id : sectionId},
                                                            {$push : {
                                                                subSection : subSectionDetails._id,
                                                            }},
                                                            {new : true}).populate('subSection').exec();

        return res.status(200).json({
            success: true,
            message: 'Subsection created successfully',
            data: updatedSection,
        });                                                    

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        })  
    }
}

exports.updateSubSection = async (req, res) => {
    try {

        // get data
        const {subSectionId, title, description, sectionId} = req.body;

        const subSection = await SubSection.findById(subSectionId);

        if (!subSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found"
            });
        }

        if (title !== undefined)
        {
            subSection.title = title;
        }

        if (description !== undefined)
        {
            subSection.description = description;
        }

        // TODO : uploading new video file and deleting the old one

        if (req.files && req.files.videoFile !== undefined) {
            const videoFile = req.files.videoFile;

            const uploadDetails = await uploadImageToCloudinary(videoFile, process.env.FOLDER_NAME);

            subSection.videoUrl = uploadDetails.secure_url;
            subSection.timeDuration = `${uploadDetails.duration}`
        }
        
        await subSection.save();

        const updatedSection = await Section.findById(sectionId).populate("subSection").exec();
        
        return res.status(200).json({
            success: true,
            message: 'Subsection updated successfully',
            data : updatedSection
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        })  
    }
}

exports.deleteSubSection = async (req, res) => {
    try {
        const {subSectionId, sectionId} = req.body;

        await SubSection.findByIdAndDelete(subSectionId);

        // TODO : verify if delete subsection from section is correct syntactically and if we have to return updated section
        const updatedSection = await Section.findByIdAndUpdate(sectionId, 
                                        {$pull : {
                                            subSection : subSectionId,
                                        }}, {new : true}).populate("subSection").exec();
        
        
        return res.status(200).json({
            success: true,
            message: 'Subsection deleted successfully',
            data : updatedSection
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
}