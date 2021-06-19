import React from 'react';
import Slider from "react-slick";

const settings = {
  dots: true,
  lazyload: true,
  infinite: true,
  speed: 1000,
  slidesToRoll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 5000,
  initialSlide: 0,
}

const sliderList = [
  'http://wowslider.com/sliders/demo-77/data1/images/tuscany428041.jpg',
  'https://wowslider.net/local-sliders/demo-10/data1/images/road220058.jpg',
  'https://wowslider.com/sliders/demo-77/data1/images/field175959_1920.jpg'
]

const HomeCarousel = () => {
  return (
    <div className="w-full mt-8">
      <Slider {...settings} >
        {sliderList.map(item =>
          <img className="w-full rounded-3xl" src={item} />
        )}
      </Slider>
    </div>
  );
};

export default HomeCarousel;
