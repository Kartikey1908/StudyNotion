import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { buyCourse } from '../services/operations/studentFeaturesAPI';
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI';
import GetAvgRating from '../utils/avgRating';
import RatingStars from '../components/common/RatingStars';
import { formatDate } from '../services/formatDate';
import { TfiInfoAlt } from "react-icons/tfi";
import { GoDotFill } from "react-icons/go";
import Error from './Error'
import ConfirmationModal from '../components/common/ConfirmationModal'
import { FiGlobe } from "react-icons/fi";
import CourseDetailsCard from '../components/core/Course/CourseDetailsCard';
import ReviewSlider from '../components/common/ReviewSlider';
import Footer from '../components/common/Footer';
import ReactMarkdown from 'react-markdown';
import CourseAccordionBar from '../components/core/Course/CourseAccordionBar';

const CourseDetails = () => {

    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {courseId} = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [avgReviewCount, setAvgReviewCount] = useState(0);
    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const [isActive, setIsActive] = useState(Array(0));

    const handleActive = (id) => {
        setIsActive(
            !isActive.includes(id)
            ? isActive.concat(id)
            : isActive.filter((e) => e !== id)
        )
    }


    const handleBuyCourse = () => {
        // console.log(courseId);
        if (token) {
            buyCourse(token, [courseId], user, navigate, dispatch);
            return;
        }

        setConfirmationModal({
            text1:"You are not Logged in",
            text2:"Please Login to purchase the course",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
        })
    }

    const getCourseDetails = async() => {
        setLoading(true);
        const result = await fetchCourseDetails(courseId)
        console.log("Returned resposnse is ", result);
        if (result) {
            setCourse(result);
        }
        setLoading(false);
    }

    useEffect(() => {
        getCourseDetails();
    }, [courseId]);

    useEffect(() => {
        const count = GetAvgRating(course?.courseDetails?.ratingAndReviews);
        setAvgReviewCount(count);
    }, [course])

    useEffect(() => {
        let lectures = 0;

        course?.courseDetails?.courseContent?.forEach((section) => {
            lectures += section?.subSection?.length || 0;
        })

        setTotalNoOfLectures(lectures);

    }, [course])


    if (loading || !course) {
        return (
            <div className='h-screen w-screen flex flex-col items-center justify-center gap-y-4'>
                <div className='spinner'></div>
                <p className='text-richblack-5 text-2xl'>Loading...</p>
            </div>
        )
    }

    if (!course) {
        return (
            <div>
                <Error/>
            </div>
        )
    }

    const {
        _id:course_id,
        category,
        courseName,
        courseDescription,
        thumbnail,
        price,
        whatYouWillLearn,
        courseContent,
        ratingAndReviews,
        instructor,
        studentsEnrolled,
        createdAt,
    } = course?.courseDetails;

    return (
        <div>

            <div className='relative bg-richblack-800 w-full'>
                <div className='mx-auto box-content px-4 lg:w-[1260px] lg:relative'>
                    <div className='mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]:'>
                        <div className='relative block max-h-[30rem] lg:hidden'>
                            <div className='absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]'></div>
                            <img 
                                src={thumbnail} 
                                alt="course thumbnail" 
                                className='aspect-auto w-full'
                            />
                        </div>
                        <div
                            className={`z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5`}
                        >
                            <p className='text-richblack-300 text-sm [word-spacing:10px] font-medium'>{`Home  / Learning  /  `}  <span className='text-yellow-100'>{` ${category.name}`}</span></p>
                            <p className='text-4xl font-bold text-richblack-5 sm:text-[42px]'>
                                {courseName}
                            </p>

                            <p className='text-richblack-200'>
                                {courseDescription}
                            </p>

                            <div className='flex flex-wrap items-center gap-x-2'>
                                <span className='text-yellow-25'>{avgReviewCount || 0}</span>
                                <RatingStars Review_Count={avgReviewCount} Star_Size={24}/>
                                <span className='text-richblack-300'>{`(${ratingAndReviews?.length} ratings)`}</span>
                                <span className='text-richblack-300'>{`${studentsEnrolled?.length} ${studentsEnrolled?.length === 1 ? 'student' : 'students'} enrolled`}</span>
                            </div>

                            <p className='text-richblack-100'>
                                {`Created by ${instructor.firstName} ${instructor.lastName}`}
                            </p>
                            <div className='flex flex-wrap text-lg gap-x-4'>
                                {
                                    createdAt && (
                                        <p className='flex gap-x-2 items-center text-richblack-100'>
                                            <TfiInfoAlt />
                                            {'Created at '}
                                            {formatDate(createdAt).split('|')[0]}
                                        </p>
                                    )
                                }
                                <p className='flex gap-x-2 items-center text-richblack-100'>
                                    <FiGlobe/>
                                    <p>English</p>
                                </p>
                            </div>
                        </div>
                        <div className='flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden'>
                            <p className='space-x-3 pb-4 text-3xl font-semibold text-richblack-5'>
                                Rs. {price}
                            </p>
                            <button className='yellowButton' onClick={handleBuyCourse}>
                                Buy Now
                            </button>
                            <button className='blackButton'>
                                Add to Cart
                            </button>
                        </div>
                    </div>

                    <div className='right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute lg:block'>
                        <CourseDetailsCard
                            course={course?.courseDetails}
                            setConfirmationModal = {setConfirmationModal}
                            handleBuyCourse={handleBuyCourse}
                        />
                    </div>
                </div>
            </div>

            <div className='mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]'>
                <div className='mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px] '>
                    
                    {/* what you will learn section */}
                    <div className='my-8 border border-richblack-600 p-8'>
                        <div className='text-3xl font-semibold'>
                            What you'll learn
                        </div>
                        <div className='mt-5'>
                            <ReactMarkdown>{whatYouWillLearn}</ReactMarkdown>
                        </div>
                    </div>
                    
                    {/* Course content section */}
                    <div className='max-w-[830px]'>
                        <div className='flex flex-col gap-3'>
                            <div className='text-[28px] text-richblack-5 font-semibold'>
                                Course Content
                            </div>
                            <div className='flex flex-wrap justify-between gap-2'>
                                <div className='flex sm:items-center flex-col sm:flex-row'>
                                    <p className='text-richblack-200 text-sm'>{courseContent?.length} {`section(s)`}</p>
                                    <GoDotFill className='text-richblack-200 text-sm'/>
                                    <p className='text-richblack-200 text-sm'>{totalNoOfLectures} {`lecture(s)`}</p>
                                    <GoDotFill className='text-richblack-200 text-sm'/>
                                    <p className='text-richblack-200 text-sm'>{` ${course?.totalDuration} total length`}</p>
                                </div>
                                <div>
                                    <button 
                                        onClick={() => setIsActive([])}
                                        className='text-yellow-100'
                                    >
                                        Collapse all section
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className='py-4'>
                            {courseContent?.map((section, index) => (
                                <CourseAccordionBar
                                    section={section}
                                    key={index}
                                    isActive={isActive}
                                    handleActive={handleActive}
                                />
                            ))}
                        </div>

                    </div>

                    {/* author section */}
                    <div className='mb-12 py-4'>
                        <h2 className='text-[28px] text-richblack-5 font-semibold'>Author</h2>
                        <div className='flex gap-3 items-center py-4'>
                            <img 
                                src={instructor.image || `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.secondName}`} 
                                alt="Author" 
                                className='w-14 h-14 rounded-full object-cover'
                            />
                            <p className='text-richblack-5'>{`${instructor.firstName} ${instructor.lastName}`}</p>
                        </div>

                        <div>
                            <p className='text-richblack-50'>{instructor?.additionalDetails?.about ? instructor?.additionalDetails?.about : ""}</p>
                        </div>
                    </div>

                    
                </div>

            </div>

            {/* Review */}
            <div className='mx-auto w-full lg:w-[1260px]'>
                <div className='mt-4 space-x-4 py-28 w-full'>
                    <p className='text-2xl text-richblack-5 font-semibold text-center'>Review from other learners</p>

                    <div>
                        {/* <ReviewSlider ratingAndReviews={ratingAndReviews}/> */}
                    </div>

                </div>
            </div>
            
            <Footer/>

            {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}

        </div>
    )
}

export default CourseDetails