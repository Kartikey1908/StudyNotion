const { contactUsEmail } = require("../mail/templates/contactFormRes");
const User = require("../models/User");
const {mailSender} = require("../utils/mailSender");
require('dotenv').config();

exports.contactUs = async (req, res) => {
    try {
        const {firstName, lastName, email, phoneNumber, message, countrycode} = req.body;
        const {userId} = req.user.id;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User not logged in",
            })
        }

        const mailToUs = await mailSender(process.env.MAIL_USER, 
                                        `Contact Us mail from user`,
                                        `First Name : ${firstName}
                                        Last Name : ${lastName}
                                        Phone Number : ${phoneNumber},
                                        ${message}`);

        const mailToUser = await mailSender(email, 
                                            `Your response has been recieved`,
                                            contactUsEmail(email, firstName, lastName, message, phoneNumber, countrycode));

        return res.status(200).json({
            success: true,
            message : 'Mail has been send successfully',
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message : 'An error occured while sending the mail',
        })
    }
}