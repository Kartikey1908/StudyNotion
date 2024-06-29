import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { courseEndpoints } from "../apis";


const {
    GET_ALL_COURSE_API,
    COURSE_DETAILS_API,
    EDIT_COURSE_API,
    COURSE_CATEGORIES_API,
    CREATE_COURSE_API,
    CREATE_SECTION_API ,
    CREATE_SUBSECTION_API ,
    UPDATE_SECTION_API,
    UPDATE_SUBSECTION_API,
    GET_ALL_INSTRUCTOR_COURSES_API,
    DELETE_SECTION_API ,
    DELETE_SUBSECTION_API ,
    DELETE_COURSE_API,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED ,
    LECTURE_COMPLETION_API,
    CREATE_RATING_API ,
} = courseEndpoints;

export const getAllCourse = async() => {
    const toastId = toast.loading("Loading...");
    let result = [];
    try {
        const response = await apiConnector("GET", GET_ALL_COURSE_API)

        if (!response.data.success) {
            throw new Error("Could Not Fetch Course Categories");
        }
        result = response?.data?.data;

    } catch (error) {
        console.log("Get all course api error.....", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}



export const fetchCourseCategories = async () => {
    let result = [];
    try {
        const response = await apiConnector("GET", COURSE_CATEGORIES_API);
        console.log("Course category api response",response);

        if (!response?.data?.success) {
            throw new Error("Could not fetch course categories");
        }

        result = response?.data?.data;
    } catch (error) {
        console.log("Could not fetch the category list");
        toast.error(error.message);
    }
    return result;
}

// add Course details
export const addCourseDetails = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");

    try {
        const response = await apiConnector("POST", CREATE_COURSE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })
        console.log("Course creation api response....", response);

        if (!response?.data?.success) {
            throw new Error("Could Not Add Course Details");
        }
        toast.success("Course Details Added Successfully");
        result = response?.data?.data;

    } catch (error) {
        console.log("Create course api errorr...", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

// edit Course details
export const editCourseDetails = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("PUT", EDIT_COURSE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })
        console.log("Course edit api response....", response);

        if (!response?.data?.success) {
            throw new Error("Could Not Update Course Details");
        }
        toast.success("Course Details Updated Successfully");
        result = response?.data?.data;
    } catch (error) {
        console.log("Edit course api error...", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

// create a section
export const createSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", CREATE_SECTION_API, data, {
            Authorization : `Bearer ${token}`,
        })
        console.log("Create section api response....", response);

        if (!response?.data?.success) {
            throw new Error("Could Not Create Section");
        }
        toast.success("Course Section Created");
        result = response?.data?.updatedCourseDetails;

    } catch (error) {
        console.log("Create Section api error...", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

// create a Subsection
// TODO : verify video upload part
export const createSubSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })
        console.log("Create subsection api response.....", response);
        if (!response?.data?.success) {
            throw new Error("Could Not Add Lecture");
        }
        result = response?.data?.data;
        toast.success("Lecture Added");
    } catch (error) {
        console.log("Create SubSection api error...", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

// update section 
export const updateSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("PUT", UPDATE_SECTION_API, data, {
            Authorization : `Bearer ${token}`
        })
        console.log("Update section api response.....", response);  
        if (!response?.data?.success) {
            throw new Error("Could Not Update Section");
        }
        toast.success("Course Section Updated");
        result = response?.data?.data;
    } catch (error) {
        console.log("Update Section api error....", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

// update a subsection
// TODO : what if want to update the uploaded video
export const updateSubSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("PUT", UPDATE_SUBSECTION_API, data, {
            Authorization : `Bearer ${token}`
        })
        console.log("Update subsection section api response.....", response);  
        if (!response?.data?.success) {
            throw new Error("Could Not Update SubSection");
        }
        toast.success("Lecture Updated");
        result = response?.data?.data;
    } catch (error) {
        console.log("Update Sub Section api error....", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

// delete a section
export const deleteSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("DELETE", DELETE_SECTION_API, data, {
            Authorization : `Bearer ${token}`
        })
        console.log("Delete section section api response.....", response);  
        if (!response?.data?.success) {
            throw new Error("Could Not Delete Section");
        }
        result = response.data.courseDetails;
        toast.success("Course Section Deleted");
    } catch (error) {
        console.log("Delete Section api error....", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}


// delete a subsection
export const deleteSubSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("DELETE", DELETE_SUBSECTION_API, data, {
            Authorization : `Bearer ${token}`
        })
        console.log("Delete sub section section api response.....", response);  
        if (!response?.data?.success) {
            throw new Error("Could Not Delete Lecture");
        }
        result = response?.data?.data;
        toast.success("Lecture Deleted");
    } catch (error) {
        console.log("Delete Sub Section api error....", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}


// TODO create get all instructor course api

// get instructor course
export const fetchInstructorCourses = async (token) => {
    let result = [];
    const toastId = toast.loading("Loading");
    try {
        const response = await apiConnector(
            "GET",
            GET_ALL_INSTRUCTOR_COURSES_API,
            null,
            {
                Authorization: `Bearer ${token}`
            }
        )
        console.log("Instructor courses api response.....", response);
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Instructor Courses");
        }
        result = response?.data?.data;
    } catch (error) {
        console.log("Instructor Coures api error...", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

// delete a course
export const deleteCourse = async (data, token) => {
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
            Authorization : `Bearer ${token}`
        })
        console.log("Delete course api response.....", response);  
        if (!response?.data?.success) {
            throw new Error("Could Not Delete Course");
        }
        toast.success("Course Deleted");
    } catch (error) {
        console.log("Delete Course api error....", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
}

export const fetchCourseDetails = async(courseId) => {
    const toastId = toast.loading("Loading...");
    let result = null;
    try {
        const response = await apiConnector("POST", COURSE_DETAILS_API, {
            courseId,
        })
        console.log("Course details api response....", response);

        if (!response?.data?.success) {
            throw new Error("Could not fetch the course");
        }
        result = response?.data?.data;
        
    } catch (error) {
        console.log("Course details api error...", error);
        // TODO : Check here if correct or have to add toast also
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

export const getFullDetailsOfCourse = async (courseId, token) => {
    const toastId = toast.loading("Loading...");
    let result = null;
    
    try {
        const response = await apiConnector(
            "POST",
            GET_FULL_COURSE_DETAILS_AUTHENTICATED,
            {
                courseId,
            },
            {
                Authorization: `Bearer ${token}`,
            }
        )
        console.log("Course full details api response...", response);

        if (!response?.data?.success) {
            throw new Error(response?.data?.message);
        }

        result = response?.data?.data;
    } catch (error) {
        console.log("Course full details api error.....", error);
        result = error?.response?.data;
    }

    toast.dismiss(toastId);
    return result;
}

export const createRating = async(data, token) => {
    const toastId = toast.loading("Loading...");
    let success = false;

    try {
        const response = await apiConnector("POST", CREATE_RATING_API, data, {
            Authorization: `Bearer ${token}`,
        });
        console.log("Create rating api response....", response);
        
        if (!response?.data?.success) {
            throw new Error("Could Not Create Rating");
        }
        toast.success("Rating Created");
        success = true;
    } catch (error) {
        success= false;
        console.log("Create rating api error", error);
        toast.error(error.message);
    }

    toast.dismiss(toastId)
    return success;
}

export const markLectureAsComplete = async(data, token) => {
    let result = null;
    console.log("mark complete data", data);
    const toastId = toast.loading("Loading...");

    try {
        const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
            Authorization : `Bearer ${token}`
        })
        console.log("Mark lecture as complete api resonse...", response);

        if (!response?.data?.success) {
            throw new Error("Cannot mark lecture as complete");
        }
        toast.success("Lecture Completed");
        result = true;
    } catch (error) {
        console.log("Mark lecture complete API error..", error);
        toast.error(error.message);
        result = false;
    }

    toast.dismiss(toastId);
    return result;
}
