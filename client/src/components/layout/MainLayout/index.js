import React, { useState } from 'react'
import PropTypes from 'prop-types'
import TopNav from '../TopNav'
import { Layout } from 'antd'

import Footer from '../Footer'

const MainLayout = ({ children, user, role }) => {
  return (
    <div className="w-full h-screen font-sans no-underline">
      <>
        <TopNav user={user} role={role} />
      </>
      <div className="content-area bg-white ">{children}</div>
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
  role: PropTypes.string
}
