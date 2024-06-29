import { combineReducers } from '@reduxjs/toolkit';
import copy from 'copy-to-clipboard';
import React from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ACCOUNT_TYPE } from '../../../utils/constants';
import { addToCart } from '../../../slices/cartSlice';
import { BsFillCaretRightFill } from 'react-icons/bs'
import { FaShareSquare } from 'react-icons/fa';

const CourseDetailsCard = ({course, setConfirmationModal, handleBuyCourse}) => {
    
    const {
        thumbnail,
        price:CurrentPrice
    } = course;
    
    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        if (user && user.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("You are an Instructor, you can't buy a course");
            return;
        }

        if (token) {
            dispatch(addToCart(course));
            return;
        }

        setConfirmationModal({
            text1:"You are not Logged in",
            text2:"Please Login to add to cart",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
        })
    }

    const handleShare = () => {
        copy(window.location.href);
        toast.success("Link Copied to Clipboard ");
    }   

    return (
        <div className='flex flex-col gap-4 rounded-xl bg-richblack-700 text-richblack-5'>
            <img 
                src={thumbnail}
                alt={course?.courseName}
                className='max-h-[300px] min-h-[180px] [w-400px] overflow-hidden rounded-t-xl object-cover md:max-w-full'
            />
            
            <div className='px-4 py-4 space-y-4'>
                <div className='text-3xl pb-4 font-semibold space-x-3'>
                    ₹ {CurrentPrice}
                </div>
                <div className='flex flex-col gap-4 '>
                    <button
                        onClick={
                            user && course?.studentsEnrolled?.includes(user?._id)
                            ? () => navigate("/dashboard/enrolled-courses")
                            : () => handleBuyCourse()
                        }
                        className='yellowButton'
                    >
                        {
                            user && course?.studentsEnrolled?.includes(user?._id) 
                            ? "Go to Course" 
                            : "Buy Now"
                        }
                    </button>

                    {
                        (!course?.studentsEnrolled?.includes(user?._id)) && (
                            <button
                                onClick={handleAddToCart}
                                className='blackButton'
                            >
                                Add to Cart
                            </button>
                        )
                    }

                </div>

                <div>
                    <p className='pb-3 pt-6 text-center text-sm text-richblack-25'>
                        30-Day Money-Back Guarantee
                    </p>
                </div>

                <div>
                    <p className='font-semibold my-2 text-xl'>
                        This Course include: 
                    </p>
                    <div className='flex flex-col gap-3 text-sm text-caribbeangreen-100'>
                        {
                            course?.instructions?.map((item, index) => (
                                <p key={index} className='flex gap-2 items-center'>
                                    <BsFillCaretRightFill />
                                    <span>{item}</span>
                                </p>
                            ))
                        }
                    </div>
                </div>

                <div className='text-center'>
                    <button 
                        onClick={handleShare}
                        className='text-yellow-100 mx-auto flex items-center gap-2 py-6'
                    >
                        <FaShareSquare size={15}/> Share
                    </button>
                </div>
            </div>

        </div>
    )
}

export default CourseDetailsCard