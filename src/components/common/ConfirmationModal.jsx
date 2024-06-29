import React from 'react'
import IconBtn from './IconBtn'

const ConfirmationModal = ({modalData}) => {
  return (
    <div className='absolute z-[100] top-[0] left-[0] h-screen w-screen flex items-center justify-center backdrop-blur-sm bg-richblue-50/25'>
        <div className='bg-richblack-800 border-2 rounded-lg border-richblack-600  px-6 py-4'>
            <p className='text-richblack-5 text-[1.5rem] font-bold'>
                {modalData.text1}
            </p>
            <p className='text-richblack-300 text-[14px] mt-2 mb-5 font-medium'>
                {modalData.text2}
            </p> 
            <div className='flex gap-2'>
                <IconBtn
                    onclick={modalData?.btn1Handler}
                    text={modalData?.btn1Text}
                    customClasses={`bg-yellow-50`}
                />
                <button onClick={modalData?.btn2Handler}
                    className='bg-richblack-400 text-richblack-900 font-semibold text-[14px] px-5 py-3 rounded-md'
                >
                    {modalData?.btn2Text}
                </button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmationModal