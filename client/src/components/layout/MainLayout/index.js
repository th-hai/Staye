import React, { useState } from 'react'
import PropTypes from 'prop-types'
import TopNav from '../TopNav'
import { Layout } from 'antd'

import Footer from '../Footer'

const MainLayout = ({ children }) => {
  const mainContent = window.innerHeight - 160
  return (
    <div className="w-full h-screen font-sans no-underline">
      <div className="w-full">
        <TopNav />
      </div>
      <div className="content-area min-h-screen">{children}</div>
      <>
        <Footer />
      </>
    </div>
  )
}

export default MainLayout

MainLayout.propTypes = {
  children: PropTypes.element
}
