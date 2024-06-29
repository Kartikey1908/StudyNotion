import React, { useEffect, useState } from 'react'

import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { FreeMode, Pagination, Autoplay } from 'swiper/modules'
import { Swiper,SwiperSlide } from 'swiper/react'
import ReactStars from 'react-stars'
import { ratingEndpoints } from '../../services/apis'
import { apiConnector } from '../../services/apiconnector'
import { GiNinjaStar } from 'react-icons/gi'

const ReviewSlider = () => {

    const [reviews, setReviews] = useState([]);
    const truncateWords = 15;

    useEffect(() => {
        const fetchAllReviews = async() => {
            const response = await apiConnector("GET", ratingEndpoints.REVIEW_DETAILS_API);
            console.log("Logging review data",response);

            if (response?.data?.success) {
                setReviews(response?.data?.data);
            }
            
             
        }
        fetchAllReviews();
    }, []);

    return (
        <>
            {
                reviews?.length ? (
                   <div className='text-richblack-5'>
                        <div className='h-[184px] mt-[30px] mb-[50px] max-w-sm sm:max-w-maxContentTab lg:max-w-maxContent'>
                            <Swiper
                                slidesPerView={1}
                                spaceBetween={25}
                                loop={true}
                                freeMode={true}
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                }}
                                modules={[FreeMode, Pagination, Autoplay]}
                                breakpoints={{
                                    680: {slidesPerView: 2},
                                    1124: {slidesPerView: 4}
                                }}
                                className='w-full'
                                
                            >
                                {
                                    reviews?.map( (review, index) => (
                                        <SwiperSlide key={index}>
                                           <div className='flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25'>
                                                <div className='flex items-center gap-4'>
                                                    <img 
                                                        src={
                                                            review?.user?.image 
                                                            ? review?.user?.image 
                                                            : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                                                        } 
                                                        alt="Profile"
                                                        className='h-9 w-9 object-cover rounded-full' 
                                                    />
                                                    <div className='flex flex-col'>
                                                        <h1 className='font-semibold text-richblack-5'>
                                                            {review?.user?.firstName} {review?.user?.lastName}
                                                        </h1>
                                                        <h2 className='text-[12px] font-medium text-richblack-500'>
                                                            {review?.course?.courseName}
                                                        </h2>
                                                    </div>
                                                </div>
                                                <p className='font-medium text-start text-richblack-25'>
                                                    {review?.review.split(" ").length > truncateWords
                                                        ? `${review?.review
                                                            .split(" ")
                                                            .slice(0, truncateWords)
                                                            .join(" ")}...`
                                                        : `${review?.review}`}
                                                </p>
                                                <div className='flex items-center gap-2'>
                                                    <h3 className='font-semibold text-yellow-100'>
                                                        {review?.rating.toFixed(1)}
                                                    </h3>
                                                    <ReactStars
                                                        count={5}
                                                        value={review?.rating}
                                                        size={20}
                                                        color2='#ffd700'
                                                        edit={false}
                                                        emptyIcon={<GiNinjaStar/>}
                                                        fullIcon={<GiNinjaStar/>}
                                                    />
                                                </div>
                                           </div>
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>
                        </div>
                   </div>
                ) : (
                    <p>No Reviews found</p>
                )
            }
        </>
    )
}

export default ReviewSlider