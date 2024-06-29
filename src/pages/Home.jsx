import React from 'react'
import { Link } from 'react-router-dom'
import {FaArrowRight} from 'react-icons/fa'
import HighlightText from '../components/core/HomePage/HighlightText'
import CTAButton from '../components/core/HomePage/CTAButton'
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../components/core/HomePage/CodeBlocks'
import TimeLineSection from '../components/core/HomePage/TimeLineSection'
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection'
import InstructorSection from '../components/core/HomePage/InstructorSection'
import Footer from '../components/common/Footer'
import ExploreMore from '../components/core/HomePage/ExploreMore'
import ReviewSlider from '../components/common/ReviewSlider'

const Home = () => {
  return (
    <div>
        {/* Section 1 */}
        <div className='relative mx-auto flex flex-col w-11/12 items-center 
        text-white justify-between max-w-maxContent'>

           

            <div className=' group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
            transition-all duration-200 hover:scale-95 w-fit'>
                
                    <Link to = {"/signup"}>
                        <div className='flex flex-work items-center gap-2 rounded-full
                            px-10  group-hover:bg-richblack-900'>
                            <p>Become an Instructor</p>
                            <FaArrowRight/>
                        </div>

                    </Link>
            </div>


            {/* Heading */}
            <div className='text-center text-4xl font-semibold mt-7'>
                Empower Your Future With 
                <HighlightText text={"Coding Skills"}/>
            </div>

            {/* Sub heading */}
            <div className='w-[90%] text-center text-lg font-bold text-richblack-300 mt-4'>
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
            </div>

            {/* Buttons */}
            <div className='flex flex-row gap-7 mt-8'>
                <CTAButton active={true} linkto={"/signup"}>
                    Learn More
                </CTAButton>
                <CTAButton active={false} linkto={"/login"}>
                    Book a Demo
                </CTAButton>
            </div>

            {/* video */}
            <div className=' mx-3 my-12 max-w-[80%]
            shadow-[-5px_-10px_120px_2px_rgba(10,90,144,.3),20px_17px_0px_0px_rgb(255,255,255)]'>
                <video 
                muted
                loop
                autoPlay
                
                >
                 <source src={Banner} type='video/mp4'/>   
                </video>
            </div>

            {/* code secton 1 */}

            <div>
                <CodeBlocks
                    position={"md:flex-row flex-col items-center"}
                    heading={
                        <div className='text-4xl font-semibold'>
                            Unlock your 
                            <HighlightText text={<span>coding potential <br/></span>}/>
                            with our online courses
                        </div>
                    }
                    subheading={
                        "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                    }
                    ctabtn1={
                        {
                            btnText : "Try it yourself",
                            active : true,
                            linkto : "/signup"
                        }
                    }
                    ctabtn2={
                        {
                            btnText : "Learn More",
                            active : false,
                            linkto : "/login"
                        }
                    }

                    codeblock={
                        `<!DOCTYPE html>
                            <html>
                                <head><title>Example</title>
                                    <link rel="stylesheet" href="styles.css" /></head>
                                <body><h1><a href="/">Header</a></h1>
                                    <nav><a href="one/">One</a>
                                    <a href="two/">Two</a>
                                    <a href="three/">Three</a>
                                </nav></body></html>`
                    }
                    codeColor={`text-yellow-50`}
                    backgroundGradient = {"from-yellow-800/80"}
                />
            </div>

            {/* code secton 2 */}
            <div>
                <CodeBlocks
                    position={"md:flex-row-reverse flex-col items-center"}
                    heading={
                        <div className='text-4xl font-semibold'>
                            Start 
                            <HighlightText text={
                                <span>
                                    coding <br/> in seconds
                                </span>
                            }/>
                        </div>
                    }
                    subheading={
                        "Go ahead, give ita a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                    }
                    ctabtn1={
                        {
                            btnText : "Continue Lesson",
                            active : true,
                            linkto : "/signup"
                        }
                    }
                    ctabtn2={
                        {
                            btnText : "Learn More",
                            active : false,
                            linkto : "/login"
                        }
                    }

                    codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n    <link rel="stylesheet" href="styles.css"></head>\n<body><h1><a href="/">Header</a></h1>\n    <nav><a href="one/">One</a>\n        <a href="two/">Two</a>\n        <a href="three/">Three</a>\n</nav></body></html>`}
                    codeColor={`text-yellow-50`}
                    backgroundGradient = {"from-richblue-600/95"}
                />
            </div>

            <ExploreMore/>

        </div>

        {/* Section 2 */}
        <div className='bg-pure-greys-5 text-richblack-700'>
            <div className='homepage_bg h-[310px]'>
                <div className='w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto'>
                    <div className='h-[140px]'></div>
                    <div className='flex flex-row gap-7 text-white'>
                        <CTAButton active={true} linkto={'/signup'}>
                            <div className='flex gap-3 items-center'>
                                Explore Full Catalog
                                <FaArrowRight/>
                            </div>
                            
                        </CTAButton>
                        <CTAButton active={false} linkto={'/signup'}>
                            <div>
                                Learn More
                            </div>
                        </CTAButton>

                    </div>

                </div>
            </div>

            <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between
            gap-7'>

                <div className='flex flex-col md:flex-row gap-5 mb-10 mt-[95px]'>
                    <div className='text-4xl font-semibold w-[90%] md:w-[45%]'>
                        Get the skills you need for
                        <HighlightText text={<span>a Job that is in demand</span>}/>
                    </div>
                    <div className='flex flex-col gap-10  w-[88%] md:w-[40%] items-start'>
                        <div className='text-[16px]'>
                            The modern StudyNotion dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                        </div>
                        <CTAButton active={true} linkto={"/signup"}>
                                <div>
                                    Learn More
                                </div>
                            </CTAButton>
                    </div>
                </div>

                <TimeLineSection />

                <LearningLanguageSection />

            </div>

            

        </div>
          


        {/* Section 3 */}
        <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between mx-auto
        gap-8 bg-richblack-900 text-white'>

       
            <InstructorSection/>
    

            <h2 className='text-center text-4xl font-semibold mt-10'>Review from other learners</h2>
            <ReviewSlider/>

        </div>

        {/* Footer */}
        <Footer/>

    </div>
  )
}

export default Home
