import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import RenderSteps from '../AddCourse/RenderSteps'
import { fetchCourseDetails } from '../../../../services/operations/courseDetailsAPI'
import { setCourse, setEditCourse } from '../../../../slices/courseSlice';

const EditCourse = () => {

    const dispatch = useDispatch();
    const {courseId} = useParams();
    const {course} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);


    const populateCourseDetails = async() => {
        setLoading(true);
        console.log(courseId);
        const result = await fetchCourseDetails(courseId);
        if (result?.courseDetails) {
            dispatch(setEditCourse(true));
            dispatch(setCourse(result?.courseDetails))
        }
        setLoading(false);
    }

    useEffect(() => {
        populateCourseDetails();
    }, []);

    if (loading) {
        return (
            <div>
                Loding...
            </div>
        )
    }


    return (
        <div>
            <h1 className='text-richblack-5 font-semibold text-2xl'>Edit Course</h1>
            <div>
                {
                    course ? (<RenderSteps/>) : (<p>Course Not Found</p>)
                }
            </div>
        </div>
    )
}

export default EditCourse