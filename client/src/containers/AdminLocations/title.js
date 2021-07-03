import React from 'react';

const Title = () => {
  return (
    <section class="bg-coolGray-800 text-coolGray-100">
      <div class="container mx-auto flex flex-col justify-center  lg:flex-row lg:justify-between">
        <div class="flex flex-col justify-center text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
          <h1 class="text-4xl font-bold leading-none ">
           Locations Management
          </h1>
          <div className="text-lg text-gray-500 pl-4 pt-2"> 
              Edit/Delete location
          </div>
        </div>
      </div>
    </section>
  );
};

export default Title;
