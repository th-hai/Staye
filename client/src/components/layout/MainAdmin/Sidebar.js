import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { faHome, faUser, faBook } from '@fortawesome/free-solid-svg-icons';
import { MENU_ITEMS } from './constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
const Sidebar = ({ user }) => {
  const mapTitleToIcon = {
    rooms: faHome,
    bookings: faBook,
    users: faUser,
  };

  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <div className="flex flex-col w-64 py-8 bg-white border-r min-h-screen">
      <div className="flex flex-col items-center mt-6 -mx-2">
        <img
          className="object-cover w-24 h-24 mx-2 rounded-full"
          src={user?.avatar[0]}
          alt="avatar"
        />
        <h4 className="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200 hover:underline">
          {user?.name}
        </h4>
        <p className="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400 hover:underline">
          {user?.email}
        </p>
      </div>

      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav>
          {MENU_ITEMS.map((item) => (
            <Link
              className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700"
              to={item.link}
            >
              <FontAwesomeIcon
                className="w-5 h-5"
                icon={mapTitleToIcon[item.id]}
              ></FontAwesomeIcon>

              <span className="mx-4 font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};
Sidebar.propTypes = {
  user: PropTypes.object,
};

export default Sidebar;
