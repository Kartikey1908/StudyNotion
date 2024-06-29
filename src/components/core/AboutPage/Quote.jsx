import React from 'react'
import HighlightText from '../HomePage/HighlightText'

const Quote = () => {
  return (
    <div className='text-4xl leading-[52px] text-center px-14 py-10'>
        <span className='pr-1 text-richblack-800 w-[28px] h-[20px] font-semibold text-[3.5rem]'>“</span>
        We are passionate about revolutionizing the way we learn. Our innovative platform
        <HighlightText text={"combines technology"}/>
        <span className='bg-gradient-to-r text-transparent bg-clip-text from-[#FF512F] to-[#F09819]'>
            {" "}
            expertise
        </span>
        , and community to create an 
        <span className='bg-gradient-to-r text-transparent bg-clip-text from-[#E65C00] to-[#F9D423]'>
            {" "}
            unparalleled educational experience.
        </span>
        <span className='pl-1 text-richblack-800 font-semibold text-[3.5rem]'>”</span>
    </div>
  )
}

export default Quote