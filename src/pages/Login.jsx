import React, {useContext, useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import Input from "../components/Input.jsx";
import {validationEmail} from "../util/validation.js";
import axiosConfig from "../util/axiosConfig.js";
import {API_ENDPOINTS} from "../util/apiEndpoint.js";
import {AppContext} from "../context/AppContext.jsx";
import toast from "react-hot-toast";
import {LoaderCircle} from "lucide-react";

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {setUser} = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (!validationEmail(email)){
      setError('Please enter valid email address.');
      setIsLoading(false);
      return;
    }
    if (!password.trim()){
      setError('Please enter your password.');
      setIsLoading(false);
      return;
    }

    setError(null);

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, {
        email,
        password,
      });

      if (response?.status === 200){
        const { token, user } = response.data;
        if (token) {
          localStorage.setItem('token', token);
          setUser(user);
          navigate('/dashboard');
        }
      }
    } catch (err) {
      console.error("something", err);
      setError(err);

      if (err.response && err.response?.data?.message) {
        setError(err.response?.data?.message);
        toast.error(err.response?.data?.message);
      } else {
        setError('Something went wrong. Please try again.');
        toast.error('Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='h-screen w-full relative flex items-center justify-center overflow-hidden'>
      {/* Background image with blur */}
      <img src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80"
           alt="Background"
           className='absolute inset-0 w-full h-full object-cover filter blur-sm'
      />

      <div className='relative z-10 w-full max-w-lg px-6'>
        <div className='bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto'>
          <h3 className='text-2xl font-semibold text-black text-center mb-2'>
            Welcome Back!
          </h3>
          <p className='text-sm text-slate-700 text-center mb-8'>
            Please enter your details to log in.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className='flex justify-center mb-6'>
              {/* Profile image */}
            </div>

            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label='Email Address'
              placeholder='name@example.com'
              type='text'
            />

            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label='Password'
              placeholder='*********'
              type='password'
            />

            {error && (
              <p className='text-red-800 text-sm text-center bg-red-50 p-2 rounded'>
                {error}
              </p>
            )}

            <button disabled={isLoading} className={`w-full py-3 text-lg font-medium bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                    type='submit'>
              {isLoading ? (
                <>
                  <LoaderCircle className={'animate-spin w-5 h-5'}/>
                  Logging in...
                </>
              ) : (
                'LOG IN'
              )}
            </button>

            <p className='text-sm text-slate-800 text-center mt-6'>
              Don't have an account?
              <Link to='/signup' className='font-medium text-primary underline hover:text-primary-dark transition-colors'>
                SignUp
              </Link>
            </p>
          </form>
        </div>

      </div>

    </div>
  )
}

export default Login