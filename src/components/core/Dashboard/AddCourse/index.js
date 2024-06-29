import React from "react"
import RenderSteps from "./RenderSteps"
import { MdOutlineElectricBolt } from "react-icons/md";

export default function AddCourse() {
    return (
        <>
            <div className="text-white flex flex-col md:flex-row justify-between gap-x-3 w-full">
                <div className="w-[53%]">
                    <h1 className='text-3xl mb-8 font-semibold text-richblack-5'>Add Course</h1>
                    <div >
                        <RenderSteps/>
                    </div>
                </div>
                <div className="bg-richblack-800 h-fit p-7 w-[44%] rounded-md flex flex-col gap-5 border-[1px] border-richblack-700">
                    <p className="text-lg font-semibold flex">
                        <MdOutlineElectricBolt fontSize={24} fill="#f3f722" />
                        Code Upload Tips
                    </p>
                    <ul className="flex flex-col gap-4">
                        <li>&#8226; Set the Course Price option or make it free.</li>
                        <li>&#8226; Standard size for the course thumbnail is 1024x576.</li>
                        <li>&#8226; Video section controls the course overview video.</li>
                        <li>&#8226; Course Builder is where you create & organize a course.</li>
                        <li>&#8226; Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                        <li>&#8226; Information from the Additional Data section shows up on the course single page.</li>
                        <li>&#8226; Make Announcements to notify any important</li>
                        <li>&#8226; Notes to all enrolled students at once.</li>

                    </ul>
                </div>
            </div>
        </>
    )
}