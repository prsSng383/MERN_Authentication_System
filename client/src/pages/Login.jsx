import React, { useContext, useState} from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContext);
  const navigate = useNavigate();

  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);



  const onSubmitHandler = async (e) => {
  e.preventDefault();
  setLoading(true);

  let wakeToastId = null;
  let toastShown = false;

  const timeout = setTimeout(() => {
    wakeToastId = toast.info("Waking up server, please wait...", {
      autoClose: false,
      closeOnClick: true,
    });
    toastShown = true;
  }, 3000);

  try {
    axios.defaults.withCredentials = true;

    // Login or Signup logic
    if (state === "Sign Up") {
      const { data } = await axios.post(backendUrl + "/api/auth/register", { name, email, password });
      if (data.success) {
        setIsLoggedin(true);
        getUserData();
        setState("Login");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } else {
      const { data } = await axios.post(backendUrl + "/api/auth/login", { email, password });
      if (data.success) {
        setIsLoggedin(true);
        getUserData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    }
  } catch (error) {
    toast.error(error.message || "Something went wrong");
  } finally {
    clearTimeout(timeout);
    if (toastShown && wakeToastId) toast.dismiss(wakeToastId);
    setLoading(false);
  }
};


  return (
    <div className='bg-red-100 flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt=""
        className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer bg-red-200'
      />

      <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm'>
        <h2 className='text-3xl font-semibold text-white text-center mb-3'>
          {state === 'Sign Up' ? 'Create Account' : 'Login!'}
        </h2>
        <p className='text-center text-sm mb-6'>
          {state === 'Sign Up' ? 'Create your account' : 'Login to your account!'}
        </p>

        <form onSubmit={onSubmitHandler}>
          {state === "Sign Up" && (
            <div className='flex items-center gap-3 mb-3 px-5 py-2.5 rounded-full bg-[#333A5C]'>
              <img src={assets.person_icon} alt="" />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className='bg-transparent outline-none'
                type="text"
                placeholder='Full Name'
                required
              />
            </div>
          )}

          <div className='flex items-center gap-3 mb-3 px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.mail_icon} alt="" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className='bg-transparent outline-none'
              type="email"
              placeholder='Email id'
              required
            />
          </div>

          <div className='flex items-center gap-3 mb-3 px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.lock_icon} alt="" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className='bg-transparent outline-none'
              type="password"
              placeholder='Password'
              required
            />
          </div>

          <p onClick={() => navigate("/reset-password")} className='mb-4 text-indigo-500 cursor-pointer'>
            Forgot Password?
          </p>

          <button
            disabled={loading}
            className={`w-full py-2.5 rounded-full text-white font-medium transition duration-300 
              ${loading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-400 to-indigo-900 hover:opacity-90'}`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Processing...
              </div>
            ) : (
              state
            )}
          </button>
        </form>

        {state === "Sign Up" ? (
          <p className='text-gray-400 text-center text-xs mt-4'>
            Already have an Account?{' '}
            <span onClick={() => setState("Login")} className='text-blue-400 cursor-pointer underline'>
              Login here
            </span>
          </p>
        ) : (
          <p className='text-gray-400 text-center text-xs mt-4'>
            Don't have an Account?{' '}
            <span onClick={() => setState("Sign Up")} className='text-blue-400 cursor-pointer underline'>
              Sign up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
