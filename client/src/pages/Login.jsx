import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios'
import { toast } from 'react-toastify';

const Login = () => {

  const {backendUrl , setIsLoggedin , getUserData} = useContext(AppContext);
  const navigate = useNavigate();

  const [state , setState] = useState("Sign Up");
  const [name , setName] = useState("");
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");


  const onSubmitHandler = async(e) => {
   
       try {
           e.preventDefault();
           axios.defaults.withCredentials = true ;

           if(state === "Sign Up"){
            const {data} = await axios.post(backendUrl + "/api/auth/register" , {name , email , password});
            if(data.success){
              setIsLoggedin(true);
              getUserData();
              setState("Login");
              toast.success(data.message);
            }else{
              toast.error(data.message);
            }
           }else{
                const {data} = await axios.post(backendUrl + "/api/auth/login" , {email , password});
                      if(data.success){
                        setIsLoggedin(true);
                        getUserData();
                        navigate("/")
                      }else{
                      toast.error(data.message);
            } 
           }
       } catch (error) {
          toast.error(error.message);
       }
         


  };

  return (
    <div className='bg-red-100 flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
      <img onClick={()=>navigate("/")} src={assets.logo} alt="" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer bg-red-200' />
       
       <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm'>
        <h2 className='text-3xl font-semibold text-white text-center mb-3'>
          {state === 'Sign Up' ? 'Create Account' : 'Login!'}
        </h2>
        <p className='text-center text-sm mb-6'>
          {state === 'Sign Up' ? 'Create your account' : 'Login to your account!'}
        </p>


        <form onSubmit={onSubmitHandler}>
          {/* Only render the email field when the status is Sign Up */}
          {state === "Sign Up" && (<div className='flex items-center gap-3 mb-3 px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.person_icon} alt="" />
            <input onChange={(eve)=>setName(eve.target.value)} value={name} className='bg-transparent outline-none' type="text" placeholder='Full Name' required/>
          </div>)}
          
          <div className='flex items-center gap-3 mb-3 px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.mail_icon} alt="" />
            <input onChange={(eve)=>setEmail(eve.target.value)} value={email} className='bg-transparent outline-none' type="email" placeholder='Email id' required/>
          </div>
          <div className='flex items-center gap-3 mb-3 px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.lock_icon} alt="" />
            <input onChange={(eve)=>setPassword(eve.target.value)} value={password} className='bg-transparent outline-none' type="password" placeholder='Password' required/>
          </div>
            
          <p onClick={()=>navigate("/reset-password")} className='mb-4 text-indigo-500 cursor-pointer'>Forgot Password?</p>
        
          <button  className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-400 to-indigo-900 text-white font-medium'>{state}</button>
        </form>
        
        {state === "Sign Up" ? (<p className='text-gray-400 text-center text-xs mt-4'>Already have an Account? <span onClick={()=> setState("Login")} className='text-blue-400 cursor-pointer underline'>Login here</span></p>) : <p className='text-gray-400 text-center text-xs mt-4'>Don't have an Account? <span onClick={()=>setState("Sign Up")} className='text-blue-400 cursor-pointer underline'>Sign up</span></p>}
      </div>

    </div>
  )
}

export default Login