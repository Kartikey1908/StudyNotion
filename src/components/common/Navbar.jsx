import React, { useEffect, useRef, useState } from 'react'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import { Link, matchPath, useLocation } from 'react-router-dom'
import {NavbarLinks} from '../../data/navbar-links'
import { useSelector } from 'react-redux'
import { AiOutlineMenu, AiOutlineShoppingCart } from 'react-icons/ai'
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { IoIosArrowDown } from "react-icons/io";
import useOnClickOutside from '../../Hooks/useOnClickOutside'


const Navbar = () => {


    const {token} = useSelector( (state) => state.auth );
    const {user} = useSelector( (state) => state.profile );
    const {totalItems} = useSelector( (state) => state.cart);
    
    const [subLinks,setSubLinks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const openRef = useRef(null);

    useOnClickOutside(openRef, () => setOpen(false))

    const fetchSubLinks = async() => {
        try {
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            console.log("Get categories api response: ",result);
            setSubLinks(result.data.data);
        } catch (error) {
            console.log("Could not fetch the category list");
        }

    }

    useEffect( () => {
        setLoading(true);
        fetchSubLinks();
        setLoading(false);
    },[])

    const location = useLocation();

    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname)
    }

    return (
        <div 
            className={`flex h-14 items-center justify-center border-b-[1px] border-richblack-700 ${
                location.pathname === "/" ? "bg-richblack-800" : ""
            } transition-all duration-200`}>
            <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
                <Link to="/">
                    <img 
                        src={logo} 
                        alt="" 
                        width={160}
                        height={32}
                        loading='lazy'
                        />
                </Link>

                <nav className='hidden md:block'>
                    <ul className='flex gap-x-6 text-richblack-25'>
                        {
                            NavbarLinks.map( (link, index) => {
                               return ( 
                                <li key={index}>
                                    {
                                        link.title === 'Catalog' ? 
                                        (<div className={`flex items-center cursor-pointer gap-1 group relative ${
                                            matchRoute("/catalog/:catalogName")
                                            ? "text-yellow-25"
                                            : "text-richblack-25"
                                        }`}>
                                            <p>{link.title}</p>
                                            <IoIosArrowDown />

                                            <div className='z-10 absolute invisible left-[50%] top-[50%]
                                            translate-x-[-50%] translate-y-[20%]
                                            flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                                            opacity-0 transition-all duration-200 group-hover:visible
                                            group-hover:opacity-100 lg:w-[230px] gap-y-3 pt-6'>
                                                <div className='absolute translate-x-[85%] left-[50%] -top-1 h-6 w-6 rotate-45 rounded-sm bg-richblack-5
                                                flex flex-col select-none gap-2 font-semibold'></div>
                                                {loading ? (
                                                    <p className='text-center'>Loading...</p>
                                                ) : subLinks.length ? (
                                                       
                                                        subLinks
                                                            ?.filter( (subLink) => subLink?.courses?.length > 0
                                                            )
                                                            ?.map( (subLink, index) => (
                                                            <Link to={`/catalog/${subLink.name.split(' ').join('').toLowerCase()}`} key={index}>
                                                                <p className='hover:bg-richblack-50 px-3 rounded-md py-3'>{subLink.name}</p>
                                                            </Link>
                                                        ))
                                                        
                                                    ) : (<div className='text-center'>No Categories Found</div>)
                                                }

                                            </div>

                                        </div>) :
                                        (
                                            <Link to={link?.path}>
                                                <p className={`${matchRoute(link?.path) ? 'text-yellow-25' : 'text-richblack-25'}`}>
                                                    {link.title}
                                                </p>
                                            </Link>
                                        )
                                    }
                                </li>
                            )})
                        }
                    </ul>
                </nav>

                {/* login / signup / dashboard */}
                <div className='md:flex hidden gap-4 items-center'>
                    {
                        user && user?.accountType !== "Instructor" && (
                            <Link to={'/dashboard/cart'} className='relative'>
                                <AiOutlineShoppingCart className='text-lg relative text-richblack-100'/>
                                {
                                    totalItems > 0 && (
                                        <span className='absolute -bottom-2 -right-2 grid h-4 animate-bounce w-4  place-items-center overflow-hidden rounded-full bg-richblack-500 text-center text-xs font-bold text-yellow-50'>
                                            {totalItems}
                                        </span>
                                    )
                                }
                            
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/login">
                                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px]
                                text-richblack-100 rounded-[8px]'>
                                    Log in
                                </button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/signup">
                                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px]
                                text-richblack-100 rounded-[8px]'>
                                    Sign up
                                </button>
                            </Link>
                        )
                    }
                    {
                        token !== null && <ProfileDropDown/>
                    }
                </div>
                <button 
                    onClick={() => setOpen(true)}
                    className='mr-4 md:hidden relative'
                    ref={openRef}
                >
                    <AiOutlineMenu fontSize={24} fill='#AFB2BF'/>

                    {open && (
                        <div className='absolute top-[118%] right-[0] z-[100] bg-richblack-700 min-w-[150px] '>
                            <div className=''>
                                {NavbarLinks.map((link, index) => (
                                    <div key={index} className='border-b-white border-b py-2'>    
                                        {link.title !== 'Catalog' 
                                            ? (
                                                <Link to={link?.path}>
                                                    <p className={`${matchRoute(link?.path) ? 'text-yellow-25' : 'text-richblack-25'}`}>
                                                        {link.title}
                                                    </p>
                                                </Link>
                                            ) : (
                                                <div className={`cursor-pointer gap-1 group relative
                                                }`}>
                                                    <div className={`flex items-center w-full justify-center gap-x-3 ${
                                                        matchRoute("/catalog/:catalogName")
                                                        ? "text-yellow-25"
                                                        : "text-richblack-25"
                                                    }`}>
                                                        <p>{link.title}</p>
                                                        <IoIosArrowDown />
                                                    </div>

                                                    <div className='h-0 overflow-hidden group-hover:h-fit transition-all duration-200'>
                                                        {   loading ? (
                                                                <p className='text-center'>Loading...</p>
                                                            ) : subLinks.length ? (
                                                            
                                                                subLinks
                                                                    ?.filter( (subLink) => subLink?.courses?.length > 0
                                                                    )
                                                                    ?.map( (subLink, index) => (
                                                                    <Link to={`/catalog/${subLink.name.split('/').join('').toLowerCase()}`} key={index}>
                                                                        <p className='hover:bg-richblack-50 px-3 rounded-md py-3'>{subLink.name}</p>
                                                                    </Link>
                                                                ))
                                                                
                                                            ) : (<div className='text-center'>No Categories Found</div>)
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        }

                                    </div>
                                ))}
                            </div>
                            <div className='flex flex-col'>
                                {
                                    token === null && (
                                        <Link to="/login">
                                            <button className='text-richblack-25 py-2 border-b border-b-white w-full block'>
                                                Log in
                                            </button>
                                        </Link>
                                    )
                                }
                                {
                                    token === null && (
                                        <Link to="/signup">
                                            <button className='text-richblack-25 py-2 w-full block'>
                                                Sign up
                                            </button>
                                        </Link>
                                    )
                                }
                                {
                                    token !== null && <ProfileDropDown/>
                                }
                            </div>
                        </div>
                    )}

                </button>

            </div>
        </div>
    )
}

export default Navbar