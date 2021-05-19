import React, { useState } from 'react'
import PropTypes from 'prop-types'
import TopNav from '../TopNav'
import { Layout } from 'antd'

import Footer from '../Footer'

const MainLayout = ({ children }) => {
  const mainContent = window.innerHeight - 200
  return (
    <div className="w-full h-screen font-sans no-underline">
      <div className="w-full">
        <TopNav />
      </div>
      <div style={{ minHeight: mainContent }}>{children}</div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default MainLayout

MainLayout.propTypes = {
  children: PropTypes.element
}
