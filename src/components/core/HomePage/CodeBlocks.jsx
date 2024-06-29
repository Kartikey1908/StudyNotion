import React from 'react'
import CTAButton from './CTAButton'
import { FaArrowRight } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'

const CodeBlocks = ({
    position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codeColor
}) => {
  return (
    <div className={`flex ${position} md:my-20 my-10 justify-between gap-10`}>
        {/* section 1 */}
        <div className='md:w-[50%] w-[90%] text-center md:text-left flex flex-col gap-8'>
            {heading} 
            <div className='text-richblack-300 font-bold'>
                {subheading}
            </div>

            <div className='flex gap-7 mt-7 justify-center md:justify-start'>
                <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                    <div className='flex gap-2 items-center'>
                        {ctabtn1.btnText}
                        <FaArrowRight/>
                    </div>
                </CTAButton>
                <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                    {ctabtn2.btnText}
                </CTAButton>
            </div>

        </div>

        {/* section 2 */}
        
        <div className='relative flex h-fit flex-row w-[500px] justify-center py-4
         bg-richblack-800/25 '>
            {/* HW -> bg gradient */}
            <div className={`absolute -top-[45%] -left-[27%] h-[400px] w-[550px] bg-[radial-gradient(ellipse,_var(--tw-gradient-stops))] ${backgroundGradient} via-transparent to-transparent`}></div>
            

            <div className='z-[100] text-center flex flex-col w-[10%] text-richblack-400
             font-inter font-bold'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
            </div>

            <div className={`z-[100] w-[90%] flex flex-col gap-2 font-bold ${codeColor} font-mono pr-2`}>
                <TypeAnimation
                    sequence={[codeblock, 5000, ""]}
                    // wrapper={codeblock}
                    repeat={Infinity}
                    cursor={true}
                    omitDeletionAnimation={true}    

                    style={
                        {
                            whiteSpace: "pre-line",
                            display: "block",

                        }
                    }
                />
            </div>
        </div>
    </div>
  )
}

export default CodeBlocks