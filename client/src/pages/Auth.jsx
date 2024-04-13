import React, { useEffect, useState } from 'react';
import RegisterForm from '../components/auth/RegisterForm';
import LoginForm from '../components/auth/LoginForm';
import loginBg from '../assets/images/loginBg.png'
import { useDispatch } from 'react-redux';
import { neutral } from '../redux/user/userSlice';

const Auth = () => {
  const [activeTab, setActiveTab] = useState('login');
  const dispatch = useDispatch()
  const openTab = (tab) => {
    setActiveTab(tab);
  };
  useEffect(() => {
    dispatch(neutral());
  }, [])

  return (
    <div className="relative container-full mx-auto flex justify-center items-center h-[calc(100vh-60px)]">
      <div className='w-full'>
        <img className='w-full h-[calc(100vh-60px)]' src={loginBg} alt="" />
      </div>
      <div className='absolute flex items-center justify-center p-3 top-0 w-full h-full'>
        <div className='bg-white rounded-lg p-4 xs:w-[352.6px] h-[300px] flex flex-col justify-between'>
          <div className="flex justify-center text-sm xs:text-md w-full">
            <button
              className={`px-4 py-2 flex-1 focus:outline-none text-white ${activeTab === 'register'
                ? 'bg-[#492815]'
                : 'bg-[#b9683a]'
                }`}
              onClick={() => openTab('register')}
            >
              Register
            </button>
            <button
              className={`px-4 py-2 flex-1 focus:outline-none text-white ${activeTab === 'login'
                ? 'bg-[#492815]'
                : 'bg-[#dc7f48]'
                }`}
              onClick={() => openTab('login')}
            >
              Login
            </button>
          </div>
          <div className="mt-4">
            {activeTab === 'register' && <RegisterForm />}
            {activeTab === 'login' && <LoginForm />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
