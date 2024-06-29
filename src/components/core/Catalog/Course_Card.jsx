import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import RatingStars from '../../common/RatingStars'
import GetAvgRating from '../../../utils/avgRating';
import { useSelector } from 'react-redux';

const Course_Card = ({course, height}) => {
    
    const [avgReviewCount, setAvgReviewCount] = useState(0);
    const {token} = useSelector((state) => state.auth)

    useEffect(() => {
        const count = GetAvgRating(course.ratingAndReviews);
        setAvgReviewCount(count);
    }, [course])

    return (
        <div>
            <Link to={`/courses/${course._id}`}>
                <div className='flex flex-col gap-y-3'>
                    <div>
                        <img 
                            src={course?.thumbnail} 
                            alt="Thumbnail"
                            className={`${height} w-full rounded-xl object-cover`}
                        />

                    </div>
                    <div className='flex flex-col gap-y-2'>
                        <p className="font-medium text-richblack-5">{course?.courseName}</p>
                        <p className='text-richblack-300'>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                        <div className='flex gap-x-3'>
                            <span className='text-yellow-50'>{avgReviewCount || 0}</span>
                            <RatingStars Review_Count={avgReviewCount}/>
                            <span className='text-richblack-300'>{`(${course?.ratingAndReviews?.length} Ratings)`}</span>
                        </div>
                        <p className='text-richblack-5'>Rs. {course?.price}</p>
                    </div>
                    
                </div>
            </Link>
        </div>
    )
}

export default Course_Card