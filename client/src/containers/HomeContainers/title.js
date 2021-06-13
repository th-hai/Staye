import React from 'react';

const Title = (props) => {
  return (
    <div className="relative w-1/2 h-full mb-4 mt-8">
      <h2 className="mt-5 text-3xl font-bold  text-gray-900">{props.title}</h2>
      <p className="mt-2 text-base text-gray-600">{props.content}</p>
    </div>
  );
};

export default Title;
