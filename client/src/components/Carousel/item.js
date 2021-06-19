import React from 'react'

const Item = (props) => {
    const {url} = props
    return (
        <div>
          <img className="" src={url} />
        </div>
    )
}

export default Item
