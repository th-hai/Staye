import { Carousel } from 'antd';
import React from 'react';

const HomeCarousel = () => {
  return (
    <>
      <Carousel className="my-8">
        <div>
          <img alt="" className="w-full" src="http://wowslider.com/sliders/demo-77/data1/images/tuscany428041.jpg" />
        </div>
        <div>
          <img alt="" className="w-full"  src="https://wowslider.net/local-sliders/demo-10/data1/images/road220058.jpg" />
        </div>
        <div>
          <img alt="" className="w-full"  src="https://wowslider.com/sliders/demo-77/data1/images/field175959_1920.jpg" />
        </div>
      </Carousel>
    </>
  );
};

export default HomeCarousel;
