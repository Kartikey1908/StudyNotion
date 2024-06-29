import React from 'react'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { BsGlobeAmericas } from "react-icons/bs";
import { IoCall } from "react-icons/io5";
import Footer from '../components/common/Footer';
import ReviewSlider from '../components/common/ReviewSlider';

const ContactUs = () => {
  return (
    <div className='w-full'>
        {/* width 11/12 wala div */}
        <div className='w-11/12 max-w-maxContent flex flex-col items-center gap-y-10 lg:gap-y-0 lg:items-start lg:flex-row mx-auto mt-20 justify-around'>
            {/* section*/}
            <div className='flex flex-col gap-10 bg-richblack-800 rounded-lg pl-10 pr-16 py-10 w-[38%] h-fit'>
                <div className='flex gap-3'>
                    <div><HiChatBubbleLeftRight fill='#838894' fontSize={24} /></div>
                    <div>
                        <h2 className='text-richblack-5 text-[18px]'>Chat on us</h2>
                        <p className='text-richblack-300 text-[14px]'>Our friendly team is here to help.</p>
                        <p className='text-richblack-300 text-[14px]'>@email address</p>
                    </div>
                </div>
                <div className='flex gap-3'>
                    <div><BsGlobeAmericas fill='#838894' fontSize={24} /></div>
                    <div>
                        <h2 className='text-richblack-5 text-[18px]'>Visit us</h2>
                        <p className='text-richblack-300 text-[14px]'>Come and say hello at our office HQ.</p>
                        <p className='text-richblack-300 text-[14px]'>Here is the location/ address</p>
                    </div>
                </div>
                <div className='flex gap-3'>
                    <div><IoCall fill='#838894' fontSize={24}  /></div>
                    <div>
                        <h2 className='text-richblack-5 text-[18px]'>Call us</h2>
                        <p className='text-richblack-300 text-[14px]'>Mon - Fri From 8am to 5pm</p>
                        <p className='text-richblack-300 text-[14px]'>+123 456 7890</p>
                    </div>
                </div>
            </div>

            {/* contact us form */}
            <div className='w-full lg:w-[50%] border rounded-lg border-richblack-600 py-6'>
            
                <ContactFormSection heading={"Got a Idea? We’ve got the skills. Let’s team up"} text={"Tell us more about yourself and what you’re got in mind."}/>

            </div>

            

            
        </div>

        {/* Review slider */}
        <section className='w-11/12 max-w-maxContent mx-auto mb-10 mt-10'>
                <div className=''>
                    <h2 className='text-4xl text-richblack-5 text-center'>Reviews from other learners</h2>
                    <ReviewSlider/>
                </div>
        </section>

        {/* Footer */}
        <Footer/>

    </div>
  )
}

export default ContactUs