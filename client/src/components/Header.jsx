import React from 'react'
import { MdLogin } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { GrFormView } from "react-icons/gr";
import { IoMdLogOut } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { logoutFailure, logoutStart, logoutSuccess } from '../redux/user/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import toasty from '../utils/Toast';
import axios from 'axios';

const Header = () => {
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        dispatch(logoutStart());
        try {
            const res = await axios.get('/api/auth/logout');
            toasty(res.data.message, "success")
            dispatch(logoutSuccess());
        } catch (error) {
            toasty(error.response.data.message, "error")
            dispatch(logoutFailure(error.message));
        }
    }

    const handleLogin = () => {
        navigate('/auth');
    }

    return (
        <div className="flex px-5 text-white justify-between items-center h-[60px] bg-gradient-to-r from-[#d16d2c] to-[#7f340a]">
            <Link to='/' className="text-2xl font-semibold">
                Notes Saver
            </Link>

            {currentUser ?
                <div className='flex gap-4'>
                    <Link to={'/notes'}>
                        <span className='hidden xs:block'>View Notes</span>
                        <GrFormView className='xs:hidden text-3xl' />
                    </Link>
                    <Link to={'/add'}>
                        <span className='hidden xs:block'>Add New Note</span>
                        <IoIosAdd className='xs:hidden text-3xl' />
                    </Link>
                    <button onClick={handleLogout}>
                        <span className='hidden xs:block'>Logout</span>
                        <IoMdLogOut className='xs:hidden text-2xl' />
                    </button>
                </div>
                :
                <button onClick={handleLogin}>
                    <span className='hidden xs:block'>Login</span>
                    <MdLogin className='xs:hidden text-2xl' />
                </button>
            }
        </div>
    )
}

export default Header
