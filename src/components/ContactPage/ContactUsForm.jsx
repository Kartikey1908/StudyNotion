import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { apiConnector } from '../../services/apiconnector';
import { contactusEndpoints, courseEndpoints } from '../../services/apis';
import CountryCode from '../../data/countrycode.json'

const ContactUsForm = () => {

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}
    } = useForm();


    const submitContactForm = async(data) => {
        console.log("Logging Data", data);
        try {
            setLoading(true);
            // const response = await apiConnector("POST", contactusEndpoints.CONTACT_US_API, data);
            const response = {status: "OK"};
            setLoading(false);
        } catch (error) {
            console.log("Error: ", error.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: "",
                firstName: "",
                lastName: "",
                message: "",
                phoneNo: "",
            })
        }
    }, [reset,isSubmitSuccessful]); // call when definition of reset function change which may change due to addition of new field in form on selection some options


    const [codeSelected, setCodeSelected] = useState("+91");

  return (
    <form onSubmit={handleSubmit(submitContactForm)}>

        <div className='flex flex-col gap-5 mx-auto mt-10 px-0 sm:px-2'>

            <div className='flex gap-5 justify-between'>
                {/* first name */}
                <div className='flex flex-col w-full'>
                        <label htmlFor='firstName' className='mb-1 text-[.875rem] leading-[1.375rem] text-richblack-5'>First Name</label>
                        <input 
                            type="text"
                            name='firstName'
                            id='firstName'
                            placeholder='Enter first name'   
                            style={{
                                boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, .18)"
                            }}
                            className='w-full rounded-[.5rem] bg-richblack-800 text-richblack-5 p-[12px]'
                            {...register("firstName", {required:true})} 
                        />
                        {
                            errors.firstName && (
                                <span className='text-pink-300 text-sm'>Please enter name !</span>
                            )
                        }
                </div>
                {/* last name */}
                <div className='flex flex-col w-full'>
                        <label htmlFor='lastName' className='mb-1 text-[.875rem] leading-[1.375rem] text-richblack-5'>Last Name</label>
                        <input 
                            type="text"
                            name='lastName'
                            id='lastName'
                            placeholder='Enter last name'   
                            style={{
                                boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, .18)"
                            }}
                            className='w-full rounded-[.5rem] bg-richblack-800 text-richblack-5 p-[12px]'
                            {...register("lastName")} 
                        />
                </div>
            </div>

            {/* email */}
            <div>
            <div className='flex flex-col'>
                <label htmlFor='email' className='mb-1 text-[.875rem] leading-[1.375rem] text-richblack-5'>Email</label>
                <input 
                    type="email"
                    name='email'
                    id='email'
                    placeholder='Enter email Address'
                    style={{
                        boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, .18)"
                    }}
                    className='w-full rounded-[.5rem] bg-richblack-800 text-richblack-5 p-[12px]'
                    {...register("email", {required:true})} 
                />
                {
                    errors.email && (
                        <span className='text-pink-300 text-sm'>Please enter your email address</span>
                    )
                }
            </div>
            </div>

            {/* phone number */}
            <div className='flex flex-col gap-2'>

                <label htmlFor="phoneNumber" className='mb-1 text-[.875rem] leading-[1.375rem] text-richblack-5'>Phone Number</label>

                <div className='flex flex-row gap-3 sm:gap-5'>

                    {/* dropdown */}
                    <select
                        
                        name='dropdown'
                        id='dropdown'
                        {...register("countrycode", {required:true})}
                        style={{
                            boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, .18)"
                        }}
                        className='rounded-[.5rem] bg-richblack-800 text-richblack-300 p-[12px] w-[17%] min-w-[60px] flex flex-col gap-2'
                        onChange={(event) => {
                            console.log(event.target.value);
                            setCodeSelected(event.target.value)
                        }}
                        

                    >
                        {
                            CountryCode.map( (element, index) => {
                                return (
                                    <option className=''
                                        key={index} 
                                        value={element.code} 
                                        selected={element.code === codeSelected}
                                    >
                                        {
                                            codeSelected === element.code ? codeSelected : `${element.code}-${element.country}`
                                        }
                                    </option>
                                )
                            })
                        }
                    </select>


                    <input 
                        type="number" 
                        name='phonenumber'
                        id='phonenumber'
                        placeholder='12345 67890'
                        style={{
                            boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, .18)"
                        }}
                        className='w-full rounded-[.5rem] bg-richblack-800 text-richblack-5 p-[12px]'
                        {...register("phoneNo", 
                        {
                            required: {value: true, message: "Please enter phone number"},
                            maxLength: {value: 10, message:"Invalid Phone Number"},
                            minLength: {value: 8, message: "Invalid Phone Number"}
                        })}

                    />
               

                </div>
                {
                    errors.phoneNo && (
                        <span className='text-pink-300 text-sm'>
                            {errors.phoneNo.message} !   
                        </span>
                    )
                }

            </div>

            {/* message box */}
            <div className='flex flex-col'>
                <label htmlFor="message" className='pb-1 text-[.875rem] leading-[1.375rem] text-richblack-5'>Message</label>
                <textarea 
                    name="message" 
                    id="message" 
                    cols="30" 
                    rows="5"
                    placeholder='Enter your message here'
                    style={{
                        boxShadow:"inset 0px -1px 0px rgba(255, 255, 255, .18)"
                    }}
                    className='w-full rounded-[.5rem] bg-richblack-800 text-richblack-5 p-[12px]'

                    {...register("message", {required: true})}
                />

                {
                    errors.message && (
                        <span className='text-pink-300 text-sm'>Please enter your message !</span>
                    )
                }
            </div>

            <button type='submit'
                className='rounded-md bg-yellow-50 text-center px-6 text-[16px] font-bold text-richblack-800 py-2 w-full'
            >
                Send message
            </button>

        </div>

    </form>
  )
}

export default ContactUsForm