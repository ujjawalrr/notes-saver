import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginFailure, loginStart, loginSuccess } from "../../redux/user/userSlice";
import toasty from '../../utils/Toast';
import axios from 'axios';

const LoginForm = () => {
    const { loading } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })
    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.id]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(loginStart());
            const res = await axios.post('/api/auth/login', loginData);
            toasty(res.data.message, "success")
            dispatch(loginSuccess(res.data.account));
            navigate('/');
        } catch (error) {
            toasty(error.response.data.message, "error")
            dispatch(loginFailure(error.response.data.message));
        }
    }

    return (
        <form className="w-full flex flex-col justify-center mx-auto" onSubmit={handleSubmit}>
            <h2 className="w-full text-center text-2xl font-semibold">Welcome Back!</h2>
            <div className="flex items-center py-3">
                <label htmlFor="email" className="w-1/4">Email</label>
                <input placeholder="Enter Your Email" id="email" type="email" onChange={handleChange} className="w-3/4 px-3 py-2 border border-black rounded-md" required />
            </div>
            <div className="flex items-center py-3">
                <label htmlFor="password" className="w-1/4">Password</label>
                <input placeholder="Enter Your Password" id="password" type="password" onChange={handleChange} className="w-3/4 px-3 py-2 border border-black rounded-md" required />
            </div>
            <button type="submit" disabled={loading} className="w-full py-2 my-2 bg-gradient-to-r from-[#d16d2c] to-[#7f340a] border border-[#492815] text-white rounded-md hover:opacity-95 disabled:opacity-80">{loading ? 'Logging in...' : 'Login'}</button>
        </form>
    );
};

export default LoginForm