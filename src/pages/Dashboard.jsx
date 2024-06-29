import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/Dashboard/Sidebar';

const Dashboard = () => {
    const {loading : authLoading} = useSelector( (state) => state.auth );
    const {loading : profileLoading} = useSelector( (state) => state.profile );

    if (profileLoading || authLoading)
    {
        return (
            <div>
                <div className='spinner'></div>
                <div className='mt-10 bg-richblack-5 text-4xl'>
                    Loading...
                </div>
            </div>
            
        )
    }

  return (
    <div className='flex min-h-[calc(100vh-3.5rem)] overflow-hidden'>
        <Sidebar/>

        <div className='h-[calc(100vh-3.5rem)] w-full overflow-auto'>
            <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
                <Outlet/>
            </div>

        </div>

    </div>
  )
}

export default Dashboard