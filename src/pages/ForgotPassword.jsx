import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI';
import { GoArrowLeft } from "react-icons/go";


const ForgotPassword = () => {

    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();

    const {loading} = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent));
    }

  return (
    <div className='grid place-items-center text-richblack-5 min-h-screen'>
        <div className='md:max-w-[508px] md:min-h-[448px] p-3 translate-y-[-10%]'>
            {
                loading ? (
                    <div>
                            
                        <div className='spinner'></div>
                        <div className='text-3xl text-richblack-5 mt-6'>Loading....</div>
                    </div>
                ) : (
                    <div className=' gap-y-5 flex flex-col items-center w-full p-8'>
                        <div className='gap-2 flex flex-col pr-8'>
                            <h1 className='text-3xl'>
                                {
                                    !emailSent ? "Reset your Password" : "Check Your Email"
                                }
                            </h1>

                            <p className='text-richblack-300 text-[18px]'>
                                {
                                    !emailSent ? "Have no fear. We'll email you instructions to reset your password. If you don't have access to your email we can try account recovery" : 
                                    `We have sent the reset email to ${email}`
                                }
                            </p>
                        </div>
                        <form onSubmit={handleSubmit} className='w-full flex flex-col gap-6 flex-wrap'>
                            {
                                !emailSent && (
                                    <label className='gap-1 flex-col flex'>
                                        <p>Email Address <sup className='text-pink-200'>*</sup> </p>
                                        <input
                                            required
                                            type='text'
                                            name='email'
                                            value = {email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder='Enter Your Email Address'
                                            style={{
                                                boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, .18)"
                                            }}
                                            className='w-full rounded-[.5rem] bg-richblack-800 text-richblack-5 p-[12px]'

                                        />
                                    </label>
                                )
                            }
                            <button type='submit'
                                 className='w-full block  bg-yellow-50 rounded-[8px] py-[12px] px-[12px] font-semibold text-richblue-900'
                            >
                                {
                                    !emailSent ? "Reset Password" : "Resend Email"
                                }
                            </button>
                        </form>
                        <div className='w-full'>
                            <Link to={'/login'}>
                                <div className='flex gap-2 ml-auto w-full items-center text-sm'>
                                    <GoArrowLeft />
                                    <p>Back to Login</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                )

            }
        </div>

    </div>
  )
}

export default ForgotPassword