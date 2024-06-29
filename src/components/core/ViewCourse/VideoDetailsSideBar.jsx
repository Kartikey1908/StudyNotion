import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';
import { MdArrowBackIos } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";

const VideoDetailsSideBar = ({setReviewModal}) => {

    const [activeStatus, setActiveStatus] = useState("");
    const [videoBarActive, setVideoBarActive] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const {sectionId, subSectionId} = useParams();
    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures,
    } = useSelector(state => state.viewCourse)      

    useEffect(() => {
        ;(() => {
            if (!courseSectionData) {
                return;
            }

            const currentSectionIndex = courseSectionData.findIndex(
                (data) => data._id === sectionId
            )

            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection?.findIndex(
                (data) => data._id === subSectionId
            )
            const activeSubSectionId = courseSectionData?.[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id

            // set current section here
            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
            // set current subsection here
            console.log("Active subsection", activeSubSectionId);
            setVideoBarActive(activeSubSectionId);

        })()
        console.log("Completed Lectures" , completedLectures);
    }, [courseSectionData, courseEntireData, location.pathname])

    return (
        <>
            <div className='flex flex-col h-[calc(100vh - 3.5rem)] w-[320px] max-w-[350px] border-r-[1px] border-r-richblack-700 bg-richblack-800'>
                {/* for buttons and heading */}
                <div className='mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25'>
                    {/* for button */}
                    <div className='flex w-full items-center justify-between'>
                        <div 
                            onClick={() => {
                                navigate("/dashboard/enrolled-courses")
                            }}
                            className='flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90'
                            title='Back'
                        >
                            <MdArrowBackIos/>
                        </div>

                        <div>
                            <IconBtn
                                text={"Add Review"}
                                onclick={() => setReviewModal(true)}
                                customClasses={"bg-yellow-50"}
                            />
                        </div>
                    </div>
                    {/* for heading */}
                    <div className='flex flex-col'>
                        <p>{courseEntireData?.courseName}</p>
                        <p className='text-sm font-semibold text-richblack-500'>
                            {`${completedLectures?.length} / ${totalNoOfLectures}`}</p>
                    </div>
                </div>
                
                {/* for section and subsection */}
                <div className='h-[calc(100vh - 5rem)] overflow-y-auto'>
                    {
                        courseSectionData?.map((section, index) => (
                            <div
                                onClick={() => setActiveStatus(section?._id)}
                                key={index}
                                className='mt-2 cursor-pointer text-sm text-richblack-5'
                            >
                                {/* section */}

                                <div className='flex flex-row justify-between bg-richblack-600 px-5 py-4'>
                                    <div className='w-[70%] font-semibold'>
                                        {section?.sectionName}
                                    </div>
                                    <div className='flex items-center gap-3'>
                                        <span
                                            className={`${activeStatus === section?._id
                                                    ? "rotate-180"
                                                    : "rotate-0"
                                            } transition-all duration-200`}
                                        >
                                            <IoIosArrowDown/>
                                        </span>
                                    </div>
                                </div>

                                {/* subsections */}
                                <div>
                                    {
                                        activeStatus === section?._id && (
                                            <div className='transition-[height] duration-200 ease-in-out'>
                                                {
                                                    section?.subSection?.map((topic, index) => (
                                                        <div
                                                            className={`flex gap-3 px-5 py-2 cursor-pointer ${
                                                                videoBarActive === topic?._id 
                                                                ? "bg-yellow-200 text-richblack-800 font-semibold"
                                                                : "hover:bg-richblack-900 text-richblack-5"
                                                            }`}
                                                            key={index}
                                                            onClick={() =>{ 
                                                                navigate(
                                                                    `/view-course/${courseEntireData?._id}/section/${section._id}/sub-section/${topic._id}`
                                                                )
                                                                setVideoBarActive(topic?._id);
                                                            }}
                                                        >
                                                            <input 
                                                                type="checkbox" 
                                                                checked={completedLectures.includes(topic?._id)}
                                                                onChange={() => {}}
                                                            />
                                                            <span>
                                                                {topic?.title}
                                                            </span>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        )
                                    }
                                </div>

                            </div>
                        ))
                    }
                </div>

            </div>
        </>
    )
}

export default VideoDetailsSideBar