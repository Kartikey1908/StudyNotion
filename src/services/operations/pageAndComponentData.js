import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { catalogData } from "../apis";

const {
    CATALOGPAGEDATA_API
} = catalogData;

export const getCatalogPageData = async(categoryId) => {
    let result = [];
    const toastId = toast.loading("Loading...");
    
    try {
        const response = await apiConnector("POST", CATALOGPAGEDATA_API, {
            categoryId : categoryId,
        })
        console.log("Catalog data api response...", response);

        if (!response?.data?.success) {
            throw new Error("Could not fetch category page data");
        }

        result = response?.data?.data;
    
    } catch (error) {
        console.log("Catalog data api error...", error);
        toast.error(error?.message)
        result = error.response?.data
    }
    toast.dismiss(toastId)
    return result
}