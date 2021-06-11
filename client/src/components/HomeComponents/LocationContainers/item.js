import React from 'react'

const Item = (props) => {
    const {location} = props
    return (
        <a href="/" >
        <div
          className="bg-cover bg-center w-full h-80 text-white  object-fill relative rounded-md"
         style={{
            backgroundImage: `url(${location.thumbnail})`,
          }}
        >
          <div className="bg-gradient-to-b from-transparent via-transparent to-black h-full rounded-md">
              <div className="md:w-1/2 absolute bottom-4 pl-8">
                <div className="text-2xl w-40 mb-2 font-bold">{location.location}</div>           
                <span className="w-full font-semibold">
                  {location.totalRooms}
                </span>
                <span className="ml-2 mb-10 font-light">Accommodations</span>
              </div>
          </div>
        </div>
    </a>
    )
}

export default Item
