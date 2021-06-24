import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import authService from 'services/authService'
import { useHistory } from "react-router-dom";


export const ResetPassword = () => {

  const history = useHistory();
  const search = useLocation().search;
  const token = { token: new URLSearchParams(search).get('token') }

  const [color, setColor] = useState('red');
  const [password, setPassword] = useState('');
  const [cfPassword, setCfPassword] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isError, setIsError] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');

  const validateInput = (text) => {
    setCfPassword(text)
    setIsError(false)
    const regexp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

    const checkingResult = regexp.exec(text);
    if (password !== text || !checkingResult) {
      setIsValid(false)
    } else {
      setIsValid(true)
    }
  }

  const handleResetPassword = async () => {
    if (isValid) {
      const body = { password: password }
      await authService.resetPassword(body, token).then(response => {
        if (response) {
          setIsError(true)
          setColor('green')
          setInfoMessage('Password reset successfully')
          history.push('/login')
        } else {
          setIsError(true)
          setColor('red')
          setInfoMessage('Reset password failed!')
        }
      })
    }
  }

  return (
    <div className="text-blueGray-700 h-screen bg-gradient-to-r from-green-400 to-blue-500 flex justify-center items-center ">
      <div className="container items-center px-5 py-20">
        <div className="flex flex-col w-full p-10 mx-auto my-6 transition duration-500 ease-in-out transform bg-white border rounded-lg lg:w-2/6 md:w-1/2 md:mt-0">
          <div className="relative mt-4">
            <label for="password" className="text-base leading-7 text-blueGray-500">Reset password</label>
            <input onChange={e => setPassword(e.target.value)}
              type="password" id="password" name="password" placeholder="Your new password" className="w-full px-4 py-2 my-2 text-base text-black border-2 border-blue-300 focus:outline-none focus:ring focus:border-blue-500 transition duration-500 ease-in-out transform border-transparent rounded-lg" />
            <input onChange={e => validateInput(e.target.value)}
              type="password" id="cf-password" name="cf-password" placeholder="Confirm new password" className="w-full px-4 py-2 my-2 text-base text-black border-2 border-blue-300 focus:outline-none focus:ring focus:border-blue-500 transition duration-500 ease-in-out transform border-transparent rounded-lg" />
            {!isValid && <span style={{
              fontWeight: 'bold',
              color: 'red',
            }}>Password must contains eight characters, at least one letter, one number & matched</span>}
            {isError && <span style={{
              fontWeight: 'bold',
              color: `${color}`,
            }}>{infoMessage}</span>}
          </div>
          <button className="w-full px-16 py-2 my-2 mt-2 mr-2 text-base text-white transition duration-500 ease-in-out transform bg-blue-600 border-blue-600 rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-blue-800 " onClick={handleResetPassword}>Reset Password</button>
        </div>
      </div>
    </div>
  );
};
export default ResetPassword