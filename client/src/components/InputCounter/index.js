import React, { useState } from 'react';

const InputCounter = (props) => {
  
  const [count, setCount] = useState(0);
 
   const handleIncrease = () => {
    setCount(count + 1);
  };
  const handleDecrease = () => {
    if (count >= 1) {
      setCount(count - 1);
    }
    return;
  };
  return (
    <div class="custom-number-input h-10 w-16 ">
      <div class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
        <button
         onclick={handleDecrease}  class=" bg-transparent text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
        >
          <span class="m-auto text-2xl font-bold">−</span>
        </button>
        <div
          class="mx-2 focus:outline-none text-center w-full bg-transparent font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
         
        >
          {count}
        </div>
        <div onclick={handleIncrease} class="bg-transparent text-gray-600 border-none outline-none focuse:outline-none focus:border-none h-full w-20 rounded-r cursor-pointer">
          <span  class="m-auto text-2xl font-bold">+</span>
        </div>
      </div>
    </div>
  );
};

export default InputCounter;
