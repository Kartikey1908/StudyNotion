import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCatalogPageData } from '../services/operations/pageAndComponentData';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import Course_Card from '../components/core/Catalog/Course_Card';

const Catalog = () => {

    const {catalogName} = useParams();
    const [categoryId, setCategoryId] = useState("");
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [currentTab, setCurrentTab] = useState("mostPopular");

    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await apiConnector("GET", categories.CATEGORIES_API);
                const categoryId = res?.data?.data?.filter((ct) => ct.name.split(" ").join('').toLowerCase() === catalogName)[0]._id;
                console.log("Category Id fetched is ", categoryId)
                setCategoryId(categoryId);
            } catch (error) {
                console.log("Could not fetch categories")
            }
        }
        getCategories();
    }, [catalogName]);

    useEffect(() => {
        const getCategoryDetails = async() => {
            const result = await getCatalogPageData(categoryId);
            console.log("Printing catalog page details", result)
            setCatalogPageData(result);
        }
        if (categoryId) {
            getCategoryDetails();
        }
    }, [categoryId])


    return (
        <div className='text-richblack-5'>

            <div className='bg-richblack-800 py-10'>
               <div className='w-11/12 max-w-[1000px] mx-auto space-y-5'>
                    <p className='text-richblack-300 text-sm [word-spacing:10px] font-medium'>{`Home  / Catalog  /  `}  <span className='text-yellow-100'>{` ${catalogPageData?.selectedCategory?.name}`}</span></p>
                    <p className='text-3xl font-medium text-richblack-5'>{catalogPageData?.selectedCategory?.name}</p>
                    <p className='text-richblack-200 text-sm'>{catalogPageData?.selectedCategory?.description}</p>
               </div>
            </div>

            <div className=' w-11/12 max-w-[1000px] mx-auto mt-14 space-y-12 pb-8'>
                {/* section 1 */}
                <div>
                    <div className='text-3xl font-semibold text-richblack-5'>Courses to get you started</div>
                    <div className='flex mt-2 mb-6 gap-x-6 border-b border-richblack-600'>
                        <p className={`py-2 px-2 ${currentTab === "mostPopular" ? "text-yellow-50 border-b border-yellow-50": "text-richblack-200"}`}>Most Popular</p>
                        <p className={`py-2 px-2 ${currentTab === "new" ? "text-yellow-50": "text-richblack-200"}`}>New</p>
                    </div>
                    <div>
                        <CourseSlider Courses={catalogPageData?.selectedCategory?.courses}/>
                    </div>
                </div>

                {/* section 2 */}
                <div>
                    <div className='text-3xl mb-4 font-semibold text-richblack-5'>Top Courses in {catalogPageData?.differentCategory?.name}</div>
                    <div>
                        <CourseSlider Courses={catalogPageData?.differentCategory?.courses}/>
                    </div>
                </div>

                {/* section 3 */}
                <div>
                    <div className='text-3xl font-semibold text-richblack-5'>Frequently bought together</div>
                    <div className='py-8'>

                        <div className='grid grid-cols-1 lg:grid-cols-2 place-items-center gap-8'>
                            {
                                catalogPageData?.mostSelling?.slice(0, 4)
                                ?.map((course, index) => (
                                    <Course_Card course={course} key={index} height={"h-[360px]"}/>
                                ))
                            }
                        </div>

                    </div>
                </div>
            </div>

            <Footer/>

        </div>
  )
}

export default Catalog