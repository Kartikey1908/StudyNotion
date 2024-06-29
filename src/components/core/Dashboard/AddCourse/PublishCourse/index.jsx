import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { resetCourseState, setStep } from '../../../../../slices/courseSlice';
import IconBtn from '../../../../common/IconBtn';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';
import { useNavigate } from 'react-router-dom';

const PublishCourse = () => {

    const {
        register, 
        handleSubmit,
        setValue,
        getValues,
        formState: {errors}
    } = useForm();

    const dispatch = useDispatch();
    const {course} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (course?.status === COURSE_STATUS.PUBLISHED) {
            setValue("public", true);
        }
    }, [])

    const goBack = () => {
        dispatch(setStep(2));
    }

    const goToCourses = () => {
        dispatch(resetCourseState());
        navigate("/dashboard/my-courses");
    }

    const handleCoursePublish = async () => {
        if (course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true ||
        (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)) {
            // no updation in form so no need to call api
            goToCourses();
            return;
        }

        // form updated so make api call to update course
        const formData = new FormData();
        formData.append("courseId", course._id);
        const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
        formData.append("status", courseStatus);

        setLoading(true);
        const result = await editCourseDetails(formData, token);

        if (result) {
            goToCourses();
        }

        setLoading(false);
    }

    const onSubmit = () => {
        handleCoursePublish();
    }


    return (
        <div className='rounded-md border-[1px] border-richblack-700 p-6 bg-richblack-800 '>
            <p className='text-2xl font-semibold text-richblack-5'>Publish Course</p>
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className='my-6 mb-8'>
                    <label htmlFor="public" className='relative incline-flex items-center text-lg'>
                        <input 
                            type="checkbox" 
                            id='public'
                            {...register("public")}
                            className="rounded border-2 border-richblack-300 h-4 w-4 bg-richblack-800 focus:ring-2 focus:ring-richblack-5  text-richblack-400 
                            appearance-none checked:after:absolute checked:after:w-4 checked:after:h-4 
                            checked:after:left-0 checked:after:top-0  checked:after:bg-[#0000FF] 
                            checked:after:text-richblack-5 checked:after:content-['✔']
                            checked:after:inline-flex checked:after:items-center checked:after:justify-center"
                        />
                        <span className='ml-2 text-richblack-500'>
                            Make this course as Public
                        </span>
                    </label>
                </div>

                <div className='flex justify-end gap-x-4 mt-6'>
                    <button
                        disabled={loading}
                        type='button'
                        onClick={goBack}
                        className='flex items-center rounded-md py-2 px-5 bg-richblack-300
                        hover:scale-95 transition-all duration-200'
                    >
                        Back
                    </button>
                    <IconBtn
                        text={"Save Changes"}
                        customClasses={"bg-yellow-50"}
                        disabled={loading}
                    />
                </div>
            </form>
        </div>
    )
}

export default PublishCourse