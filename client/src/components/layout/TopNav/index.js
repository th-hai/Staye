import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from 'containers/App/actions';
import FilterRooms from 'components/HomeComponents/FilterRooms';
import {
  faSignOutAlt,
  faClipboard,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from 'assets/Logo.svg';
const TopNav = ({ user, handleLogout, role }) => {
  const isAdmin = role === 'admin' ? true : false;
  const handleClickLogin = () => {
    return <Redirect to="/login" />;
  };
  return (
    // <div className="w-full text-gray-700 bg-white border-t border-gray-100 shadow-sm body-font sticky top-0 z-50">
    //   <div className="container flex flex-col items-center justify-between px-6 mx-auto md:flex-row h-16">
    //     <Link to="/"
    //       className="flex items-center mb-4 font-medium text-gray-900 title-font md:mb-0 mr-4">
    //        <img alt="" src={logo} className="w-24 mr-12" />
    //     </Link>

    //     <div className="flex flex-wrap items-center border-gray-700 md:mr-auto">
    //       <FilterRooms />
    //     </div>
    //     <div className="flex items-center h-full">

    //     </div>
    //   </div>
    // </div>

    <div class="navbar mb-2 shadow-lg bg-base-200 text-base-content sticky top-0 z-50">
      <div class="px-2 mx-2 lg:flex-none flex-1">
        <Link className="flex items-center" to="/">
          <img alt="" src={logo} className="w-24 mr-12 " />
        </Link>

        <FilterRooms />
      </div>
      <div class="justify-center hidden px-2 mx-2 lg:flex flex-1">
        <div class="flex items-stretch"></div>
      </div>
      <div class="px-2 mx-2 lg:flex-none flex-1">
        {user ? (
          <div class="dropdown dropdown-end dropdown-hover text-primary-content">
            <div tabindex="0" class="flex text-primary-content text-lg">
              {isAdmin ? (
                <>
                  <div className="capitalize flex">
                    Hello,
                    <div className="ml-1 lowercase">
                      {user.name}
                      {'!'}
                    </div>
                    <div class="badge badge-warning  uppercase ml-2">admin</div>{' '}
                  </div>
                </>
              ) : (
                <>
                  <div className="capitalize flex">
                    Hello,
                    <div className="ml-1 lowercase">
                      {user.name}
                      {'!'}
                    </div>
                    <div class="badge badge-success  uppercase ml-2">user</div>{' '}
                  </div>
                </>
              )}{' '}
            </div>
            <ul class="shadow menu dropdown-content bg-base-100 rounded-box w-42">
              {isAdmin ? (
                <li>
                  <Link to="/admin/dashboard" className="uppercase">
                    {' '}
                    <FontAwesomeIcon
                      icon={faClipboard}
                      size="lg"
                      className="mr-2"
                    />
                    Dashboard
                  </Link>
                </li>
              ) : (
                ''
              )}
              <li>
                <Link to={`/profile/${user?.id}`} className="uppercase">
                  {' '}
                  <FontAwesomeIcon icon={faEdit} size="lg" className="mr-2" />
                  Edit profile
                </Link>
              </li>
              <li>
                <Link to="/" onClick={handleLogout} className="uppercase">
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    size="lg"
                    className="mr-2"
                  />
                  Log out
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <button className="btn btn-outline btn-sm md:btn-md lg:btn-lg xl:btn-sm w-28 border-none hover:text-white p-0">
            <Link
              to="/login"
              className="text-black flex justify-center items-center hover:text-white w-full h-full"
            >
              Login
            </Link>
          </button>
        )}
        {user ? (
          ''
        ) : (
          <button className="btn btn-success btn-sm md:btn-md lg:btn-lg xl:btn-sm w-28 ml-4">
            <Link to="/register" className="text-white">
              Register
            </Link>
          </button>
        )}
      </div>

      <div class="">
        {/* {user ? (
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
            className="btn btn-success btn-xs md:btn-sm lg:btn-sm xl:btn-sm"
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
        )} */}
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
