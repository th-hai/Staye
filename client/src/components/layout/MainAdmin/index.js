import React, { useState } from 'react'
import PropTypes from 'prop-types'

const MainAdmin = ({ children }) => {
  return (
    <div className="w-full h-screen font-sans no-underline">
      <div className="content-area min-h-screen">{children}</div>
    </div>
  )
}

export default MainAdmin

MainAdmin.propTypes = {
  children: PropTypes.element
}
