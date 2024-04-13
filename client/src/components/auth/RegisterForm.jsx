import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerFailure, registerStart, registerSuccess } from "../../redux/user/userSlice";
import toasty from '../../utils/Toast';
import axios from 'axios';

const RegisterForm = () => {
    const { loading } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [registerData, setRegisterData] = useState({
        username: '',
        email: '',
        password: ''
    })
    const handleChange = (e) => {
        setRegisterData({ ...registerData, [e.target.id]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(registerStart());
            const res = await axios.post('/api/auth/register', registerData);
            toasty(res.data.message, "success")
            dispatch(registerSuccess(res.data.account));
            navigate('/');
        } catch (error) {
            toasty(error.response.data.message, "error")
            dispatch(registerFailure(error.response.data.message));
        }
    }

    return (
        <form className="w-full mx-auto" onSubmit={handleSubmit}>
            <div className="flex items-center py-2">
                <label htmlFor="username" className="w-1/4">Name</label>
                <input placeholder="Enter Your Name" id="username" type="text" onChange={handleChange} className="w-3/4 px-3 py-2 border border-black rounded-md" required />
            </div>
            <div className="flex items-center py-2">
                <label htmlFor="email" className="w-1/4">Email</label>
                <input placeholder="Enter Your Email" id="email" type="email" onChange={handleChange} className="w-3/4 px-3 py-2 border border-black rounded-md" required />
            </div>
            <div className="flex items-center py-2">
                <label htmlFor="password" className="w-1/4">Password</label>
                <input placeholder="Enter Your Password" id="password" type="password" onChange={handleChange} className="w-3/4 px-3 py-2 border border-black rounded-md" required />
            </div>
            <button type="submit" disabled={loading} className="w-full py-2 my-2 bg-gradient-to-r from-[#d16d2c] to-[#7f340a] border border-[#492815] text-white rounded-md hover:opacity-95 disabled:opacity-80">{loading ? 'Registering' : 'Register'}</button>
        </form>
    );
};

export default RegisterForm