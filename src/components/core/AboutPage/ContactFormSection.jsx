import React from 'react'
import ContactUsForm from '../../ContactPage/ContactUsForm'

const ContactFormSection = ({heading, text}) => {
  return (
    <div className='mx-auto px-12 py-4'>
        <h1 className='text-3xl py-4 px-4 text-center text-richblack-5'>
            {heading}
        </h1>
        <p className='text-center text-richblack-300'>{text}</p>
        <div className='w-full'>
            <ContactUsForm heading={heading} text={text}/>
        </div>
    </div>
  )
}

export default ContactFormSection