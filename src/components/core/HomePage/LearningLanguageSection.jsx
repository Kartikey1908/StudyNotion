import React from 'react'
import HighlightText from './HighlightText'
import know_your_progress from "../../../assets/Images/Know_your_progress.png"
import compare_with_other from "../../../assets/Images/Compare_with_others.png"
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton from './CTAButton'

const LearningLanguageSection = () => {
  return (
    <div>
        <div className='flex flex-col gap-5 mt-[130px] items-center'>
            <div className='text-4xl font-semibold text-center'>
                Your swiss knife for
                <HighlightText text={`learning any language`}/>
            </div>

            <div className='text-center text-richblack-600 mx-auto text-base mt-3 font-medium w-[70%]'>
                Using spin making learning multiple languages easy. With 20+ learning realistic voice-over,
                progress tracking, custom schedule and more.
            </div>

            <div className='flex md:flex-row flex-col items-center justify-center  mt-5'>
                <img 
                    src={know_your_progress}
                    alt="" 
                    className='object-contain md:-mr-32 '
                />
                <img 
                    src={compare_with_other}
                    alt="" 
                    className='object-contain -mt-16 md:mt-0'
                />
                <img 
                    src={plan_your_lesson}
                    alt="" 
                    className='object-contain md:-ml-36 -mt-24 md:mt-0'
                />

            </div>

            <div className='w-fit mb-10'>
                <CTAButton active={true} linkto={"/signup"}>
                    <div>
                        Learn More
                    </div>
                </CTAButton>
            </div>

        </div>
    </div>
  )
}

export default LearningLanguageSection