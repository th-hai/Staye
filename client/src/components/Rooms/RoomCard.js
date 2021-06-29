import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from 'utils/formatCurrency';
const RoomCard = ({ room }) => {
  return (
    <div className=" py-6 px-3">
      <Link to={`/rooms/${room.id}`}>
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div
            className="bg-cover bg-center h-56 p-4"
            style={{
              backgroundImage: `url(${
                room.photos
                  ? room.photos[0]
                  : 'https://via.placeholder.com/450x450)'
              }`,
            }}
          ></div>
          <div className="p-4 h-32">
            <div className="tracking-wide text-lg font-bold text-gray-700 truncate h-30">
              {room.name}
            </div>
            <div className="text-gray-600">
              Phòng {room.maximumGuests} người
            </div>
            <div className="text-lg font-bold text-gray-900">
              {formatCurrency(room.price)}đ/đêm
            </div>
            <div className="text-gray-700">{room.address}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RoomCard;
