import React from 'react'
const SignIn = () => {
  return (
    
    <section class="flex flex-col items-center w-5/6 h-1/2 md:flex-row mx-24 my-24 shadow-lg">
    <div class=" bg-white h-1/2">
      <img src="https://preview.redd.it/1vw96asigy741.png?width=640&crop=smart&auto=webp&s=8552410f08f23eade85782b52a4c0ec15a70c59d" alt="" class="object-cover "/>
      
    </div>
    <div class="flex items-center justify-center w-full h-full px-6 bg-white md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 lg:px-16 xl:px-12">
      <div class="w-full ">
        <a class="flex items-center w-32 mb-4 font-medium text-blueGray-900 title-font md:mb-0">
          <div class="w-2 h-2 p-2 mr-2 rounded-full bg-gradient-to-tr from-blue-300 to-blue-600">
          </div>
          <h2 class="text-lg font-bold tracking-tighter text-black uppercase duration-500 ease-in-out transform ttransition hover:text-lightBlue-500 dark:text-blueGray-400"> STAYE </h2>
        </a>
        <h1 class="mt-12 text-2xl font-semibold text-black tracking-ringtighter sm:text-3xl title-font">Log in to your account</h1>
        <form class="mt-6" action="#" method="POST">
          <div>
            <label class="block text-sm font-medium leading-relaxed tracking-tighter text-blueGray-700">Email Address</label>
            <input type="email" name="" id="" placeholder="Your Email " class="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blueGray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "/>
          </div>
          <div class="mt-4">
            <label class="block text-sm font-medium leading-relaxed tracking-tighter text-blueGray-700">Password</label>
            <input type="password" name="" id="" placeholder="Your Password" minlength="6" class="w-full px-4 py-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blueGray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 " required=""/>
          </div>
          <div class="mt-2 text-right">
            <a href="#" class="text-sm font-semibold leading-relaxed text-blueGray-700 hover:text-black focus:text-blue-700">Forgot Password?</a>
          </div>
          <button type="submit" class="block w-full px-4 py-3 mt-6 font-semibold text-white transition duration-500 ease-in-out transform bg-black rounded-lg hover:bg-blueGray-800 hover:to-black focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 ">Log In</button>
        </form>
        <hr class="w-full my-6 border-blueGray-300"/>
        <div class="flex justify-enter">
          <button type="button" class="inline-flex w-full px-4 py-3 font-semibold text-black transition duration-500 ease-in-out transform bg-white border rounded-lg border-blueGray-300 hover:bg-black hover:text-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ">
            <div class="flex items-center justify-center">
             
              <span class="ml-4"> Log in with Google </span>
            </div>
          </button>
          <button type="button" class="inline-flex px-4 py-3 ml-8 font-semibold text-black transition duration-500 ease-in-out transform bg-white border rounded-lg border-blueGray-300 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 hover:bg-black focus:bg-blueGray-100 hover:text-blue-500">
            <div class="flex items-center justify-center">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z">
                </path>
              </svg>
            </div>
          </button>
        </div>
        <p class="mt-8 text-center">Need an account? <a href="#" class="font-semibold text-blue-500 hover:text-blue-700">Sign Up</a></p>
      </div>
    </div>
  </section>

  )
}

export default SignIn
