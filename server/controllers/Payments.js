const { default: mongoose } = require('mongoose');
const {instance} = require('../config/razorpay');
const Course = require('../models/Course');
const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const { json } = require('react-router-dom');
const crypto = require("crypto");
const CourseProgress = require('../models/CourseProgress');
const { paymentSuccessEmail } = require('../mail/templates/paymentSuccessEmail');
const { courseEnrollmentEmail } = require('../mail/templates/courseEnrollmentEmail');
// course enrollment mail template

exports.capturePayment = async(req, res) => {
    
    const {courses} = req.body;
    const userId = req.user.id;

    if (courses.length === 0) {
        return res.json({
            success: false,
            message: "Please add courses to cart"
        })
    }

    let totalAmount = 0;

    for (const course_id of courses) {
        let course;
        try {
            course = await Course.findById(course_id);

            if (!course) {
                return res.status(200).json({
                    success: false,
                    message: "Could not find the course"
                })
            }

            const uid = new mongoose.Types.ObjectId(userId);
            if (course.studentsEnrolled.includes(uid)) {
                return res.status(200).json({
                    success: false,
                    message: "Student is already enrolled in one of the courses"
                })
            }

            totalAmount += course.price;
        } catch (error) {
            console.log("Error while calculating total cost of courses");
            return res.status(500).json({
                success: false,
                message : error.message
            })
        }
    }

    const options = {
        amount: totalAmount * 100,
        currency: "INR",
        receipt: Math.random(Date.now()).toString(),
    }

    try {
        const paymentResponse = await instance.orders.create(options);
        return res.json({
            success: true,
            data: paymentResponse,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Could not initiate order"
        })
    }
 
}

exports.verifyPayment = async(req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    if (!razorpay_order_id ||
        !razorpay_payment_id || 
        !razorpay_signature || !courses || !userId) {

        return res.status(200).json({
            success: false,
            message: "Payment Failed"
        });
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

    if (expectedSignature === razorpay_signature) {
        // enroll student
        await enrollStudents(courses, userId, res);
        // return res

        return res.status(200).json({
            success: true,
            message: "Payment Verified"
        });
    }

    return res.status(200).json({
        success: false,
        message: "Payment Failed"
    });
}


const enrollStudents = async(courses, userId, res) => {

    if (!courses || !userId) {
        return res.status(400).json({
            success: false,
            message: "Please provide data for courses or userId"
        });
    }

    for (const courseId of courses) {
        try {
            const enrolledCourse = await Course.findOneAndUpdate(
                {_id: courseId},
                {$push: {studentsEnrolled: userId}},
                {new : true},
            )
    
            if (!enrolledCourse) {
                return res.status(404).json({
                    success: false, 
                    message: "Course not found"
                });
            }

            const courseProgress = await CourseProgress.create({
                courseId: courseId,
                userId: userId,
                completedVideos: []
            });
    
            const enrolledStudent = await User.findByIdAndUpdate(userId,            
                {$push: {
                    courses: courseId,
                    courseProgress: courseProgress._id,
                }},
                {new: true}
            );
    
            const emailResponse = await mailSender(
                enrollStudents.email,
                `Successfully Enrolled into ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(
                    enrolledCourse.courseName,
                    `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
                )
            )
            console.log("Email sent successfully ", emailResponse);
        } catch (error) {
            console.log(error);
            return res.status(500).json({success: false, message: error.message})
        }
    }
}

exports.sendPaymentSuccessEmail = async (req, res) => {
    const {orderId, paymentId, amount} = req.body;

    const userId = req.user.id;

    if (!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({
            success: false, 
            message: "Please provide all the fields"
        });
    }

    try {
        // find student
        const enrolledStudent = await User.findById(userId);
        
        await mailSender(
            enrolledStudent.email, 
            `Payment Recieved`,
            paymentSuccessEmail(
                `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
                amount/100,
                orderId, 
                paymentId
            )
        )

    } catch (error) {
        console.log("Error in sending mail");
        return res.status(500).json({
            success: false,
            message: "Could not send email"
        })
    }
}
















// exports.capturePayment = async (req, res) => {
//     const {course_id} = req.body;
//     const userId = req.user.id;

//     if (!course_id) {
//         return res.status(400).json({
//             success: 'false',
//             message: 'Please provide valid course ID',
//         });
//     }

//     let course;
//     try {
//         course = await Course.findById(course_id);
//         if (!course) {
//             return res.status(404).json({
//                 success: 'false',
//                 message: 'Could not find the course',
//             });
//         }

//         // if user already purchased the course
//         const uid = new mongoose.Types.ObjectId;
//         if (course.studentsEnrolled.includes(uid)) {
//             return res.status(400).json({
//                 success: false,
//                 message : 'Student already enrolled in the course',
//             })
//         }

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             success: false,
//             message : error.message,
//         });
//     }

//     // order create
//     const amount = course.price;
//     const currency = "INR";

//     const options = {
//         amount : amount * 100,
//         currency,
//         receipt: Math.random(Date.now()).toString(),
//         notes : {
//             courseId : course_id,
//             userId,
//         }
//     };

//     try {
//         // initate the payment using razorpay
//         const paymentResponse = await instance.orders.create(options);
//         console.log(paymentResponse);

//         return res.status(200).json({
//             success: true,
//             courseName : course.courseName,
//             courseDescription: course.courseDescription,
//             thumbnail : course.thumbnail,
//             orderId : paymentResponse.id,
//             currency : paymentResponse.currency,
//             amount: paymentResponse.amount,
//         });

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             success: false,
//             message : "Could not initiate order",
//         })
//     }
// };


// exports.verifySignature = async(req, res) => {
//     const webHookSecret = "12345678";

//     const signature = req.headers["x-razorpay-signature"];
    
//     // it hashes the text based on the algo given to it and input text
//     const shasum = crypto.createHmac("sha256", webHookSecret); 
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");

//     if (signature == digest) {
//         console.log("payment is authorized");

//         const {courseId, userId} = req.body.payload.payment.entity.notes;

//         try {

//             const enrolledCourse = await Course.findOneAndUpdate(
//                                                 {_id: courseId},
//                                                 {$push: {studentsEnrolled: userId}},
//                                                 {new : true},
//             );

//             if (!enrolledCourse) {
//                 return res.status(500).json({
//                     success: false,
//                     message : 'Course no found',
//                 });
//             }

//             console.log(enrolledCourse);

//             // find student and add course to its courses
//             const enrolledStudent = await User.findOneAndUpdate(
//                                                 {_id: userId},
//                                                 {$push: {courses : courseId}},
//                                                 {new : true},
//             );

//             console.log(enrolledStudent);

//             // mail send
//             const emailResponse = await mailSender(
//                                         enrolledStudent.email, 
//                                         "Congratulations on joining the course",
//                                         "Congratulations on joining the course, go to dashboard to start learning."
//             );
//             console.log(emailResponse);
//             return res.status(200).json({
//                 success: true,
//                 message : "Signature verified and course added",
//             });

//         } catch (error) {
//             return res.status(500).json({
//                 success: false,
//                 message : error.message,
//             });
//         }
//     }
//     else {
//         return res.status(400).json({
//             success: false,
//             message: 'Invalid request',
//         })
//     }


// }
