const User = require('../models/User');
const mailSender = require("../utils/mailSender");
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

exports.resetPasswordToken = async (req,res) => {
    try {
        
            // get email from req body 
        const email = req.body.email;
        // check user for this email
        const user = await User.findOne({email});
        
        if (!user) {
            return res.json({
                success: false,
                message : "Your email is not registered with us"
            });
        }
        // generate token
        const token = crypto.randomUUID();
        // update user by adding token and expiry time
        const updatedDetails = await User.findOneAndUpdate(
                                            {email:email},
                                            {
                                                token:token,
                                                resetPasswordExpires : Date.now() + 5 * 60 * 1000,
                                            },
                                            {new : true});

        const url = `http://localhost:3000/update-password/${token}`

        const response = await mailSender(email, 
                    'Password Reset Link', 
                    `Your Link for email verification is ${url}. Please click this url to reset your password.`);
        console.log(response);
        // return response
        return res.status(200).json({
            success:true,
            message : "Email sent succesfully, please check your email and change password",
    })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "Something went wrong while sending reset password mail",
            error : error.message,
        });
    }
}

exports.resetPassword = async (req, res) => {
    try {
        
        // data fetch
        const {password, confirmPassword, token} = req.body;

        if (password !== confirmPassword) {
            return res.json({
                success:false,
                message : "Password not matching",
            });
        }

        const userDetails = await User.findOne({token:token});

        if (!userDetails) {
            return res.json({
                success: false,
                message : "Token Invalid",
            })
        }
        // token time check
        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.json({
                success: false,
                message : "Token is expired, please regenerate your token",
            })
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        // password update
        await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true},
        );

        return res.status(200).json({
            success: true,
            message : "Password reset successful"
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "Something went wrong while storing reset password",
        });
    }
}