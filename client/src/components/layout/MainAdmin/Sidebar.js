import React from 'react';
import { faHome, faUser, faBook } from '@fortawesome/free-solid-svg-icons';
import { MENU_ITEMS } from './constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
const Sidebar = () => {
  const mapTitleToIcon = {
    rooms: faHome,
    bookings: faBook,
    users: faUser,
  };
  return (
    <div class="flex flex-col w-64 h-screen py-8 bg-white border-r dark:bg-gray-800 dark:border-gray-600">
      <h2 class="text-3xl font-semibold text-center text-gray-800 dark:text-white">
        Brand
      </h2>

      <div class="flex flex-col items-center mt-6 -mx-2">
        <img
          class="object-cover w-24 h-24 mx-2 rounded-full"
          src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
          alt="avatar"
        />
        <h4 class="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200 hover:underline">
          John Doe
        </h4>
        <p class="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400 hover:underline">
          john@example.com
        </p>
      </div>

      <div class="flex flex-col justify-between flex-1 mt-6">
        <nav>
          {MENU_ITEMS.map((item) => (
            <Link
              class="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700"
              to={item.link}
            >
              <FontAwesomeIcon
                class="w-5 h-5"
                icon={mapTitleToIcon[item.id]}
              ></FontAwesomeIcon>

              <span class="mx-4 font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
