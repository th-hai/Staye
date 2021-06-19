import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from 'containers/App/actions';
import FilterRooms from 'components/HomeComponents/FilterRooms';
import logo from 'assets/Logo.svg';
const TopNav = ({ user, handleLogout, role }) => {
  const isAdmin = role === 'admin' ? true : false;
  return (
    <div className="w-full text-gray-700 bg-white border-t border-gray-100 shadow-sm body-font sticky top-0 z-50">
      <div className="container flex flex-col items-center justify-between px-6 mx-auto md:flex-row h-16">
        <Link to="/"
          className="flex items-center mb-4 font-medium text-gray-900 title-font md:mb-0 mr-4">
           <img alt="" src={logo} className="w-24 mr-12" />
        </Link>
         
        <div className="flex flex-wrap items-center border-gray-700 md:mr-auto">
          <FilterRooms />
        </div>
        <div className="flex items-center h-full">
          {user ? (
            isAdmin ? (
              <Link
                to="/admin/dashboard"
                className="mr-5 font-medium text-gray-600 hover:text-gray-900 text-black  no-underline"
              >
                Hello {user.name} - Admin!
              </Link>
            ) : (
              <Link
                to="/profile"
                className="mr-5 font-medium text-gray-600 hover:text-gray-900 text-black  no-underline"
              >
                Hello {user.name}!
              </Link>
            )
          ) : (
            <Link
              to="/login"
              className="mr-5 font-medium text-gray-600 hover:text-gray-900 text-black  no-underline"
            >
              Login
            </Link>
          )}
          {user ? (
            <Link
              onClick={handleLogout}
              className="px-4 py-2 text-xs font-bold text-white uppercase transition-all duration-150 bg-green-400 rounded shadow outline-none active:bg-teal-600 hover:shadow-md focus:outline-none ease no-underline"
            >
              Log out
            </Link>
          ) : (
            <Link
              to="/register"
              className="px-4 py-2 text-xs font-bold text-white uppercase transition-all duration-150 bg-green-400 rounded shadow outline-none active:bg-teal-600 hover:shadow-md focus:outline-none ease no-underline"
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
  role: PropTypes.string,
};

function mapDispatchToProps(dispatch) {
  return {
    handleLogout: () => dispatch(logout()),
  };
}
export default connect(null, mapDispatchToProps)(TopNav);
