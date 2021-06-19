import Slider from "react-slick";
import React from 'react';

const settings = {
  className: "center",
  centerMode: true,
  centerPadding: "600px",
  dots: false,
  lazyload: true,
  infinite: true,
  speed: 1000,
  slidesToRoll: 1,
  arrows: true,
  autoplay: true,
  autoplaySpeed: 5000,
  initialSlide: 0,
}

const RoomCarousel = (props) => {
  const { photos } = props
  return (
    <>
      <Slider {...settings} >
        {photos.map(item =>
          <img className="w-full" src={item} alt="Homestay preview"/>
        )}
      </Slider>
    </>
  );
};

export default RoomCarousel;
