import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import CTAButton from './CTAButton'
import { FaArrowRight } from 'react-icons/fa'

const InstructorSection = () => {
  return (
    <div>
        <div className='flex md:flex-row flex-col-reverse md:mt-0 mt-8 md:gap-20 gap-5 md:items-center'>

            <div className='mt-14 md:w-[50%] w-[97%]'>
                <img 
                    src={Instructor} 
                    alt="" 
                    className='shadow-white'/>
            </div>

            <div className='md:w-[50%] w-[90%] flex flex-col gap-10'>
                <div className='font-semibold text-4xl w-[50%]'>
                    Become an   
                    <HighlightText text={"Instructor"} />
                </div>
                <p className='font-medium text-[16px] w-[80%] text-richblack-300'>
                    Instructors from around the world teach millions of students on StudyNotion. We provide the
                    tools and skills to teach what you love.
                </p>

                <div className='w-fit'>
                    <CTAButton active={true} linkto={"/signup"}>
                        <div className='text-[16px] flex flex-row gap-4 items-center'>
                            Start Learning Today
                            <FaArrowRight/>
                        </div>
                    </CTAButton>
                </div>
                

            </div>

        </div>
    </div>
  )
}

export default InstructorSection