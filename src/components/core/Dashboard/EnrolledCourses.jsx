import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import ProgressBar from '@ramonak/react-progress-bar';
import { useNavigate } from 'react-router-dom';

const EnrolledCourses = () => {

    const {token} = useSelector( (state) => state.auth);
    const navigate = useNavigate();

    const [enrolledCourses, setEnrolledCourses] = useState(null);

    const getEnrolledCourses = async() => {
        try {
            const response = await getUserEnrolledCourses(token);
            setEnrolledCourses(response);
        } catch (error) {
            console.log("Unable to fetch Enrolled Courses")
        }
    }

    useEffect(() => {
        getEnrolledCourses();
    }, [])

  return (
    <div>
        <div className='text-3xl font-semibold text-richblack-5 mb-8'>Enrolled Courses</div>
        {
            !enrolledCourses ? (<div className='grid min-h-[calc(100vh-3.5rem)] place-items-center gap-y-4'>
                <div className='spinner'></div>
                <div>Loading...</div>
            </div>) 
            : !enrolledCourses.length ? (<p className='grid h-[10vh] w-full place-content-center text-richblack-5'>You have not enrolled in any course yet</p>)
            : (
                <div className='border border-richblack-700 rounded-lg' >
                    <div className='flex flex-1 gap-x-6 bg-richblack-700 rounded-t-lg px-6 py-4'>
                        <p className='text-richblack-5 flex-[50%]'>Course Name</p>
                        <p className='text-richblack-5 flex-[20%]'>Durations</p>
                        <p className='text-richblack-5 flex-[20%]'>Progress</p>
                    </div>

                    {/* cards */}
                    {
                        enrolledCourses.map( (course, index) => (
                            <div key={index} className='flex px-6 py-3 gap-x-6 border-b border-b-richblack-700'>
                                <div 
                                    onClick={() => {
                                        navigate(
                                            `/view-course/${course?._id}/section/${course?.courseContent?.[0]?._id}/sub-section/${course?.courseContent?.[0]?.subSection?.[0]?._id}`
                                        )
                                    }}
                                    className='flex gap-x-4 items-center flex-[50%] cursor-pointer'
                                >
                                    <img 
                                        src={course.thumbnail} 
                                        alt="" 
                                        className='h-[90px] rounded-lg object-cover' 
                                    />
                                    <div>
                                        <p className='text-richblack-5'>{course.courseName}</p>
                                        <p className='text-richblack-300'>
                                            {course.courseDescription.length > 50 
                                            ? `${course.courseDescription.slice(0, 50)}...`
                                            : course.courseDescription}
                                        </p>
                                    </div>
                                </div>

                                <div className='text-richblack-5 flex flex-[20%] items-center'>
                                    {/* 2h 30m */}
                                    {course?.totalDuration}
                                </div>

                                <div className='flex-[20%] flex flex-col gap-y-1 justify-center'>
                                    <p className='text-richblack-5 text-sm'>Progress: {course.progressPercentage || 0}%</p>
                                    <ProgressBar
                                        completed={course.progressPercentage || 0}
                                        height='8px'
                                        isLabelVisible={false}
                                    />
                                        
                                </div>
                            </div>
                        ))
                    }
                </div>
            )
            
        }

    </div>
  )
}

export default EnrolledCourses