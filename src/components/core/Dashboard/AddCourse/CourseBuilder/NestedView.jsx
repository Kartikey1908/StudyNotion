import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSolidDownArrow } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import SubSectionModal from './SubSectionModal';
import  ConfirmationModal  from '../../../../common/ConfirmationModal'
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';

const NestedView = ({handleChangeEditSectionName}) => {

    const {course} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [addSubSection, setAddSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);
    
    useEffect(() => {
        console.log("Rendering again", course);
    }, [course])

    const [confirmationModal, setConfirmationModal] = useState(null);

    const handleDeleteSection = async(sectionId) => {
        const result = await deleteSection({
            sectionId,
            courseId: course._id,
        }, token);

        if (result) {
            dispatch(setCourse(result));
        }

        setConfirmationModal(null);
    }

    const handleDeleteSubSection = async (subSectionId, sectionId) => {
        const result = await deleteSubSection({
            subSectionId,
            sectionId,
        }, token);

        if (result) {
            const updatedCourseContent = course.courseContent.map((section) => section._id === sectionId ? result : section)
            const updatedCourse = {...course, courseContent : updatedCourseContent};
            dispatch(setCourse(updatedCourse));
        }

        setConfirmationModal(null);
    }

    return (
        <div>

            <div className='rounded-lg bg-richblack-700 py-4 px-8 text-richblack-5 border border-richblack-600'>
                {course?.courseContent?.map((section) => (
                    <details key={section._id} open>

                        <summary className='flex items-center justify-between gap-x-3 border-b-2  border-richblack-600 py-2  cursor-pointer'>
                            <div className='flex items-center gap-x-3 text-richblack-5 leading-6 text-[1rem] '>
                                <RxDropdownMenu className='text-2xl text-richblack-200' />
                                <p className='font-semibold text-richblack-50'>{section.sectionName}</p>
                            </div>
                            <div className='flex items-center gap-x-2'>
                                <button
                                    onClick={() => handleChangeEditSectionName(section._id, section.sectionName)}
                                >
                                    <MdEdit className='text-xl text-richblack-200' />
                                </button>
                                <button
                                    onClick={() => setConfirmationModal({
                                        text1 : "Delete this Section",
                                        text2 : "All the lectures in this section will be deleted",
                                        btn1Text : "Delete",
                                        btn2Text : "Cancel",
                                        btn1Handler : () => handleDeleteSection(section._id),
                                        btn2Handler : () => setConfirmationModal(null),
                                    })}
                                >
                                    <RiDeleteBin6Line className='text-xl text-richblack-200' />
                                </button>
                                <span className='font-medium text-richblack-300'>|</span>
                                <BiSolidDownArrow className='text-xl text-richblack-300' />
                            </div>
                        </summary>
                        
                        <div className='px-6 pb-4'>
                            {
                                section?.subSection?.map((data) => (
                                    <div 
                                        key={data?._id}
                                        onClick={() => setViewSubSection(data)}
                                        className='flex items-center justify-between gap-x-3 border-b-2 py-2 border-richblack-600 pl-4 cursor-pointer'
                                    >
                                        <div className='flex items-center gap-x-3 '>
                                            <RxDropdownMenu className='text-richblack-200 text-2xl' />
                                            <p className='text-richblack-50 font-semibold'>{data.title}</p>
                                        </div>

                                        <div
                                            onClick={(e) => e.stopPropagation()} 
                                            className='flex items-center gap-x-3'
                                        >
                                            <button
                                                onClick={() => setEditSubSection({...data, sectionId: section._id})}
                                            >
                                                <MdEdit className='text-xl text-richblack-300'/>
                                            </button>
                                            <button
                                                onClick={() => setConfirmationModal({
                                                    text1 : "Delete this Sub-Section",
                                                    text2 : "This lecture will be deleted",
                                                    btn1Text : "Delete",
                                                    btn2Text : "Cancel",
                                                    btn1Handler : () => handleDeleteSubSection(data._id, section._id),
                                                    btn2Handler : () => setConfirmationModal(null),
                                                })}
                                            >
                                                <RiDeleteBin6Line className='text-xl text-richblack-300'/>
                                                
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                            <button
                                onClick={() => setAddSubSection(section._id)}
                                className='mt-3 flex items-center gap-x-1 text-yellow-50'
                            >
                                <FaPlus className='text-lg'/>
                                <p>Add Lecture</p>
                            </button> 
                              
                        </div>
                        
                        

                    </details>
                ))}
            </div>

            {addSubSection ? (<SubSectionModal
                modalData={addSubSection}
                setModalData={setAddSubSection}
                add={true}
            />) 
            : viewSubSection ? (<SubSectionModal
                modalData={viewSubSection}
                setModalData={setViewSubSection}
                view={true}
            />) 
            : editSubSection ? (<SubSectionModal
                modalData={editSubSection}
                setModalData={setEditSubSection}
                edit={true}
            />) 
            : (<div></div>)}

            {confirmationModal ? (
                <ConfirmationModal
                    modalData={confirmationModal}
                />
            ) : (<div></div>)}

        </div>
    )
}

export default NestedView