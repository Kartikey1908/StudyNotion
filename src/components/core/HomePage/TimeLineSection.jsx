import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timeLineImage from "../../../assets/Images/TimelineImage.png"


const TimeLineSection = () => {

    const timeLine = [
        {
            Logo : Logo1,
            Heading : "Leadership",
            Description : "Fully committed to the success company",
        },
        {
            Logo : Logo2,
            Heading : "Responsibility",
            Description : "Students will always be our top priority",
        },
        {
            Logo : Logo3,
            Heading : "Flexibility",
            Description : "The ability to switch is an important skill",
        },
        {
            Logo : Logo4,
            Heading : "Solve the problem",
            Description : "Code your way to a solution",
        },
    ]

  return (
    <div>
        <div className='flex lg:flex-row flex-col gap-15 items-center'>

            <div className='md:w-[45%] w-[90%] flex flex-col gap-10'>
                {
                    timeLine.map( (element, index) => {
                        return (
                                <div className='flex flex-row gap-6' key={index}>

                                    <div className='w-[50px] h-[50px] bg-white flex items-center'>
                                        <img src={element.Logo} alt="" />
                                    </div>

                                    <div>
                                        <h2 className='font-semibold text-[18px]'>{element.Heading}</h2>
                                        <p className='text-base'>{element.Description}</p>
                                    </div>

                                </div>
                        )
                    })
                }
            </div>
            <div className='relative shadow-blue-200 z-5 mt-5 md:mt-0'>


                <img src={timeLineImage} 
                alt="timeLineImage" 
                className='z-[10] relative shadow-white object-cover h-fit w-[90%] md:w-full'
                />

                <div className='absolute z-10 bg-caribbeangreen-700 flex flex-row text-white
                uppercase py-7 left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                    <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-300
                    px-7'>
                        <p className='text-3xl font-bold'>10</p>
                        <p className='text-caribbeangreen-300 text-sm'>Years Of Experience</p>
                    </div>

                    <div className='flex gap-5 items-center px-7'>
                        <p className='text-3xl font-bold'>250</p>
                        <p className='text-caribbeangreen-300 text-sm'>Type Of Courses</p>
                    </div>
                </div>

                <div className={`z-[0] absolute rounded-full blur-md top-0 -left-5 h-[350px] sm:h-[500px] md:w-[108%] w-[98%] bg-[radial-gradient(ellipse,_var(--tw-gradient-stops))] from-blue-500/50 via-blue-500/30 to-blue-500/10`}></div>


            </div>

        </div>
    </div>
  )
}

export default TimeLineSection