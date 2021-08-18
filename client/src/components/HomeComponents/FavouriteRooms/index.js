import React, { useState, useEffect } from 'react'
import RoomCard from 'components/Rooms/RoomCard';
import * as roomService from 'services/roomService';
import { Col, Row } from 'antd';

export const FavouriteRooms = () => {

  const [room, setRoom] = useState([]);

  useEffect(() => {
    getFavouriteRooms();
  }, [])

  const getFavouriteRooms = async () => {
      await roomService.getFavouriteRooms().then(response => {
        if (response) {
          setRoom(response?.data);
          console.log(room);
        } else {
          setRoom([]);
        }
      })
  }

  return (
    <section className="relative w-full bg-white">
      <h1 className="sm:text-3xl text-2xl font-bold title-font mb-2 text-gray-900">Favourite homestay</h1>
      <div className="h-1 w-20 bg-green-500 rounded" />
      <Row>
        {room && room.map((item, index) =>
          <>
            <Col xs={22} sm={16} md={8} lg={6} xxl={4}>
              <RoomCard key={index} room={item} />
            </Col>
          </>
        )}
      </Row>
    </section>
  );
};
export default FavouriteRooms