import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import BookingCard from 'components/Card/booking-card';
import * as userService from 'services/userClientService';

export const UserBookings = () => {

  const { id } = useParams();
  const [booking, setBooking] = useState([]);

  useEffect(() => {
    getUserBooking(id);
  }, [])

  const getUserBooking = async (id) => {
      await userService.getUserBooking(id).then(response => {
        if (response) {
          setBooking(response?.data);
          console.log(booking);
        } else {
          setBooking([]);
        }
      })
  }

  return (
    <section className="relative w-full bg-white">
      <div className="absolute w-full h-32 bg-gradient-to-b from-gray-100 to-white" />
      <div className="relative w-full px-5 py-10 mx-auto sm:py-12 md:py-16 md:px-10 max-w-7xl">
        <h1 className="mb-1 text-4xl font-extrabold leading-none text-gray-900 lg:text-5xl xl:text-6xl sm:mb-3"><a href="#_">Your bookings</a></h1>
        <div className="flex grid h-full grid-cols-12 gap-10 pb-10 mt-8 sm:mt-16">
          <div className="grid grid-cols-12 col-span-12 gap-7">
            {booking && booking.map((item, index) =>
              <>
                <div className="flex flex-col items-start col-span-12 overflow-hidden cursor-pointer shadow-xl rounded-xl md:col-span-6 lg:col-span-4">
                  <BookingCard key={index} booking={item} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default UserBookings