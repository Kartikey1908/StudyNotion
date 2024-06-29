import toast from "react-hot-toast";
import { setLoading, setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector";
import { profileEndpoints } from "../apis";
import { useSelector } from "react-redux";




const  {
    GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API, GET_INSTRUCTOR_DATA_API
} = profileEndpoints;

export function getUserDetails(token, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
                Authorization : `Bearer ${token}`,
            })
            
            console.log("Get user details api response...", response);

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            const userImage = response.data.data.image
                ? response.data.data.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`

            dispatch(setUser({...response.data.data, userImage}))

        } catch (error) {
            console.log("Get user details api error...", error);
            toast.error("Could Not get user details")
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
}

export async function getUserEnrolledCourses(token) {
    const toastId = toast.loading("Loading..")
    let result = []
    try {
        const response = await apiConnector(
            "GET", 
            GET_USER_ENROLLED_COURSES_API,
            null,
            {
                Authorization : `Bearer ${token}`,
            }
        )

        console.log("Get user enrolled courses api response", response);

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        result = response.data.data;

    } catch (error) {
        console.log("Get user enrolled courses api error.....", error);
        toast.error("Could Not Get Enrolled Courses")
    }
    toast.dismiss(toastId);
    return result;
}

export async function getInstructorData(token) {
    const toastId = toast.loading("Loading...");
    let result = [];

    try {
        const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, {
            Authorization: `Bearer ${token}`
        });

        console.log("Get instructor api response....", response);

        if (!response?.data?.success) {
            throw new Error("Could not get instructor data");
        }
        result = response?.data?.courses;
    } catch (error) {
        console.log("GET_INSTRUCTOR_API error", error);
        toast.error("Could not get instructor data");
    }
    toast.dismiss(toastId);
    return result;
}