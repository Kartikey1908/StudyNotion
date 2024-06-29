import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn';
import { FiPlusCircle } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { RiArrowRightWideFill } from "react-icons/ri";
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';
import NestedView from './NestedView';

const CourseBuilderForm = () => {

    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors}
    } = useForm();

    const [editSectionName, setEditSectionName] = useState(null);
    const {course} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const cancelEdit = () => {
        setEditSectionName(null);
        setValue("sectionName", "");
    }

    const goBack = () => {
        dispatch(setStep(1));
        dispatch(setEditCourse(true));
    }

    const goToNext = () => {
        if (course?.courseContent.length === 0) {
            toast.error("Please add atleast one section");
            return;
        }
        if (course.courseContent.some((section) => section.subSection.length === 0)) {
            toast.error("Please add atleast one lecture in each section");
            return;
        }
        dispatch(setStep(3));
    }

    const onSubmit = async(data) => {
        setLoading(true);
        let result;

        if (editSectionName) {
            result = await updateSection(
                {
                   sectionName : data.sectionName,
                   sectionId : editSectionName,
                   courseId : course._id, 
                }, token);

        }
        else {
            result = await createSection({
                sectionName : data.sectionName,
                courseId : course._id,
            }, token);
        }


        if (result) {
            console.log(result);
            dispatch(setCourse(result));
            setEditSectionName(null);
            setValue("sectionName", "");
        }

        setLoading(false);
    }

    const handleChangeEditSectionName = (sectionId, sectionName) => {
        if (editSectionName === sectionId) {
            cancelEdit();   
            return;
        }
        
        setEditSectionName(sectionId);
        setValue("sectionName", sectionName);
    }

    return (
        <div
            className='rounded-md border-richblack-700 bg-richblack-800 p-5 space-y-8 border'
        >
            <p className='text-2xl font-semibold text-richblack-5'>Course Builder</p>
            <form 
                className='flex flex-col gap-y-4'
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className='flex flex-col'>
                    <label 
                        htmlFor="sectionName"
                        className='label-style'
                    >
                        Section name <sup className='text-pink-200'>*</sup>
                    </label>
                    <input 
                        id='sectionName'
                        placeholder='Add Section name'
                        type="text" 
                        {...register('sectionName', {required: true})}
                        className='form-style'
                    />
                    {errors.sectionName && (
                        <span>Section Name is required</span>
                    )}
                </div>
                <div className='flex gap-x-3'>
                    <IconBtn
                        type={"Submit"}
                        text={editSectionName ? "Edit Section Name" : "Create Section"}
                        customClasses={"text-yellow-50 outline outline-1 outline-yellow-50"}
                        // iconName={"FiPlusCircle"}
                    >
                        <FiPlusCircle fontSize={19} />
                    </IconBtn>
                    {editSectionName && (
                        <button
                            type='button'
                            onClick={cancelEdit}
                            className='text-sm text-richblack-200 underline self-end'
                        >
                            Cancel Edit
                        </button>
                    )}
                </div>
            </form>

            {course.courseContent.length > 0 && (
                <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
            )}

            <div className='flex justify-end gap-x-3'>
                <button
                    onClick={goBack}
                    className='text-center bg-richblack-400 text-[14px] px-6 py-3 rounded-md font-semibold
                    text-black hover:scale-95 hover:font-bold trasition-all duration-200'
                >
                    Back
                </button>
                <IconBtn
                    text={"Next"}
                    onclick={goToNext}
                    customClasses={"bg-yellow-50"}
                    iconName={"FiArrowRight"}
                />
            </div>

        </div>
    )
}

export default CourseBuilderForm