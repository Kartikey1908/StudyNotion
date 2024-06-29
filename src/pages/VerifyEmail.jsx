import React, { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux'
import { sendOtp, signUp } from '../services/operations/authAPI';
import { Link, useNavigate } from 'react-router-dom';
import { GoArrowLeft } from "react-icons/go";
import { RxCountdownTimer } from "react-icons/rx";


const VerifyEmail = () => {
    const [otp, setOtp] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {signupData, loading} = useSelector( (state) => state.auth);
    useEffect( () => {
        if (!signupData) {
            navigate("/signup");
        }
    }, [signupData, navigate]);

    const handleOnSubmit = (e) => {
        e.preventDefault();

        const {
            firstName,
            lastName, 
            email, 
            password, 
            confirmPassword,
            accountType,
        } = signupData;
        

        dispatch(signUp(
            firstName,
            lastName, 
            email, 
            password, 
            confirmPassword,
            accountType,
            otp,
            navigate
         ));
    }

  return (
    <div className='overflow-hidden w-full min-h-svh flex flex-col items-center justify-center text-richblack-5'>
        {
            loading ? (
                <div>
                    <div className='spinner'></div>
                    <div className='text-3xl text-richblack-5 mt-6'>Loading ..</div>
                </div>
            ) : (
                <div className='translate-y-[-10%] flex flex-col gap-y-5 max-w-[508px] min-h-[448px] p-8'>
                    <div className='flex flex-col gap-3 pr-10 leading-[26px]'>
                        <h1 className='text-3xl font-bold'>Verify Email</h1>
                        <p className='text-richblack-300 text-[18px]'>A verification code has been sent to you. Enter the code below</p>
                    </div>
                    <form onSubmit={handleOnSubmit} className='flex flex-col gap-3'>
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            
                            renderInput={ (props) => (<input {...props} className='bg-richblack-800'/>)}
                            containerStyle = {
                                {
                                    width: "full",
                                    display : "flex",
                                    justifyContent: "space-between"

                                }
                            }
                            inputStyle={                                
                                {   boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, .18)",
                                    width : "3rem",
                                    height: "3em",
                                    borderRadius: "10px",
                                            

                                }    
                            }
                        />
                        <button type='submit'
                            className='w-full block mt-6 bg-yellow-50 rounded-[8px] py-[12px] px-[12px] font-semibold text-richblue-900'
                        >
                            Verify Email
                        </button>
                    </form>
                    <div className='flex items-center justify-between'>
                        <div>
                            <Link to={'/login'}>
                                <div className='flex items-center gap-2 text-sm'>
                                    <GoArrowLeft />
                                    <p>Back to Login</p>
                                </div>
                            </Link>
                        </div>
                        <button
                            onClick={() => dispatch(sendOtp(signupData.email, navigate))}
                        >
                            <div className='flex items-center gap-2 text-sm text-blue-400'>
                                <RxCountdownTimer />
                                Resend it
                            </div>
                        </button>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default VerifyEmail