import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TopNav from './TopNav';
import Sidebar from './Sidebar';

const MainAdmin = ({ children }) => {
  return (
    <div className="w-full h-screen font-sans no-underline ">
      <TopNav style={{ width: '100%', height: '60px' }} />

      <div className="flex ">
        <Sidebar/>

        <div className="content-area  w-full ">{children}</div>
      </div>
    </div>
  );
};

export default MainAdmin;

MainAdmin.propTypes = {
  children: PropTypes.element,
};
