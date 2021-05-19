import React from 'react'
// import { LockClosedIcon } from '@heroicons/react/solid'
const Login = () => {
  return (

<div className="container mx-auto">
  <div className="flex justify-center px-6 my-12">
    
    <div className="w-full xl:w-3/4 lg:w-11/12 flex">
   
      <div className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1502301197179-65228ab57f78?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHRyYXZlbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60")'}} />

      <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
        <h2 className="pt-4 text-4xl text-center">Welcome Back Staye!</h2>
        <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="username">
              Username
            </label>
            <input className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
              Password
            </label>
            <input className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
            {/* <p className="text-xs italic text-red-500">Please choose a password.</p> */}
          </div>
          <div className="mb-4">
            <input className="mr-2 leading-tight" type="checkbox" id="checkbox_id" />
            <label className="text-sm" htmlFor="checkbox_id">
              Remember Me
            </label>
          </div>
          <div className="mb-6 text-center">
            <button className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="button">
              Sign In
            </button>
          </div>
          <hr className="mb-6 border-t" />
          <div className="text-center">
            <a className="inline-block text-sm text-blue-600 align-baseline hover:text-blue-800" href="./register.html">
              Create an Account!
            </a>
          </div>
          <div className="text-center">
            <a className="inline-block text-sm text-blue-600 align-baseline hover:text-blue-800" href="./forgot-password.html">
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

  )
}
export default Login