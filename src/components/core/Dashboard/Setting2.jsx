import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';
import { updateDisplayPicture } from '../../../services/operations/settingsAPI';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';

const Settings = () => {

  const {user} = useSelector( (state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fileChosen, SetFileChosen] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isSubmitSuccessful}
  } = useForm();

  const handleProfilePictureChange = (event) => {
    event.preventDefault();
    if (fileChosen) {
      dispatch(updateDisplayPicture(fileChosen, user));
    }
    else {
      toast.error("Please Select an Image File");
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
        reset({
            gender: "",
            firstName: "",
            lastName: "",
            dateOfBirth: "",
            contactNumber: "",
            about : "",
        })
    }
  }, [reset,isSubmitSuccessful]); 

return (
  <div className='text-white mx-auto w-full px-6'>

    <h1 className='text-3xl py-4 font-semibold text-richblack-5'>
        Edit Profile
    </h1>

    {/* section 1 */}
    <div className='mt-10 bg-richblack-800 flex flex-col gap-6 md:flex-row justify-between rounded-lg border border-richblack-700 px-8 md:px-14 py-10'>
          <div className='flex flex-row gap-8 items-center '>
            <img 
                src={`${user.image}`} 
                alt={`profile-${user?.firstName}`} 
                className='aspect-square w-[78px] rounded-full object-cover'
            />
            <div className='flex flex-col gap-1'>

              <p className='text-[18px] text-richblack-5'>Change Profile Picture</p>

              <div className='flex flex-row gap-2'>
                <label htmlFor="uploadBtn"
                  className={`text-center text-[15px] px-6 py-3 rounded-md
                  text-richblack-5 hover:scale-95 cursor-pointer
                  trasition-all duration-200 bg-richblack-700 ${fileChosen ? "font-medium" : "font-semibold"}`}
                >
                  <span>{fileChosen ? fileChosen.name : "Select"}</span>
                  <input 
                  type="file" 
                  content='Select'
                  id='uploadBtn'
                  className='hidden'
                  onChange={(event) => {SetFileChosen(event.target.files[0])}}
                />
                </label>
                
                <IconBtn
                      iconName={"FiUpload"}
                      text="Upload"
                      customClasses={`bg-yellow-50`}
                      onclick={handleProfilePictureChange}
                  />
              </div>

            </div>
          </div>
          
          
      </div>

    {/* section 2 */}
    <div className='mt-10 bg-richblack-800 flex flex-col gap-6 justify-between rounded-lg border border-richblack-700 px-8 md:px-14 py-10'>

      <h2 className='text-lg py-4 font-semibold text-richblack-5'>
        Profile Information
      </h2>

      <form action="" className='flex flex-col gap-6'>

        <div className='flex flex-row gap-4 w-full justify-between'>

          <div className='w-[50%]'>
            <label htmlFor='firstName' className='mb-1  text-[.875rem] leading-[1.375rem] text-richblack-5'>First Name</label>
            <input 
              type="text"
              name='firstName'
              id='firstName'
              placeholder='Enter first name'   
              style={{
                  boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, .18)"
              }}
              className='w-full rounded-[.5rem] bg-richblack-700 text-richblack-5 p-[12px]'
              {...register("firstName")}
            />
          </div>

          <div className='w-[50%]'>
            <label htmlFor='firstName' className='mb-1 text-[.875rem] leading-[1.375rem] text-richblack-5'>Last Name</label>
            <input 
              type="text"
              name='lastName'
              id='lastName'
              placeholder='Enter last name'   
              style={{
                  boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, .18)"
              }}
              className='w-full rounded-[.5rem] bg-richblack-700 text-richblack-5 p-[12px]'
              {...register("lastName")}
            />
          </div>

        </div>
        {/* 2nd */}
        <div className='flex flex-row gap-4 w-full justify-between'>

          <div className='w-[50%]'>
            <label htmlFor='dateOfBirth' className='mb-1  text-[.875rem] leading-[1.375rem] text-richblack-5'>Date of Birth</label>
            <input 
              type="date"
              name='dateOfBirth'
              id='dateOfBirth'
              placeholder='Enter first name'   
              style={{
                  boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, .18)"
              }}
              className='w-full rounded-[.5rem] bg-richblack-700 text-richblack-5 p-[12px]'
              {...register("dateOfBirth")}
            />
          </div>

          <div className='w-[50%]'>
            <label htmlFor='gender' className='mb-1 text-[.875rem] leading-[1.375rem] text-richblack-5'>Gender</label>
            <select
              name='gender'
              id='gender'
              style={{
                boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, .18)"
              }}
              className='w-full rounded-[.5rem] bg-richblack-700 text-richblack-5 p-[12px]'
              {...register("gender")}
            >
              <option value="Male" className=' p-[12px]'>Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

        </div>
        {/* 3rd */}
          
        <div className='flex flex-row gap-4 w-full justify-between'>

          <div className='w-[50%]'>
            <label htmlFor='contactNumber' className='mb-1  text-[.875rem] leading-[1.375rem] text-richblack-5'>Contact Number</label>
            <input 
              type="number"
              name='contactNumber'
              id='contactNumber'
              placeholder='Enter Contact Number'   
              style={{
                  boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, .18)"
              }}
              className='w-full rounded-[.5rem] bg-richblack-700 text-richblack-5 p-[12px]'
              {...register("contactNumber")}

            />
          </div>

          <div className='w-[50%]'>
            <label htmlFor='about' className='mb-1 text-[.875rem] leading-[1.375rem] text-richblack-5'>About</label>
            <input 
              type="text"
              name='about'
              id='about'
              placeholder='Enter Bio Details'   
              style={{
                  boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, .18)"
              }}
              className='w-full rounded-[.5rem] bg-richblack-700 text-richblack-5 p-[12px]'
              {...register("about")}
            />
          </div>

        </div>

      </form>

    </div>


  </div>
)
}

export default Settings