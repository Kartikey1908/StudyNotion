import React from 'react'

const Stats = [
    {count : "5K", label : "Active Students"},
    {count : "10+", label : "Mentors"},
    {count : "200+", label : "Course"},
    {count : "50+", label : "Awards"},
]

const StatsComponent = () => {
  return (
    <section className='w-full bg-richblack-800 py-20'>
        <div className=''>
            <div className='w-11/12 max-w-maxContent mx-auto flex flex-wrap gap-x-16 gap-y-8 sm:gap-0 sm:px-8 justify-center sm:justify-between items-center '>
                {
                    Stats.map( (data, index) => {
                        return (
                            <div key={index} className='flex flex-col justify-center items-center gap-2'>
                                <h1 className='text-4xl font-semibold'>
                                    {data.count}
                                </h1>
                                <h2 className='text-richblack-300 text-[1rem]'>
                                    {data.label}
                                </h2>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </section>
  )
}

export default StatsComponent