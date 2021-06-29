import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Button } from 'antd';
import logo from 'assets/Logo.svg';
import { Link, useLocation } from 'react-router-dom';
import { faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { logout } from 'containers/App/actions';
import { bindActionCreators } from 'redux';
import { showRoomModal } from 'containers/RoomList/actions';
import ConfirmDialog from 'components/Modal/ConfirmDialog';
import UserModal from './UserModal';
const TopNav = ({ user, handleLogout, showRoomModal, updateUser }) => {
  const location = useLocation();
  const menu = (
    <Menu className="">
      <Menu.Item>
        <Link to="/" onClick={handleLogout} className="text-base">
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
          Log out
        </Link>
      </Menu.Item>
    </Menu>
  );
  const [modalState, setModalState] = useState({
    visible: false,
    mode: undefined,
    myError: null,
  });
  const [confirmState] = useState({
    visible: false,
  });
  useEffect(() => {
    console.log(location.search);
  }, [user]);
  return (
    <>
      <ConfirmDialog {...confirmState} />
      <UserModal
        user={modalState.user}
        showRoomModal={showRoomModal}
        setModalState={setModalState}
        updateUser={updateUser}
      />
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container px-6 py-4 mx-auto">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex items-center justify-between">
              <div className="text-xl font-semibold text-gray-700">
                <Link
                  to="/"
                  className="flex items-center mb-4 font-medium text-gray-900 title-font md:mb-0 mr-4"
                >
                  <img alt="" src={logo} className="w-24 mr-12" />
                </Link>
              </div>

              <div className="flex md:hidden">
                <button
                  type="button"
                  className="text-gray-200 hover:text-gray-400 focus:outline-none focus:text-gray-400"
                  aria-label="toggle menu"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path
                      fill-rule="evenodd"
                      d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex-1 md:flex md:items-center md:justify-between">
              <div className="flex flex-col -mx-4 md:flex-row md:items-center md:mx-8">
                <div
                  href="#"
                  className="px-2 py-1 mx-2 mt-2 text-sm font-medium  transition-colors duration-200 transform rounded-md md:mt-0 text-gray-200 hover:bg-gray-700"
                ></div>
                <div
                  href="#"
                  className="px-2 py-1 mx-2 mt-2 text-sm font-medium  transition-colors duration-200 transform rounded-md md:mt-0 text-gray-200 hover:bg-gray-700"
                ></div>
                <div
                  href="#"
                  className="px-2 py-1 mx-2 mt-2 text-sm font-medium  transition-colors duration-200 transform rounded-md md:mt-0 text-gray-200 hover:bg-gray-700"
                ></div>
                <div
                  href="#"
                  className="px-2 py-1 mx-2 mt-2 text-sm font-medium  transition-colors duration-200 transform rounded-md md:mt-0 text-gray-200 hover:bg-gray-700"
                ></div>
              </div>

              <div className="flex items-center mt-4 md:mt-0">
                <button
                  className="hidden mx-4 text-gray-600 md:block dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none"
                  aria-label="show notifications"
                >
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>

                <button className="flex items-center focus:outline-none">
                  <Dropdown
                    overlay={menu}
                    className="focus:border-none focus:outline-none"
                  >
                    <Button className="focus:border-none focus:outline-none border-none outline-none">
                      <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                        <img
                          src={user?.avatar}
                          className="object-cover w-full h-full"
                          alt="avatar"
                        />
                      </div>
                    </Button>
                  </Dropdown>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
TopNav.propTypes = {
  user: PropTypes.object,
  showRoomModal: PropTypes.func,
  handleLogout: PropTypes.func,
  updateUser: PropTypes.func,
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      showRoomModal,
      handleLogout: logout,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(TopNav);
