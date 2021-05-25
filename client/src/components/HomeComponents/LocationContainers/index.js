import React from 'react'
import Item from './item'
const LocationContainers = (props) => {
  const { locations } = props
    return (
      <div className="w-full h-screen flex justify-center">
   
      <div className="grid grid-cols-6  w-full  h-2/5 gap-4">
        {locations && locations.map((location) => <Item location={location} />)}
      </div>
    </div>
    )
}

export default LocationContainers
