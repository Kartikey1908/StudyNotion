import React from 'react'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
import frameImg from '../../../assets/Images/frame.png'

const Template = ( {title, description1, description2, image, formType}) => {
  return (
    <div className='grid min-h-screen place-items-center'>

        <div className='w-11/12 max-w-maxContent mx-auto flex flex-col-reverse md:flex-row md:gap-x-12 justify-between'>

            <div className='mx-auto w-11/12 max-w-[450px] md:mx-0'>
                <h1 className='font-semibold text-4xl leading-[2.375rem] text-richblack-5'>
                    {title}
                </h1>
                <p className='mt-4 text-[1.125rem] leading-[1.625rem]'>
                    <span className='text-richblack-100'>
                        {description1}
                    </span>
                    <span className='text-blue-100 font-bold italic font-edu-sa'>
                        {description2}
                    </span>
                </p>
                {formType === "signup" ? <SignupForm/> : <LoginForm/>}
            </div>

            <div className='relative mx-auto w-11/12 max-w-[450px] md:mx-0'>
                <img 
                    src={frameImg} 
                    alt="Pattern" 
                    width={558}
                    height={504}
                    loading="lazy"
                />
                <img 
                    src={image} 
                    alt="Students" 
                    width={558}
                    height={504}
                    loading="lazy"
                    className='absolute -top-4 right-4 z-10'
                />
            </div>

        </div>

    </div>
  )
}

export default Template