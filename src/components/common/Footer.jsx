import React from 'react'
import Logo from "../../assets/Logo/Logo-Full-Light.png"
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { FooterLink2 } from '../../data/footer-links'

const Footer = () => {

    const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];

    const Resources = [
        "Articles",
        "Blog",
        "Char Sheet",
        "Code challenges",
        "Docs",
        "Projects",
        "Videos",
        "Workspaces"
    ]

    const Plans = ["Pair membership", "For Students", "Business solutions"];
    const Community = ["Forums", "Chapters", "Events"];

  return (
    <div className='bg-richblack-800'>
        <div className='flex lg:flex-row w-11/12 max-w-maxContent gap-6 text-richblack-400
        justify-between items-center mx-auto py-14'>

            <div className='w-[100%] flex flex-col lg:flex-row border-b border-richblack-700 pl-3'>

                {/* section 1 */}
                <div className='lg:w-[50%] justify-between  flex flex-wrap lg:flex-row lg:border-r lg:border-richblack-700'>
                    <div className='w-[30%] flex flex-col gap-3 '>
                        <img 
                        src={Logo} 
                        alt="" 
                        className='object-contain'
                        />
                        <h1 className='text-richblack-50 font-semibold text-[16px]'>
                            Company
                        </h1>
                        <div className='flex flex-col gap-2'>
                            {["About", "Careers", "Affiliates"].map( (element, index) => {
                                return (
                                    <div key={index} className='text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200'>
                                        <Link to={element.toLowerCase()}>{element}</Link>
                                    </div>
                                )
                            })}
                        </div>
                        <div className='flex flex-row gap-3 text-lg'>
                            <FaFacebook
                            className='cursor-pointer  hover:text-richblack-50 transition-all duration-200'/>
                            <FaGoogle
                            className='cursor-pointer  hover:text-richblack-50 transition-all duration-200'/>
                            <FaTwitter
                            className='cursor-pointer  hover:text-richblack-50 transition-all duration-200'/>
                            <FaYoutube
                            className='cursor-pointer  hover:text-richblack-50 transition-all duration-200'/>

                        </div>
                    </div>
                    
                    <div className='w[48%] lg:w-[30%] mb-7 lg:pl-0'>
                        <h2 className='text-richblack-50 font-semibold text-[16px]'>
                            Resources
                        </h2>

                        <div className='flex flex-col gap-2 mt-2'>
                            {Resources.map( (element, index) => {
                                return (
                                    <div 
                                        key={index}
                                        className='text-[14px] cursor-pointer  hover:text-richblack-50 transition-all duration-200'>
                                        <Link to={element.split(' ').join('-').toLowerCase()}>
                                            {element}
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                        
                        <h2 className='text-richblack-50 font-semibold text-[16px] mt-7'>
                            Support
                        </h2>

                        <div className='text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200 mt-2'>
                            <Link to={"/help-center"}>
                                Help Center
                            </Link>
                                
                        </div>
                    </div>

                    <div className='w[48%] lg:w-[30%] mb-7 lg:pl-0'>
                        <h2 className='text-richblack-50 font-semibold text-[16px]'>
                            Plans
                        </h2>

                        <div className='flex flex-col gap-2 mt-2'>
                            {Plans.map( (element, index) => {
                                return (
                                    <div 
                                        key={index}
                                        className='text-[14px] cursor-pointer  hover:text-richblack-50 transition-all duration-200'>
                                        <Link to={element.split(' ').join('-').toLowerCase()}>
                                            {element}
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                        
                        <h2 className='text-richblack-50 font-semibold text-[16px] mt-7'>
                            Community
                        </h2>

                        <div className='flex flex-col gap-2 mt-2'>
                            {Community.map( (element, index) => {
                                return (
                                    <div 
                                        key={index}
                                        className='text-[14px] cursor-pointer  hover:text-richblack-50 transition-all duration-200'>
                                        <Link to={element.split(' ').join('-').toLowerCase()}>
                                            {element}
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>

                {/* section 2 */}
                <div className='lg:w-[50%] flex flex-wrap flex-row justify-between pl-3 lg:pl-5 gap-3'>
                    {FooterLink2.map( (element, index) => {
                        return (
                            <div key={index} 
                                className='w-[48%] lg:w-[30%] mb-7 lg:pl-0'>

                                <h2 className='text-richblack-50 text-[16px] font-semibold'>
                                    {element.title}
                                </h2>
                                <div className='flex flex-col gap-2 mt-2'>
                                    {element.links.map((link, i) => {
                                        return (
                                            <div key={i}
                                                className='text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200'>
                                                
                                                <Link to={link.link}>
                                                    {link.title}
                                                </Link>
                                            </div>
                                        );
                                    })}
                                </div>


                            </div>
                        )
                    })}
                </div>


            </div>


        </div>

        <div className='flex flex-row w-11/12 max-w-maxContent gap-6 text-richblack-400
        justify-between items-center mx-auto pb-14'>
            <div className='flex flex-col lg:flex-row justify-between lg:items-start items-center gap-3 w-full'>
                <div className='flex flex-row'>
                    {BottomFooter.map( (element, index) => {
                        return (
                            <div key={index}
                                className={`${
                                    index === BottomFooter.length - 1 ?
                                    "":
                                    "border-r border-richblack-700"
                                } cursor-pointer  hover:text-richblack-50 transition-all duration-200 px-3`}>
                                {element}
                            </div>
                        );
                    })}
                </div>

                <div className='text-center'>
                    Made with ❤️ Codehelp © 2023 StudyNotion
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer