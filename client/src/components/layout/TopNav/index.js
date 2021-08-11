import React from 'react';
import { Link } from 'react-router-dom';
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
  return (

    <div className="navbar shadow-2xl bg-base-200 text-base-content sticky top-0 z-50">
      <div className="px-2 mx-2 lg:flex-none flex-1">
        <Link className="flex items-center" to="/">
          <img alt="" src={logo} className="w-24 mr-12 " />
        </Link>

        <FilterRooms />
      </div>
      <div className="justify-center hidden px-2 mx-2 lg:flex flex-1">
        <div className="flex items-stretch"></div>
      </div>
      <div className="px-2 mx-2 lg:flex-none flex-1">
        {user ? (
          <div className="dropdown dropdown-hover text-primary-content">
            <div tabIndex="0" className="flex text-primary-content text-lg">
              {isAdmin ? (
                <>
                  <div className="capitalize flex">
                    Hello,
                    <div className="ml-1 lowercase">
                      {user.name}
                      {'!'}
                    </div>
                    <div className="badge badge-warning  uppercase ml-2">admin</div>{' '}
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
                    <div className="badge badge-success  uppercase ml-2">user</div>{' '}
                  </div>
                </>
              )}{' '}
            </div>
            <ul className="shadow menu dropdown-content bg-base-100 rounded-box w-42">
              {isAdmin ? (
                <li className="w-44">
                  <Link to="/admin/rooms">
                    {' '}
                    <FontAwesomeIcon
                      icon={faClipboard}
                      size="lg"
                      className="w-8 -ml-2 mr-2"
                    />
                    Dashboard
                  </Link>
                </li>
              ) : (
                ''
              )}
              <li>
                <Link to={`/profile/${user?.id}`} >
                  {' '}
                  <FontAwesomeIcon icon={faEdit} size="lg" className="w-8 -ml-1 mr-1" />
                  Edit Profile
                </Link>
              </li>
              <li>
                <Link to="/" onClick={handleLogout}>
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    size="lg"
                    className="w-8 -ml-1 mr-1"
                  />
                  Log Out
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
