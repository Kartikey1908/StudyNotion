import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineDown } from 'react-icons/ai'
import CourseSubSectionAccordion from './CourseSubSectionAccordion';
import { IoIosArrowDown } from "react-icons/io";


const CourseAccordionBar = ({section, isActive, handleActive}) => {
    const contentEl = useRef(null);
    const [active, setActive] = useState(false);

    useEffect(() => {
        setActive(isActive.includes(section._id));
    }, [isActive]);

    const [sectionHeight, setSectionHeight] = useState(0);

    useEffect(() => {
        setSectionHeight(active ? contentEl.current.scrollHeight : 0);
    }, [active]);

    return (
        <div className='overflow-hidden border border-solid border-richblack-600 bg-richblack-700 text-richblack-5 last:mb-0'>
            <div>
                <div
                    className={`flex cursor-pointer items-start justify-between bg-opacity-20 px-7 py-6 transition-[0.3s]`}
                    onClick={() => {
                        handleActive(section._id)
                    }}
                >
                    <div className='flex items-center gap-2'>
                        <i
                            className={
                                `${isActive.includes(section._id) ? "-rotate-180" : "rotate-0"} transition-all duration-200`
                            }
                        >
                            <IoIosArrowDown className=''/>
                        </i>
                        <p>{section?.sectionName}</p>
                    </div>
                    <div className='space-x-4'>
                        <span className='text-yellow-25'>
                            {`${section?.subSection?.length || 0} lecture(s)`}
                        </span>
                    </div>
                </div>
            </div>
            <div
                ref={contentEl}
                className={`relative h-0 overflow-hidden bg-richblack-900 transition-[height] duration-[0.35s] ease-[ease]`}
                style={{
                    height : sectionHeight
                }}
            >
                <div>
                    {section?.subSection?.map((subSec, i) => {
                        return <CourseSubSectionAccordion subSec={subSec} key={i} />
                    })}
                </div>
            </div>

        </div>
    )
}

export default CourseAccordionBar