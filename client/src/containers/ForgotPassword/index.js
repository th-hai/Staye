import React, { useState } from 'react'
import authService from 'services/authService'

export const ForgotPassword = () => {
  

  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');


  const validateInput = (text) => {

    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const checkingResult = regexp.exec(text);
    if (checkingResult !== null) {
      setEmail(text)
      setIsValid(true)
    } else {
      setIsValid(false)
      setErrorMessage('Email is invalid')
    }
  }

  const handleResetPassword = async () => {
    if(isValid) {
      setInfoMessage('Please check your email to reset your password!')
      await authService.sendEmailResetPassword(email)
    }
  }

  return (
    <div className="text-blueGray-700 h-screen bg-gradient-to-r from-green-400 to-blue-500 flex justify-center items-center ">
      <div className="container items-center px-5 py-20">
        <div className="flex flex-col w-full p-10 mx-auto my-6 transition duration-500 ease-in-out transform bg-white border rounded-lg lg:w-2/6 md:w-1/2 md:mt-0">
          <div className="relative mt-4">
            <label for="email" className="text-base leading-7 text-blueGray-500">Email</label>
            <input onChange={e => validateInput(e.target.value)}
              type="email" id="email" name="email" placeholder="Input your email" className="w-full px-4 py-2 my-2 text-base text-black border-2 border-blue-300 focus:outline-none focus:ring focus:border-blue-500 transition duration-500 ease-in-out transform border-transparent rounded-lg" />
            {!isValid && <span style={{
              fontWeight: 'bold',
              color: 'red',
            }}>{errorMessage}</span>}
            {isValid && <span style={{
              fontWeight: 'bold',
              color: 'green',
            }}>{infoMessage}</span>}
          </div>
          <button className="w-full px-16 py-2 my-2 mt-2 mr-2 text-base text-white transition duration-500 ease-in-out transform bg-blue-600 border-blue-600 rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-blue-800 " onClick={handleResetPassword}>Reset Password</button>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword