import Slider from "react-slick";
import React from 'react';

const settings = {
  dots: false,
  lazyload: true,
  infinite: true,
  speed: 1000,
  slidesToRoll: 1,
  slidesToShow: 2,
  arrows: true,
  autoplay: true,
  autoplaySpeed: 5000,
  initialSlide: 0,
}

const RoomCarousel = (props) => {
  const { photos } = props
  return (
    <div>
      <Slider {...settings} >
        {photos && photos.map((item, index) =>
        <>
          <div
          key={item}
          className="bg-cover bg-center w-full h-96 text-white object-fill relative rounded-xl"
          style={{
            backgroundImage: `url(${item})`,
          }}>
          </div>
          </>
        )}
      </Slider>
    </div>
  );
};

export default RoomCarousel;
