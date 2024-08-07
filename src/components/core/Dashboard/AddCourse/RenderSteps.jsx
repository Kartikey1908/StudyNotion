import React from 'react'
import { FaCheck } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import CourseInformationForm from './CourseInformation/CourseInformationForm';
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm';
import PublishCourse from './PublishCourse/index.jsx';

const RenderSteps = () => {

    const {step} = useSelector((state) => state.course);

    const steps = [
        {
            id:1,
            title: "Course Information"
        },
        {
            id : 2,
            title: "Course Builder",
        },
        {
            id : 3,
            title: "Publish",
        }
    ];

    return (
        
        <>
            
            <div className='relative mb-2 flex w-full justify-center'>
                {steps.map( (item) => (
                    <>
                        <div className='flex items-center' >
                            <div className={`w-[30px] h-[30px] flex items-center justify-center rounded-full ${step === item.id 
                                && "bg-yellow-900 border-[1px] border-yellow-50 text-yellow-50"}
                                ${step > item.id ? "bg-yellow-200 border-yellow-50 text-richblack-900" : "bg-richblack-800 border-richblack-700 text-richblack-300"}`}>
                                {
                                    step > item.id ? (<FaCheck className='font-bold text-richblack-900'/>) : (item.id)
                                }  
                                
                            </div>
                            
                            
                        </div>
                        {item.id !== steps.length && (
                            <>
                                <div
                                    className={`h-[calc(34px/2)] w-[33%] border-dashed border-b-2 ${
                                        step > item.id ? "border-yellow-50" : "border-richblack-500"
                                    }`}
                                >

                                </div>
                            </>
                        )}
                        
                        {/* TODO :  add code for dashes between label */}
                    </>
                ))}
            </div>
            <div className='relative mb-16 flex w-full select-none justify-between'>
                {steps.map((item) => (
                    <>
                        <div
                            className='flex min-w-[130px] flex-col items-center gap-y-2'
                            key={item.id}
                        >
                            <p
                                className={`text-sm ${
                                    step >= item.id ? "text-richblack-5" : "text-richblack-500"
                                }`}
                            >
                                {item.title}
                            </p>
                        </div>
                    </>
                ))}
            </div> 
            

            {step === 1 && <CourseInformationForm/>}
            {step === 2 && <CourseBuilderForm/>}
            {step === 3 && <PublishCourse/>}

        </>
        
    )
}

export default RenderSteps