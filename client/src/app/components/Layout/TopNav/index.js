import React from 'react'
import logo from '../../../../assets/logo.png'
const TopNav = () => {
  return (
    <div class="w-full text-gray-700 bg-white border-t border-gray-100 shadow-sm body-font ">
        <div class="container flex flex-col items-start justify-between p-6 mx-auto md:flex-row">
            <a class="flex items-center mb-4 font-medium text-gray-900 title-font md:mb-0">
                <img className="w-24 h-8" src={logo}/>
            </a>
            <div class="flex flex-wrap items-center justify-center pl-6 ml-6 text-base border-l border-gray-200 md:mr-auto">
                <a href="#_" class="mr-5 font-medium text-gray-600 hover:text-gray-900 no-underline">Home</a>
                <a href="#_" class="mr-5 font-medium text-gray-600   hover:text-gray-900 no-underline">About</a>
                <a href="#_" class="font-medium text-gray-600 hover:text-gray-900 no-underline">Contact</a>
            </div>
            <div class="items-center h-full">
                <a href="#_" class="mr-5 font-medium text-gray-600 hover:text-gray-900 text-black  no-underline">Login</a>
                <a href="#_"
                    class="px-4 py-2 text-xs font-bold text-white uppercase transition-all duration-150 bg-green-400 rounded shadow outline-none active:bg-teal-600 hover:shadow-md focus:outline-none ease no-underline">
                    Sign Up
                </a>
            </div>
        </div>
    </div>
  )
}

export default TopNav
