import React from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { FreeMode, Pagination, Autoplay, Navigation } from 'swiper/modules'
import Course_Card from './Course_Card'



const CourseSlider = ({Courses}) => {
    return (
        <>
            {
                Courses?.length ? (
                    <Swiper
                        loop={true}
                        slidesPerView={1}
                        spaceBetween={25}
                        modules={[Pagination, Autoplay, Navigation]}
                        pagination={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                          }}
                        className='mySwiper'
                        breakpoints={{
                            1024: {slidesPerView: 3}
                        }}
                    >
                        {
                            Courses?.map((course, index) => (
                                <SwiperSlide key={index}>
                                    <Course_Card course={course} height={"h-[250px]"}/>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                ): (
                    <p>No courses found</p>
                )
            }
        </>
    )
}

export default CourseSlider