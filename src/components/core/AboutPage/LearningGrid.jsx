import React from 'react'
import HighlightText from '../HomePage/HighlightText'
import CTAButton from '../HomePage/CTAButton'

const LearningGridArray = [
    {
        order: -1,
        heading: "World-Class Learning for",
        HighLightText : "Anyone, Anywhere",
        description: 
            "StudyNotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant onLine learning to individual and organisations worldwide.",
        BtnText: "Learn More",
        BtnLink: "/",
    },
    {
        order: 1,
        heading: "Curriculum Based on Industry Needs",
        description: 
            "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
        order: 2,
        heading: "Our Learning Methods",
        description: 
            "The learning process uses the namely online and offline.",
    },
    {
        order: 3,
        heading: "Certification",
        description: 
            "You will get a certificate that can be used as a certification during job hunting.",
    },
    {
        order: 4,
        heading: `Rating "Auto-grading"`,
        description: 
            "You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.",
    },
    {
        order: 5,
        heading: "Ready to Work",
        description: 
            "Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.",
    },
]



const LearningGrid = () => {
  return (
    <div className='grid mx-auto grid-cols-1 lg:grid-cols-4 mb-10 p-5'>
        {
            LearningGridArray.map( (card, index) => {
                return (
                    <div
                        key={index}
                        className={`lg:h-[280px] p-5 ${index === 0 && "lg:col-span-2 bg-transparent"}
                            ${
                                card.order % 2 === 1 ? "bg-richblack-700" : "bg-richblack-800"
                            }
                            ${card.order === 3 && "lg:col-start-2"}
                            
                        `}

                    >
                        {
                            card.order < 0 
                            ? (
                                <div className='lg:w-[90%] flex flex-col pb-5 gap-3'>
                                    <div className='text-4xl font-semibold'>
                                        {card.heading}
                                        <HighlightText text={card.HighLightText} />
                                    </div>
                                    <p className='font-medium'>
                                        {card.description}
                                    </p>
                                    <div className='w-fit mt-4'>
                                        <CTAButton active={true} linkto={card.BtnLink}>
                                            {card.BtnText}
                                        </CTAButton>
                                    </div>
                                </div>
                            )
                            : (
                                <div className='flex flex-col gap-8 p-3 sm:p-7'>
                                    <h1 className='text-richblack-5 text-lg text-[18px] font-semibold leading-[26px]'>
                                        {card.heading}
                                    </h1>
                                    <p className='text-richblack-300 font-medium text-[14px]'>
                                        {card.description}
                                    </p>
                                </div>
                            )
                        }
                    </div>
                )
            })
        }
    </div>
  )
}

export default LearningGrid