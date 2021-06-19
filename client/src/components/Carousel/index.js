import { Carousel, Icon } from 'antd';
import React from 'react';
import Item from './item'
import 'App.css'
const Arrow = ({ type, style, className, onClick }) => (
  <Icon type={type} style={style} className={className} onClick={onClick} />
);

const RoomCarousel = (props) => {
  const { photos } = props
  return (
    <>
      <Carousel autoplay className="my-2 w-5/6" arrows
        prevArrow={<Arrow type="left" />}
        nextArrow={<Arrow type="right" />}>
        {photos && photos.map((item) => <Item url={item} />)}
      </Carousel>
    </>
  );
};

export default RoomCarousel;
