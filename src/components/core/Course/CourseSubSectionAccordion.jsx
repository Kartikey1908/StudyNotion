import React from 'react'
import { HiOutlineVideoCamera } from 'react-icons/hi'

const CourseSubSectionAccordion = ({subSec}) => {
    return (
        <div>
            <div className='flex justify-between py-2 px-6'>
                <div className='flex items-center gap-2'>
                    <span>
                        <HiOutlineVideoCamera/>
                    </span>
                    <p>{subSec?.title}</p>
                </div>
                <div>
                    <p>
                        {(Math.round((parseFloat(subSec?.timeDuration)) * 100) /100).toFixed(2)}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CourseSubSectionAccordion