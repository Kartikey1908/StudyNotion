import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn';
import { buyCourse } from '../../../../services/operations/studentFeaturesAPI';
import { useNavigate } from 'react-router-dom';

const RenderTotalAmount = () => {

    const {total, cart} = useSelector( (state) => state.cart);
    const { token } = useSelector( (state) => state.auth);
    const { user } = useSelector( (state) => state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleBuyCourse = () => {
        // TODO : connect to paymet integration
        const courses = cart.map((course) => course._id)
        buyCourse(token, courses, user,navigate, dispatch)
    }

    return (
        <div className='min-w-[280px] rounded-md border border-richblack-700 bg-richblack-800 p-6'>
            <p className='mb-1 text-sm font-medium text-richblack-300'>Total : </p>
            <p className='mb-6 text-3xl font-medium text-yellow-100'>₹ {total}</p>


            <button
                onClick={handleBuyCourse}
                className='text-center px-6 py-3 rounded-md font-semibold
                 text-black hover:scale-95 trasition-all duration-200 bg-yellow-50 w-full justify-center flex items-center'
            >
                Buy Now
            </button>

        </div>
  )
}

export default RenderTotalAmount