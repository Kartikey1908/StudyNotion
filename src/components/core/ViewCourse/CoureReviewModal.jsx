import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { RxCross1 } from "react-icons/rx";
import { useSelector } from 'react-redux';
import ReactStars from 'react-stars';
import IconBtn from '../../common/IconBtn';
import { createRating } from '../../../services/operations/courseDetailsAPI';


const CoureReviewModal = ({setReviewModal}) => {

    const {user} = useSelector(state => state.profile);
    const {token} = useSelector(state => state.auth);
    const {courseEntireData} = useSelector(state => state.viewCourse)

    const {
        register, 
        handleSubmit, 
        getValues,
        setValue,
        formState: {errors},
    } = useForm();

    useEffect(() => {
        setValue("courseExperience", "");
        setValue("courseRating", 0);
    }, []);

    const ratingChange = (newRating) => {
        setValue("courseRating", newRating);
    }

    const onSubmit = async(data) => {
        await createRating(
            {
                courseId : courseEntireData?._id,
                rating: data.courseRating,
                review: data.courseExperience,
            }, 
            token
        )
        setReviewModal(false);
    }

    return (
        <div className='fixed inset-0 z-[1000] !mt-0 w-screen h-screen overflow-auto bg-white bg-opacity-10 backdrop-blur-sm grid place-items-center'>
            <div className='flex flex-col gap-y-4 bg-richblack-800 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 my-10'>
                {/* Modal Header */}
                <div className='flex justify-between items-center px-5 py-4 bg-richblack-700 rounded-t-lg'>
                    <p className='text-2xl text-richblack-5'>Add Review</p>
                    <button 
                        className='text-richblack-5'
                        onClick={() => setReviewModal(false)}
                    >
                        <RxCross1 className='text-richblack-5 text-2xl'/>
                    </button>
                </div>

                {/* Modal Body */}
                <div className='py-6'>

                    <div className='flex items-center justify-center gap-x-4'>
                        <img 
                            src={user?.image}
                            alt={user?.firstName + "profile"} 
                            className='aspect-square w-[52px] h-[52px] rounded-full object-cover'
                        />
                        <div>
                            <p className='text-richblack-5 font-semibold'>{user?.firstName} {user?.lastName}</p>
                            <p className='text-richblack-5 text-sm'>Posting Publicly</p>
                        </div>
                    </div>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className='mt-4 flex flex-col items-center gap-y-4'
                    >
                        <ReactStars
                            count={5}
                            onChange={ratingChange}
                            size={24}
                            color2={'#ffd700'}
                        />

                        <div className='w-11/12 px-6'>
                            <label htmlFor='courseExperience' className='label-style'>
                                Add Your Experience<span className='text-pink-200'><sup>*</sup></span>
                            </label>
                            <textarea 
                                name="courseExperience" 
                                id="courseExperience"
                                placeholder='Add Your Experience'
                                {...register("courseExperience", {required: true})}
                                className='form-style resize-none min-h-[130px] w-full'
                            />
                            {
                                errors.courseExperience && (
                                    <span>
                                        Please add your experience
                                    </span>
                                )
                            }
                        </div>

                        {/* cancel and save button */}
                        <div className='w-11/12 flex gap-x-3 items-center justify-end px-6 mb-2'>
                            <button
                                onClick={() => setReviewModal(false)}
                                className='px-6 py-3 bg-richblack-700 rounded-md text-richblack-5 shadow-[0_-1px_0_0_inset] shadow-white/50'
                            >
                                Cancel
                            </button>
                            <IconBtn
                                text={"Save"}
                                customClasses={"bg-yellow-50"}
                            />
                        </div>

                    </form>

                </div>
            </div>
        </div>
    )
}

export default CoureReviewModal