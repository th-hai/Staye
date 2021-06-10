import React from 'react';

const Title = () => {
  return (
    <section class="bg-coolGray-800 text-coolGray-100  mb-4">
      <div class="container mx-auto flex flex-col justify-center sm:pt-12 lg:pt-14 lg:flex-row lg:justify-between">
        <div class="flex flex-col justify-center text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
          <h1 class="text-4xl font-bold leading-none ">
           Rooms Management
          </h1>
          <div className="text-lg text-gray-500 pl-4 pt-2"> 
              Edit/Delete room
          </div>
        </div>
      </div>
    </section>
  );
};

export default Title;