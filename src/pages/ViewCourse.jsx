import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
import VideoDetailsSideBar from '../components/core/ViewCourse/VideoDetailsSideBar';
import CoureReviewModal from '../components/core/ViewCourse/CoureReviewModal';



const ViewCourse = () => {

    const [reviewModal, setReviewModal]  = useState(false);
    const {courseId} = useParams();
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const setCourseSpecificDetails = async() => {
            const courseData = await getFullDetailsOfCourse(courseId, token);
            // console.log("Course data recieved", courseData);
            dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent))
            dispatch(setEntireCourseData(courseData?.courseDetails));
            dispatch(setCompletedLectures(courseData?.completedLectures));
            let lectures = 0;
            courseData?.courseDetails?.courseContent.forEach((section) => {
                lectures += section?.subSection?.length;
            })
            dispatch(setTotalNoOfLectures(lectures));

        }
        setCourseSpecificDetails();
    }, []);

    return (
        <>
            <div className='flex relative min-h-[calc(100vh-3.5rem)]'>
                <VideoDetailsSideBar setReviewModal={setReviewModal}/>
                <div className='flex-1 h-[calc(100vh-3.5rem)] overflow-auto'>
                    <div className='mx-6'>
                        <Outlet/>
                    </div>
                </div>
            </div>

            {reviewModal && <CoureReviewModal setReviewModal={setReviewModal}/>}
        </>
    )
}

export default ViewCourse