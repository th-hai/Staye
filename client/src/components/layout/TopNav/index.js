import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from 'containers/App/actions';
import FilterRooms from 'components/HomeComponents/FilterRooms';
const TopNav = ({ user, handleLogout }) => {
  return (
    <div class="w-full text-gray-700 bg-white border-t border-gray-100 shadow-sm body-font sticky top-0 z-50">
      <div class="container flex flex-col items-start justify-between px-6 pt-6 mx-auto md:flex-row h-16">
        <a class="flex items-center mb-4 font-medium text-gray-900 title-font md:mb-0">
          <img className="w-24" />
        </a>
        <div class="flex flex-wrap items-center justify-centertext-base border-l border-gray-200 md:mr-auto">
         
          <FilterRooms/>
        </div>
        <div class="items-center h-full">
          {user ? (
            <Link
              to="/profile"
              class="mr-5 font-medium text-gray-600 hover:text-gray-900 text-black  no-underline"
            >
              Hello {user.name}!
            </Link>
          ) : (
            <Link
              to="/login"
              class="mr-5 font-medium text-gray-600 hover:text-gray-900 text-black  no-underline"
            >
              Login
            </Link>
          )}
          {user ? (
            <Link
              onClick={handleLogout}
              class="px-4 py-2 text-xs font-bold text-white uppercase transition-all duration-150 bg-green-400 rounded shadow outline-none active:bg-teal-600 hover:shadow-md focus:outline-none ease no-underline"
            >
              Log out
            </Link>
          ) : (
            <Link
              to="/register"
              class="px-4 py-2 text-xs font-bold text-white uppercase transition-all duration-150 bg-green-400 rounded shadow outline-none active:bg-teal-600 hover:shadow-md focus:outline-none ease no-underline"
            >
              Sign Up
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

TopNav.propTypes = {
  user: PropTypes.object,
  handleLogout: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    handleLogout: () => dispatch(logout()),
  };
}
export default connect(null, mapDispatchToProps)(TopNav);
