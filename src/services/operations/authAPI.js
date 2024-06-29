import toast from "react-hot-toast";
import { setLoading, setToken } from "../../slices/authSlice"
import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";
import { setUser } from "../../slices/profileSlice";
import { resetCart } from "../../slices/cartSlice";

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API
} = endpoints;

export function sendOtp(email, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading..");
        dispatch(setLoading(true));
        try {

            const response = await apiConnector("POST", SENDOTP_API, {
                email,
                checkUserPresent: true,
            })

            console.log("SEND OTP API RESPONSE ......", response);

            if (!response.data.success) {
                throw new Error(response.data?.message)
            }

            toast.success("OTP Sent Successfully")
            navigate("/verify-email");

        } catch (error) {
            console.log("ERROR while sending otp.. ", error);
            toast.error(error.message)
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function signUp (
    firstName, 
    lastName,
    email,
    password,
    confirmPassword,
    accountType,
    otp,
    navigate
) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading..");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", SIGNUP_API, {
                firstName, 
                lastName,
                email,
                password,
                confirmPassword,
                accountType,
                otp,
            })

            console.log("Signup api response......", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("Signup Successful")
            navigate("/login");

        } catch (error) {
            console.log("Signup API error..", error);
            toast.error("Signup Failed");
            navigate("/signup");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function login(email, password, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading....");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", LOGIN_API, {
                email,
                password
            });

            console.log("Login api response......", response);

            if (!response.data.success) {
                throw new Error(response.data);
            }

            toast.success("Login successful");
            dispatch(setToken(response.data.token));
            const userImage = response.data?.user?.image
            ? response.data.user.image
            :  `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
            
            dispatch(setUser({...response.data.user, image:userImage}));

            localStorage.setItem("token", JSON.stringify(response.data.token));
            localStorage.setItem("user", JSON.stringify(response.data.user));

            navigate("/dashboard/my-profile");

        } catch (error) {
            console.log("LOGIN API error...", error);
            toast.error(error.response.data.message);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function logout(navigate) {
    return (dispatch) => {
        dispatch(setToken(null));
        dispatch(setUser(null));
        dispatch(resetCart());
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged out");
        navigate("/");
    }
}

export function getPasswordResetToken(email, setEmailSent) {
    
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", RESETPASSTOKEN_API, {email});

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("Reset Email Sent");
            setEmailSent(true);
        } catch (error) {
            console.log("RESET PASSWORD TOKEN ERROR", error.message);
            toast.error("Cannot send email for reset password");
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
}

export function resetPassword(password, confirmPassword, token) {
    return async(dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", RESETPASSWORD_API, {
                password,
                confirmPassword,
                token
            })

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Password has been modified successfully");

        } catch (error) {
            console.log("RESET PASSWORD TOKEN ERROR", error.message);
            toast.error("Could not reset password");
        }
        dispatch(setLoading(false));
    }
}

