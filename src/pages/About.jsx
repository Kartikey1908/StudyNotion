import React from 'react'
import HighlightText from '../components/core/HomePage/HighlightText'
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import Quote from '../components/core/AboutPage/Quote'
import FoundingStory from  '../assets/Images/FoundingStory.png'
import StatsComponent from '../components/core/AboutPage/StatsComponent'
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'
import Footer from '../components/common/Footer'
import ReviewSlider from '../components/common/ReviewSlider'

const About = () => {
  return (
    <div className=' text-white  mx-auto w-full'>
        {/* section 1 */}
        <section className='md:pt-[100px] pt-[70px] pb-5 bg-richblack-800 xl:mb-[100px]'>
            <div className='relative text-center flex flex-col w-11/12 max-w-maxContent mx-auto'>
                <header className='lg:w-[913px] mb-6 xl:mb-[250px] mx-auto px-8 lg:px-14 flex flex-col gap-4'>
                    <h1 className=' text-4xl font-semibold text-richblack-5 leading-10'>
                        Driving Innovation in Online Education for a 
                        <HighlightText text={"Brighter Future"}/>
                    </h1>
                    <p className='text-center font-semibold leading-[24px] text-[16px] text-richblack-300'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                </header>
                <div className='xl:absolute xl:bottom-[-100px] xl:left-[50%] xl:translate-x-[-50%] xl:flex-nowrap  md:flex-row md:flex-wrap flex-col flex mx-auto items-center justify-center gap-y-3 gap-x-3 '>
                    <img 
                        src={BannerImage1}
                        alt="" 
                        />
                    <img 
                        src={BannerImage2}
                        alt="" 
                        className='relative z-10'
                    />
                    <img 
                    src={BannerImage3}
                    alt="" />

                    <div className={`z-[0] xl:opacity-70 opacity-0 absolute rounded-full blur-xl top-0 left-[50%] translate-x-[-50%] h-[36.88px] w-[357.43px] bg-[radial-gradient(ellipse,_var(--tw-gradient-stops))] from-[#E65C00] to-[#F9D423]`}></div>

                </div>
            </div>
            
        </section>

        {/* section 2 */}
        <section className='w-full mb-4'>
            <div className='relative text-center flex flex-col w-11/12 max-w-maxContent mx-auto'>
                <Quote/>
            </div>
        </section>

        {/* horizontal rule */}
        <div className='w-full h-[1px] bg-richblack-800'></div>

        {/* section 3 */}
        <section className='w-full mt-8'>
            <div className='flex flex-col lg:gap-32 gap-4 w-11/12 max-w-maxContent mx-auto lg:px-8 py-14'>

                {/* founding story wala div */}
                <div className='flex lg:flex-row flex-col items-center justify-between'>
                    {/* founding story left box */}
                    <div className='lg:max-w-[486px] flex flex-col gap-4'>
                        <h1 className='text-4xl bg-gradient-to-r bg-clip-text font-semibold from-[#833AB4] via-[#FD1D1D] to-[#FCB045] text-transparent pb-2'>Our Founding Story</h1>

                        <p className='text-[16px] font-semibold text-richblack-300'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                        <p className='text-[16px] font-semibold text-richblack-300'>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                    </div>
                    {/* founding story right box */}
                    <div className='md:p-10 p-6 relative'>
                        <img 
                            src={FoundingStory} 
                            alt="" 
                            className='relative z-[10]'
                            />
                        <div className={`z-[0] opacity-20  absolute rounded-[50%] blur-xl top-[-1%] left-[-1%] md:top-[2%] md:left-[2%] w-[67%] h-[71%]  max-h-[257.05px] max-w-[372.95px] bg-[radial-gradient(ellipse,_var(--tw-gradient-stops))] from-[#EC008C] to-[#FC6767]`}></div>

                    </div>
                </div>

                {/* vision and mission wala div */}
                <div className='flex lg:flex-row flex-col items-center justify-between gap-10'>
                    {/* left box */}
                    <div className='lg:max-w-[486px]  flex flex-col gap-4'>
                        <h1 className='text-4xl bg-gradient-to-r bg-clip-text font-semibold from-[#E65C00] to-[#F9D423] text-transparent pb-2'>Our Vision</h1>

                        <p className='text-[16px] font-semibold text-richblack-300'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>

                    </div>
                    {/* right box */}
                    <div className='lg:max-w-[486px] flex flex-col gap-4'>
                        <h1 className='text-4xl bg-gradient-to-r bg-clip-text font-semibold from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent pb-2'>Our Mission</h1>

                        <p className='text-[16px] font-semibold text-richblack-300'>Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                    </div>
                </div>
                
            </div>
        </section>

        {/* section 4 */}
        <StatsComponent/>

        {/* section 5 */}
        <section className='mx-auto flex flex-col items-center justify-center gap-5 mb-[150px] mt-16'>
            <div className='w-11/12 max-w-maxContent'>
                <LearningGrid/>
            </div>
            <div className='md:w-[37%] w-[90%]'>
                <ContactFormSection heading={"Get in Touch"} text={"We’d love to here for you, Please fill out this form."}/>
            </div>
        </section>

        <section className='w-11/12 max-w-maxContent mx-auto'>
            <div className=''>
                <h2 className='text-4xl text-center'>Reviews from other learners</h2>
                <ReviewSlider/>
            </div>
        </section>

        <Footer/>


    </div>
  )
}

export default About