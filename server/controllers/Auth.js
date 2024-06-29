const User = require("../models/User");
const Profile = require("../models/Profile");
const OTP = require("../models/OTP.JS");
const otpGenerator = require('otp-generator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mailSender = require('../utils/mailSender');
const { response } = require("express");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
require("dotenv").config();

// send OTP
exports.sendOTP = async (req, res) => {
    try {

         // fetch email from req
        const {email} = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message : 'No email received',
            })
        }


        // check if user already exist
        const checkUserPresent = await User.findOne({email});

        if (checkUserPresent){
            return res.status(401).json({
                success: false,
                message : 'User already registered',
            })
        }

        // generate otp
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars: false,
        });

        console.log("Otp generated", otp);

        // check unique otp or not 
        let result = await OTP.findOne({otp:otp});

        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars: false,
            });
            result = await OTP.findOne({otp:otp});
        }

        const otpPayload = {email,otp};

        // create an entry in db
        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);

        res.status(200).json({
            success:true,
            message : 'OTP send successfully',
            otp : otp
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message: error.message
        })
    }
   
};

exports.signUp = async (req, res) => {

    try {
        // data fetch from req body
        const {
            firstName,
            lastName,
            email, 
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp
        } = req.body;

        // validate krlo
        if (!firstName || !lastName || !email || !password || !confirmPassword 
            || !otp) {
                return res.status(403).json({
                    success : false,
                    message : "All fields are required",
                })
            }

        // 2 passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({
                success : false,
                message : "Password and Confirm Password does not match, please try again",
            });
        }

        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({
                success : false,
                message : "User is already registered",
            })
        }

        // find most recent otp
        const recentOtp = await OTP.find({email}).sort({createdAt : -1}).limit(1);
        
        if (recentOtp.length == 0) {
            return res.status(400).json({
                success : false,
                message : 'OTP not found',
            });
        } else if (otp !== recentOtp[0].otp) {
            return res.status(400).json({
                success: false,
                message : "Invalid OTP",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // enter data in db
        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        });

        const user = await User.create({
            firstName, 
            lastName, 
            email,
            contactNumber,
            password:hashedPassword,
            accountType,
            additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        })

        console.log(user);

        return res.status(200).json({
            success:true,
            message : "User is registered successfully",
            user,
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message : "User Cannot be registered. Please try again",
        })
   }
 

}

exports.login = async (req, res) => {
    try {
        
        // get data from req body
        const {email, password} = req.body;
        // validate
        if (!email || !password) {
            return res.status(403).json({
                success : false,
                message : 'All fields are required, please try again',
            });
        }
        // check user exits
        const user = await User.findOne({email}).populate("additionalDetails");
        if (!user) {
            return res.status(401).json({
                success : false,
                message : 'User is not registered, please signup first',
            });
        }
        // match passowrd // create jwt
        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                email : user.email,
                id : user._id,
                accountType : user.accountType,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn : "2h",
            });
            user.token = token;
            user.password = undefined;

            const options = {
                expires : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly : true,
            }

            // create cookie
            res.cookie('token', token, options).status(200).json({
                success:true,
                token,
                user,
                message:'Logged In successfully'
            })
        }
        else {
            return res.status(401).json({
                success: false,
                message : "Password is incorrect",
            });
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message : 'Login Failure. Please try again',
        });
    }
}

// change password
exports.changePassword = async(req, res) => {

    try {
        
        const userDetails = await User.findById(req.user.id);

        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            })
        }

        const {oldPassword, newPassword, confirmNewPassword} = req.body;
        const isPasswordMatch = await bcrypt.compare(
            oldPassword,
            userDetails.password
        );
    
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "The password is incorrect"
            });
        }
    
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: "The password and confirm password does not match"
            });
        }
    
        // Update password
        const encryptedPassword = await bcrypt.hash(newPassword, 10);
        const updatedUserDetails = await User.findByIdAndUpdate(
            req.user.id,
            { password: encryptedPassword },
            { new: true }
        );
    
        // send notification email
        try {
            const emailResponse = await mailSender(
                updatedUserDetails.email,
                `Password for your account has been updated`,
                passwordUpdated(updatedUserDetails.email, `${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`)
            );
            console.log("Email sent successfully: ", emailResponse,response);
        } catch (error) {
            console.log("Error occured while sending email: ", error);
            return res.status(500).json({
                success: false,
                message: "Error occured while sending mail",
                error: error.message,
            });
        }
    
        return res.status(200).json({
            success: true,
            message: "Password updated successfully"
        })

    } catch (error) {
        console.log("Error occured while updating password: ", error);
        return res.status(500).json({
            success: false,
            message: "Error occured while updating password",
            error: error.message,
        });
    }   


    
}
