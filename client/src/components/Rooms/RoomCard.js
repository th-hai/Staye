import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from 'utils/formatCurrency';
import {
 faMapMarkerAlt,
 faMale
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const RoomCard = ({ room }) => {
  return (
    <div className=" py-6 px-3">
      <Link to={`/rooms/${room.id}`}>
        <div className="bg-white shadow-xl rounded-lg overflow-hidden p-4">
          <div
            className="bg-cover bg-center h-40 rounded-xl"
            style={{
              backgroundImage: `url(${
                room.photos
                  ? room.photos[0]
                  : 'https://via.placeholder.com/450x450)'
              }`,
            }}
          ></div>
          <div className="p-4 h-32">
            <div className="tracking-wide text-lg font-bold text-gray-800 truncate h-30">
              {room.name}
            </div>
            <div className="text-gray-600 flex items-center">
            <FontAwesomeIcon icon={faMale} color={'#0F52BA'} className="mr-3" />
              {room.maximumGuests} people
            </div>
            <div className="flex flex-row items-center my-2">
            <FontAwesomeIcon icon={faMapMarkerAlt} color={'#0F52BA'} />
            <div className="text-gray-700 truncate ml-2">{room.address}</div>
            </div>
            <div className="text-lg font-bold text-gray-900 flex">
              {formatCurrency(room.price)} <div className="font-normal ml-1 text-gray-600">đ/night</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RoomCard;
