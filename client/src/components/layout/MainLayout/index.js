import React, { useState } from 'react'
import PropTypes from 'prop-types'
import TopNav from '../TopNav'
import { Layout } from 'antd'

import Footer from '../Footer'

const MainLayout = ({ children, user }) => {
  return (
    <div className="w-full h-screen font-sans no-underline">
      <div className="w-full">
        <TopNav user={user} />
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
  children: PropTypes.element,
  user: PropTypes.object,
}
