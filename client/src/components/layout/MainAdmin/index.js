import React from 'react';
import PropTypes from 'prop-types';
import TopNav from './TopNav';
import Sidebar from './Sidebar';

const MainAdmin = ({ children, user }) => {
  return (
    <div className="w-full h-screen font-sans">
      <TopNav style={{ width: '100%', height: '60px'}} user={user} />

      <div className="flex ">
        <Sidebar user={user} />

        <div className="content-area  w-full ">{children}</div>
      </div>
    </div>
  );
};

export default MainAdmin;

MainAdmin.propTypes = {
  children: PropTypes.element,
  user: PropTypes.object,
};
