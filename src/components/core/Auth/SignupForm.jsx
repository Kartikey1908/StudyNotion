import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {ACCOUNT_TYPE} from "../../../utils/constants"
import { setSignUpData } from '../../../slices/authSlice';
import { sendOtp } from '../../../services/operations/authAPI';
import Tab from '../../common/Tab';

const SignupForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email : "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleOnChange = (event) => {
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value,
        }))
    }

    const {firstName, lastName, email, password, confirmPassword} = formData;

    const handleOnSubmit = (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Password Do Not Match");
            return;
        }
        const signupData = {
            ...formData,
            accountType,
        }

        dispatch(setSignUpData(signupData));
        dispatch(sendOtp(formData.email, navigate));

        // reset form data
        setFormData({
            firstName: "",
            lastName: "",
            email : "",
            password: "",
            confirmPassword: "",
        })

        setAccountType(ACCOUNT_TYPE.STUDENT);
    }

    const tabData = [
        {
            id: 1,
            tabName: "Student",
            type: ACCOUNT_TYPE.STUDENT,
        },
        {
            id: 2,
            tabName: "Instructor",
            type: ACCOUNT_TYPE.INSTRUCTOR,
        },
    ]

    return (
        <div>
            {/* tab data */}
            <Tab tabData={tabData} field={accountType} setField={setAccountType}/>
            <form onSubmit={handleOnSubmit}
                className='flex w-full flex-col gap-y-5 mt-4'    
            >

                <div className='flex gap-x-4'>
                    <label>
                        <p className='mb-1 text-[.875rem] leading-[1.375rem] text-richblack-5'>
                            First Name <sup className='text-pink-200'>*</sup>
                        </p>
                        <input 
                            required
                            type='text'
                            name='firstName'
                            value={formData.firstName}
                            onChange={handleOnChange}
                            placeholder='Enter first name'
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, .18)",
                            }}
                            className='w-full rounded-[.5rem] bg-richblack-800 p-[12px] text-richblack-5'
                        />
                    </label>
                    <label>
                        <p className='mb-1 text-[.875rem] leading-[1.375rem] text-richblack-5'>
                            Last Name <sup className='text-pink-200'>*</sup>
                        </p>
                        <input 
                            required
                            type='text'
                            name='lastName'
                            value={formData.lastName}
                            onChange={handleOnChange}
                            placeholder='Enter last name'
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, .18)",
                            }}
                            className='w-full rounded-[.5rem] bg-richblack-800 p-[12px] text-richblack-5'
                        />
                    </label>
                </div>
                
                <label className='w-full'>
                    <p className='mb-1 text-[.875rem] leading-[1.375rem] text-richblack-5'>
                        Email Address <sup className='text-pink-200'>*</sup>
                    </p>
                    <input 
                        required
                        type='text'
                        name='email'
                        value={formData.email}
                        onChange={handleOnChange}
                        placeholder='Enter email address'
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, .18)",
                        }}
                        className='w-full rounded-[.5rem] bg-richblack-800 p-[12px] text-richblack-5'
                    />
                </label>

                <div className='flex gap-4'>

                <label className='relative'>
                    <p className='mb-1 text-[.875rem] leading-[1.375rem] text-richblack-5'>
                        Create Password <sup className='text-pink-200'>*</sup>
                    </p>
                    <input 
                        required
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        value={formData.password}
                        onChange={handleOnChange}
                        placeholder='Enter Password'
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, .18)",
                        }}
                        className='w-full rounded-[.5rem] bg-richblack-800 p-[12px] text-richblack-5'
                    />
                    <span 
                        onClick={() => setShowPassword( (prev) => !prev)}
                        className='absolute right-3 top-[38px] z-[10] cursor-pointer'
                    >
                        {showPassword ? (
                            <AiOutlineEyeInvisible
                                fontSize={24}
                                fill='#AFB2BF'
                            />
                        ) : (
                            <AiOutlineEye
                                fontSize={24}
                                fill='#AFB2BF'
                            />
                        )}
                    </span>

                </label>

                <label className='relative'>
                    <p className='mb-1 text-[.875rem] leading-[1.375rem] text-richblack-5'>
                        Confirm Password <sup className='text-pink-200'>*</sup>
                    </p>
                    <input 
                        required
                        type={showConfirmPassword ? 'text' : 'password'}
                        name='confirmPassword'
                        value={formData.confirmPassword}
                        onChange={handleOnChange}
                        placeholder='Enter Password'
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, .18)",
                        }}
                        className='w-full rounded-[.5rem] bg-richblack-800 p-[12px] text-richblack-5'
                    />
                    <span 
                        onClick={() => setShowConfirmPassword( (prev) => !prev)}
                        className='absolute right-3 top-[38px] z-[10] cursor-pointer'
                    >
                        {showPassword ? (
                            <AiOutlineEyeInvisible
                                fontSize={24}
                                fill='#AFB2BF'
                            />
                        ) : (
                            <AiOutlineEye
                                fontSize={24}
                                fill='#AFB2BF'
                            />
                        )}
                    </span>

                </label>

                </div>

                <button
                    type='submit'
                    className='mt-6 bg-yellow-50 rounded-[8px] py-[8px] px-[12px] font-semibold text-richblack-900'
                >
                    Create Account
                </button>

            </form>
        </div>
    )
}

export default SignupForm