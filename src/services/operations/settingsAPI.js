import toast from "react-hot-toast";

import { apiConnector } from "../apiconnector";
import { settingsEndpoints } from "../apis";
import { setUser } from "../../slices/profileSlice";
import { logout } from './authAPI'




const  {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API,
} = settingsEndpoints;


export function updateDisplayPicture(token, formData) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        try {
            const response = await apiConnector(
                "PUT",
                UPDATE_DISPLAY_PICTURE_API,
                formData,
                {
                    "Content-Type" : "multipart/form-data",
                    Authorization : `Bearer ${token}`
                }
            )

            console.log("Update display picture api resonse...", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Display Picture Update Successfully");
            dispatch(setUser(response.data.updatedUser))
            localStorage.setItem("user", JSON.stringify(response.data.updatedUser));

        } catch (error) {
            console.log("Error occured while updating display picture..", error);
            toast.error("Could Not Update Display Picture");
        }

        toast.dismiss(toastId);
    }
}

export function updateProfile(token, formData) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        try {
            const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
                Authorization : `Bearer ${token}`,
            })
            console.log("Update profile api response...", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            const userImage = response.data.updatedUserDetails.image
                ? response.data.updatedUserDetails.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`

            dispatch(
                setUser({...response.data.updatedUserDetails, image: userImage})
            )
            localStorage.setItem("user", JSON.stringify(response.data.updatedUserDetails));

            toast.success("Profile Updated Successfully");

        } catch (error) {
            console.log("Update profiel api error..", error);
            toast.error("Could Not Update Profile");
        }

        toast.dismiss(toastId);
    }
}

// TODO : Create change password api in server

export async function changePassword(token, formData) {
    const toastId = toast.loading("Loading...");

    try {
        const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
            Authorization : `Bearer ${token}`,
        });
        console.log("Change password api respone..", response);
        
        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        toast.success("Password Changed Successfully");
    } catch (error) {
        console.log("Change password api error..", error);
        toast.error("Could not change password");
    }

    toast.dismiss(toastId);
}

export function deleteProfile(token, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        try {
            const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
                Authorization : `Bearer ${token}`,
            })
    
            console.log("Delete profile api response..", response);
    
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
    
            toast.success("Profile Delete Successfully");
            dispatch(logout(navigate));
        } catch (error) {
            console.log("Delete profile api error.....", error);
            toast.error("Could Not Delete Profile");
        }

        toast.dismiss(toastId);
    } 
}