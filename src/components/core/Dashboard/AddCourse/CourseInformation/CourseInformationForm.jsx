import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI';
import { HiOutlineCurrencyRupee } from 'react-icons/hi2';
import RequirementField from './RequirementField';
import { setCourse, setStep } from '../../../../../slices/courseSlice';
import IconBtn from '../../../../common/IconBtn';
import toast from 'react-hot-toast';
import {COURSE_STATUS} from '../../../../../utils/constants'
import ChipInput from './ChipInput';
import Upload from '../Upload';

const CourseInformationForm = () => {

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: {errors},
    } = useForm();

    const dispatch = useDispatch();
    const {course, editCourse} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);

    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);

    useEffect(() => {
        const getCategories = async() => {
            setLoading(true);
            const categories = await fetchCourseCategories();
            if (categories.length > 0) {
                setCourseCategories(categories);
            }
            setLoading(false);
        }
        
        if (editCourse) {
            setValue("courseTitle", course.courseName);
            setValue("courseShortDesc", course.courseDescription);
            setValue("coursePrice", course.price);
            setValue("courseTags", course.tag);
            setValue("courseBenefits", course.whatYouWillLearn);
            setValue("courseCategory", course.category);
            setValue("courseRequirements", course.instructions);
            setValue("courseImage", course.thumbnail);
        }

        getCategories();
    },[])

    const isFormUpdated = () => {
        const currentValues = getValues();

        if (currentValues.courseTitle !== course.courseName || 
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory._id !== course.category._id ||
            currentValues.courseImage !== course.thumbnail ||
            currentValues.courseRequirements.toString() !== course.instructions.toString())
            return true;
        else    
            return false;

    }

    const onSubmit = async (data) => {
        console.log("DATA is ", data);
        if (editCourse) {
            if (isFormUpdated()) {
                const currentValues = getValues();
                const formData = new FormData();

                formData.append("course",course._id);

                if (currentValues.courseTitle !== course.courseName) {
                    formData.append("courseName", data.courseTitle);
                }

                if (currentValues.courseShortDesc !== course.courseDescription) {
                    formData.append("courseDescription", data.courseShortDesc);
                }

                if (currentValues.coursePrice !== course.price) {
                    formData.append("price", data.coursePrice);
                }

                if (currentValues.courseBenefits !== course.whatYouWillLearn) {
                    formData.append("whatYouWillLearn", data.courseBenefits);
                }

                if (currentValues.courseCategory._id !== course.category._id) {
                    formData.append("category", data.courseCategory);
                }

                if (currentValues.courseRequirements.toString() !== course.instructions.toString()) {
                    formData.append("instructions", JSON.stringify(data.courseRequirements));
                }

                setLoading(true);
                const result = await editCourseDetails(formData, token);
                if (result) {
                    dispatch(setStep(2));
                    dispatch(setCourse(result));
                }
                setLoading(false);
                
            }
            else {
                toast.error("No changes made so far")
            }
            return;
        }
        
        const formData = new FormData();
        formData.append("courseName", data.courseTitle);
        formData.append("courseDescription", data.courseShortDesc);
        formData.append("price", data.coursePrice);
        formData.append("tags", JSON.stringify(data.courseTags))
        formData.append("thumbnail", data.courseImage)
        formData.append("whatYouWillLearn", data.courseBenefits);
        formData.append("category", data.courseCategory);
        formData.append("instructions", JSON.stringify(data.courseRequirements));
        formData.append("status", COURSE_STATUS.DRAFT)
        console.log(formData);
        setLoading(true);
        const result = await addCourseDetails(formData, token);
        if (result) {
            dispatch(setStep(2));
            dispatch(setCourse(result));
        }
        setLoading(false);
        
    }

    return (
        <form 
            onSubmit={handleSubmit(onSubmit)}
            className='rounded-md border-richblack-700 bg-richblack-800 p-5 space-y-8'
        >
            
            <div className='flex flex-col'>
                <label htmlFor='courseTitle' className='label-style'>Course Title <sup className='text-pink-200'>*</sup></label>
                <input 
                    id='courseTitle'
                    placeholder='Enter Course Title'
                    type="text"
                    {...register("courseTitle", {required: true})}   
                    className='form-style' 
                />
                {
                    errors.courseTitle && (
                        <span>Course Title is Required</span>
                    )
                }
            </div>

            <div className='flex flex-col'>
                <label htmlFor="courseShortDesc" className='label-style'>Course Short Description <sup className='text-pink-200'>*</sup></label>
                <textarea 
                    name="courseShortDesc" 
                    id="courseShortDesc" 
                    placeholder='Enter description of course'
                    {...register("courseShortDesc", {required: true})}
                    className='min-h-[140px] w-full form-style resize-none'
                />
                {
                    errors.courseShortDesc && (
                        <span>Course Description is required</span>
                    )
                }
            </div>

            <div className='relative flex flex-col'>
                <label htmlFor='coursePrice' className='label-style'>Course Price <sup className='text-pink-200'>*</sup></label>
                <div className='relative flex'>
                    <input 
                        id='coursePrice'
                        placeholder='Enter Course Price'
                        type="number"
                        {...register("coursePrice", {
                            required: true,
                            valueAsNumber: true
                        })}   
                        className='w-full px-8 relative rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none' 
                    />
                    <HiOutlineCurrencyRupee fontSize={24} className='absolute top-[25%]  left-1 text-richblack-400'/>
                </div>
                {
                    errors.coursePrice && (
                        <span>Course Price is Required</span>
                    )
                }
            </div>

            <div className='flex flex-col'>
                <label htmlFor='courseCategory ' className='label-style'>Course Catalog <sup className='text-pink-200'>*</sup></label>
                <select 
                    name="courseCategory" 
                    id="courseCategory"
                    defaultValue={""}
                    {...register("courseCategory", {required: true})}
                    className='form-style text-richblack-400'
                >
                    <option value="" disabled className='text-richblack-400'>Choose a Category</option>

                    {
                        !loading && courseCategories.map((category, index) => (
                            <option key={index} value={category?._id} className='text-richblack-5'>
                                {category?.name}
                            </option>
                        ))
                    }

                </select>
                {
                    errors.courseCategory && (
                        <span>
                            Course Category is Required
                        </span>
                    )
                }
            </div>

            <ChipInput
                label = "Tags"
                name="courseTags"
                placeholder="Enter tags and press enter"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
            />

            
            <Upload
                name="courseImage"
                label="Course Thumbnail"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
                editData={editCourse ? course?.thumbnail : null}
            />


            <div className='flex flex-col'>
                <label htmlFor="courseBenefits" className='label-style'>Benefits of the Course <sup className='text-pink-200'>*</sup></label>
                <textarea 
                    name="courseBenefits" 
                    id="courseBenefits"
                    placeholder='Enter the benefits of the course'
                    {...register("courseBenefits",{required:true})}
                    className='min-h-[140px] form-style resize-none'
                />
                {
                    errors.courseBenefits && (
                        <span>
                            Benefits of the course are required
                        </span>
                    )
                }
            </div>

            <RequirementField
                name="courseRequirements"
                label="Requirements/Instructions"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
            />

            <div className='flex gap-x-2'>
                {
                    editCourse && (
                        <button
                            onClick={() => dispatch(setStep(2))}
                            className='flex items-center gap-x-2 px-4 py-2 bg-richblack-700 font-bold text-richblack-25 rounded-md'
                        >
                            Continue without Saving
                        </button>
                    )
                }

                <IconBtn
                    text={!editCourse ? 'Next' : "Save Changes"}
                    customClasses={"bg-yellow-50"}
                    onsubmit={onSubmit}
                    disabled={loading}
                />
            </div>

        </form>
    )
}

export default CourseInformationForm