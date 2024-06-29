import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI'
import IconBtn from '../../common/IconBtn'
import CoursesTable from './InstructorCourses/CoursesTable';

const MyCourse = () => {

  const {token} = useSelector((state) => state.auth);
  const navigate =  useNavigate();
  const [courses, setCourses] = useState([]);


  const fetchCourses = async() => {
    const result = await fetchInstructorCourses(token);
    if (result) {
      setCourses(result);
    }
  }

  useEffect(() => {
    fetchCourses();
  }, [])

  return (
    <div className='flex flex-col gap-y-8'>
      <div className='flex justify-between items-center mb-14'>
        <h1 className='text-richblack-5 font-semibold text-3xl'>My Courses</h1>
        <IconBtn
          text={"Add Course"}
          iconName={"FiPlus"}
          customClasses={"bg-yellow-50 w-fit"}
          onclick={() => navigate("/dashboard/add-course")}
        />
      </div>

      {courses && <CoursesTable courses={courses} setCourses={setCourses} />}

    </div>
  )
}

export default MyCourse