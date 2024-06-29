import toast from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
// import rzpLogo from "../../assets/Logo/"
import { resetCart } from "../../slices/cartSlice";

const {
    COURSE_PAYMENT_API,
    COURSE_VERIFY_API,
    SEND_PAYMENT_SUCCESS_EMAIL_API
} = studentEndpoints;

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }

        script.onerror = () => {
            resolve(false);
        }

        document.body.appendChild(script);
    })
}

export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
    const toastId = toast.loading("Loading...");
    try {
        // load the script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if (!res) {
            toast.error("Razorpay SDK failed to load");
            // toast.dismiss(toastId);
            return;
        }

        // initate the order
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, 
            {courses},
            {
                Authorization : `Bearer ${token}`
            }
        )

        console.log("Printing order response", orderResponse);

        if (!orderResponse?.data?.success) {
            throw new Error(orderResponse?.data?.message);
        }

        // options
        const options = {
            key : process.env.RAZORPAY_KEY,
            currency: orderResponse?.data?.data.currency,
            amount: `${orderResponse?.data?.data?.amount}`,
            order_id: orderResponse?.data?.data?.id,
            name: "StudyNotion",
            description: "Thank You For Purchasing the Course",
            // image: rzpLogo,
            prefill:{
                name: `${userDetails.firstNmae}`,
                email: userDetails.email
            },
            handler : function (response) {
                // send successful wala email

                sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token);

                // verify payment
                verifyPayment({...response, courses}, token, navigate, dispatch)
            }
        }

        // remember to write this
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function(response) {
            toast.error("Oops, payment failed");
            console.log(response?.error);
        })


    } catch (error) {
        console.log("Payment API Error....", error);
        toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response, amount, token) {
    try {
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
        }, {
            Authorization: `Bearer ${token}`
        })
    } catch (err) {
        console.log("Payment success email error...", err);
    }
}

async function verifyPayment(bodyData, token, navigate, dispatch) {

    const toastId = toast.loading("Verifying Payment...");
    // dispatch(setPaymentLoading(true));

    try {
        const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorization: `Bearer ${token}`
        });

        if (!response?.data?.success) {
            throw new Error(response?.data?.message);
        }

        toast.success("Payment Successful, You are added to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());

    } catch (error) {
        console.log("Payment Verify API error....", error)
        toast.error("Could Not Verify Payment")
    }
    toast.dismiss(toastId);
}