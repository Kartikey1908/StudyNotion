import React, { useState } from 'react'
import {AiOutlineEyeInvisible, AiOutlineEye} from 'react-icons/ai'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../../services/operations/authAPI';

const LoginForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email:"",
        password:"",
    });

    const [showPassword, setShowPassword] = useState(false);
    const {email, password} = formData;
    const handleOnChange = (event) => {
        setFormData( (prevData) => ({
            ...prevData,
            [event.target.name]:event.target.value,
        }))
    }

    const handleOnSubmit = (event) => {
        event.preventDefault();
        dispatch(login(email, password, navigate));
    } 
    
    return (
        <form 
            onSubmit={handleOnSubmit}
            className='mt-6 flex w-full flex-col gap-y-4'>

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
                        boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, .18)"
                    }}
                    className='w-full rounded-[.5rem] bg-richblack-800 text-richblack-5 p-[12px]'
                />
            </label>
            <label className='w-full relative mt-2'>
                <p className='mb-1 text-[.875rem] leading-[1.375rem] text-richblack-5'>
                    Password <sup className='text-pink-200'>*</sup>
                </p>
                <input
                    required
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    value={formData.password}
                    onChange={handleOnChange}
                    placeholder='Enter Password'
                    style={{
                        boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, .18)"
                    }}
                    className='w-full rounded-[.5rem] bg-richblack-800 text-richblack-5 p-[12px]'
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
                    ):(
                        <AiOutlineEye
                            fill='#AFB2BF'
                            fontSize={24}
                            />
                    )}                    
                </span>

                <p className='mt-1 flex flex-row-reverse text-xs text-blue-100'>
                    <Link to={'/forgot-password'}>
                        Forgot Password
                    </Link>
                </p>
               
               
               
            </label>
            <button
                type='submit'
                className='mt-6 bg-yellow-50 rounded-[8px] py-[12px] px-[12px] font-semibold text-richblue-900'
            >
                Sign in
            </button>

        </form>
    )
}

export default LoginForm