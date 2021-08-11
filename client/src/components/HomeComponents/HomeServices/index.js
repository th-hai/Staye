import React from 'react';

const HomeServices = () => {
  return (
    <section className="services-container text-gray-600 body-font pb-12">
      <div>
        <div className="flex flex-wrap w-full mb-5">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 className="sm:text-3xl text-2xl font-bold title-font mb-2 text-gray-900">Our services</h1>
            <div className="h-1 w-20 bg-green-500 rounded" />
          </div>
        </div>
        <div className="flex flex-wrap -m-4">
          <div className="xl:w-1/4 md:w-1/2 p-4">
            <div className="bg-gray-100 p-6 rounded-lg hover:bg-blue-100">
              <img className="h-80 rounded w-full object-cover object-center mb-6" src="https://a0.muscache.com/im/pictures/2f13349d-879d-43c6-83e3-8e5679291d53.jpg?im_w=480" alt="content" />
              <h2 className="text-lg text-gray-900 font-medium title-font mb-4">Outdoor Activities</h2>
            </div>
          </div>
          <div className="xl:w-1/4 md:w-1/2 p-4">
            <div className="bg-gray-100 p-6 rounded-lg hover:bg-blue-100">
              <img className="h-80 rounded w-full object-cover object-center mb-6" src="https://a0.muscache.com/im/pictures/36f53e61-db8d-403c-9122-5b761c0e4264.jpg?im_w=480" alt="content" />
              <h2 className="text-lg text-gray-900 font-medium title-font mb-4">Special Homestay</h2>
            </div>
          </div>
          <div className="xl:w-1/4 md:w-1/2 p-4">
            <div className="bg-gray-100 p-6 rounded-lg hover:bg-blue-100">
              <img className="h-80 rounded w-full object-cover object-center mb-6" src="https://images.unsplash.com/photo-1583511655826-05700d52f4d9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="content" />
              <h2 className="text-lg text-gray-900 font-medium title-font mb-4">Pets Allowed</h2>
            </div>
          </div>
          <div className="xl:w-1/4 md:w-1/2 p-4">
            <div className="bg-gray-100 p-6 rounded-lg hover:bg-blue-100">
              <img className="h-80 rounded w-full object-cover object-center mb-6" src="https://a0.muscache.com/im/pictures/7d82ca14-56e5-4465-8218-dcfa7d69b6ac.jpg?im_w=480" alt="content" />
              <h2 className="text-lg text-gray-900 font-medium title-font mb-4">Your Own Place</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeServices;
