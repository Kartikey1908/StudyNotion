import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';

const MyProfile = () => {

    const {user} = useSelector( (state) => state.profile);
    const navigate = useNavigate();

  return (
    <div className='text-white mx-auto w-full px-6'>
        <h1 className='text-3xl py-4 font-semibold text-richblack-5'>
            My Profile
        </h1>

        {/* section 1 */}
        <div className='mt-10 bg-richblack-800 flex flex-col gap-6 md:flex-row justify-between rounded-lg border border-richblack-700 px-8 md:px-14 py-10'>
            <div className='flex flex-row gap-8 items-center '>
                <img 
                    src={`${user.image}`} 
                    alt={`profile-${user?.firstName}`} 
                    className='aspect-square w-[78px] rounded-full object-cover'
                />
                <div>
                    <p className='text-[18px] text-richblack-5'>{user?.firstName + " " + user?.lastName}</p>
                    <p className='text-sm text-richblack-300'>{user?.email}</p>
                </div>
            </div>
            
            <div >
            <IconBtn
                    iconName={"FiEdit"}
                    text="Edit"
                    customClasses={`bg-yellow-50`}
                    onclick={() => {
                        navigate("/dashboard/settings")
                    }}
                />
            </div>
        </div>

        {/* section 2 */}
        <div className='mt-6 bg-richblack-800 flex flex-col justify-between rounded-lg border border-richblack-700 py-8 px-14 gap-6'>
            <div className='flex flex-row items-center justify-between   w-full'>
                <p className='text-[18px] font-bold'>About</p>
                <IconBtn
                    text={"Edit"}
                    customClasses={`bg-yellow-50`}
                    iconName={"FiEdit"}
                    
                    onclick={() => {
                        navigate("/dashboard/settings")
                    }}
                />
            </div>
            <p className='text-richblack-300 text-[16px]'>{user?.additionalDetails?.about ?? "Write Something about yourself"}</p>
        </div>

        {/* section 3 */}
        <div className='mt-6 bg-richblack-800 flex flex-col justify-between rounded-lg border border-richblack-700 py-8 px-14 gap-6'>
            <div className='flex flex-row items-center justify-between   w-full'>
                <p className='text-[18px] font-bold'>
                    Personal Details
                </p>
                <IconBtn
                    text={"Edit"}
                    customClasses={`bg-yellow-50`}
                    iconName={"FiEdit"}
                    
                    onclick={() => {
                        navigate("/dashboard/settings")
                    }}
                />
            </div>

            <div className='flex flex-col gap-4 md:gap-0 md:flex-row w-full'>
                
                <div className='flex flex-col gap-4 w-full md:w-[45%]'>

                    <div className='flex flex-col gap-1'>
                        <p className='text-[14px] text-richblack-300'>First Name</p>
                        <p className='text-[16px] text-richblack-5'>{user?.firstName}</p>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <p className='text-[14px] text-richblack-300'>Email</p>
                        <p className='text-[16px] overflow-hidden text-richblack-5 '>{user?.email}</p>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <p className='text-[14px] text-richblack-300'>Gender</p>
                        <p className='text-[16px] text-richblack-5'>{user?.additionalDetails?.gender ?? "Add gender"}</p>
                    </div>
                </div>

                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-1'>
                        <p className='text-[14px] text-richblack-300'>Last Name</p>
                        <p className='text-[16px] text-richblack-5'>{user?.lastName}</p>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <p className='text-[14px] text-richblack-300'>Phone Number</p>
                        <p className='text-[16px] text-richblack-5'>{user?.additionalDetails?.contactNumber ?? "Add contact number"}</p>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <p className='text-[14px] text-richblack-300'>Date of Birth</p>
                        <p className='text-[16px] text-richblack-5'>{user?.additionalDetails?.dateOfBirth ?? "Add your date of birth"}</p>
                    </div>
                </div>
            </div>
                
        </div>

    </div>
  )
}

export default MyProfile