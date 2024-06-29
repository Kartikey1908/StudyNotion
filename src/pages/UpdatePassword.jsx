import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../services/operations/authAPI';
import { useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { GoArrowLeft } from "react-icons/go";


const UpdatePassword = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const {loading} = useSelector( (state) => state.auth);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    })

    const {password, confirmPassword} = formData;

    const handleOnChange = (event) => {
        setFormData( (prevData) => ({
            ...prevData,
            [event.target.name]:event.target.value,
        }))
    }

    const handleOnSubmit = (event) => {
        event.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(password, confirmPassword, token));
    }

  return (
    <div className='w-full flex flex-col justify-center items-center min-h-screen'>
        {
            loading ? (
                <div>
                    <div className='spinner'></div>
                    <div className='text-3xl text-richblack-5 mt-6'>Loading....</div>
                </div>
            ) : (
                <div className='flex flex-col gap-y-5 max-w-[508px] p-[32px]'>
                   <div className='flex flex-col gap-3 pr-8'>
                        <h1 className='text-3xl font-semibold text-richblack-5'>Choose new password</h1>

                        <p className='text-richblack-300 text-[18px]'>Almost done.Enter your new password and you're all set.</p>
                   </div>
                    <form onSubmit={handleOnSubmit} className='w-full flex flex-col gap-4'>

                        <label className='flex flex-col gap-1 relative'>
                            <p className='text-richblack-5 text-[14px]'>New password <sup className='text-pink-300'>*</sup></p>
                            <input
                                required
                                type={showPassword ? "text" : "password"}
                                name='password'
                                value={formData.password}
                                onChange={handleOnChange}
                                placeholder='New Password'
                                style={{
                                    boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, .18)"
                                }}
                                className='w-full rounded-[.5rem] bg-richblack-800 text-richblack-5 p-[12px]'
                            />
                            <span
                                className='absolute right-3 top-[38px]' 
                                onClick={() => setShowPassword( (prev) => !prev )}>
                                {
                                    showPassword ? 
                                    <AiOutlineEyeInvisible 
                                        fontSize={24} 
                                        fill='#AFB2BF'/>:
                                    <AiOutlineEye 
                                        fontSize={24}
                                        fill='#AFB2BF'/>
                                }
                            </span>
                        </label>

                        <label className='flex flex-col gap-1 relative'>
                            <p className='text-richblack-5 text-[14px]'>Confirm New Password <sup className='text-pink-300'>*</sup></p>
                            <input
                                required
                                type={showConfirmPassword ? "text" : "password"}
                                name='confirmPassword'
                                value={formData.confirmPassword}
                                onChange={handleOnChange}
                                placeholder='Confirm Password'
                                style={{
                                    boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, .18)"
                                }}
                                className='w-full rounded-[.5rem] bg-richblack-800 text-richblack-5 p-[12px]'
                            />
                            <span 
                                className='absolute right-3 top-[38px]' 
                                onClick={() => setShowConfirmPassword( (prev) => !prev )}>
                                {
                                    showConfirmPassword ? 
                                    <AiOutlineEyeInvisible 
                                        fontSize={24} 
                                        fill='#AFB2BF'/>:
                                    <AiOutlineEye 
                                        fontSize={24}
                                        fill='#AFB2BF'/>
                                }
                            </span>
                        </label>

                        <button 
                            className='w-full block mt-6 bg-yellow-50 rounded-[8px] py-[12px] px-[12px] font-semibold text-richblue-900'
                            type='submit'>
                                Reset Password
                        </button>

                    </form>
                   <div className='text-richblack-5 items-center w-full ml-auto flex'>
                        <Link to={'/login'}>
                            <div className='flex items-center gap-2 text-sm'>
                                <GoArrowLeft />
                                <p className=''>Back to Login</p>
                            </div>
                        </Link>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default UpdatePassword