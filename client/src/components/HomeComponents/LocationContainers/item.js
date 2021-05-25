import React from 'react'

const Item = (props) => {
    const {location} = props
    return (
        <a href="/">
        <div
          class="bg-cover bg-center w-full h-full text-white  object-fill relative"
         style={{
            backgroundImage: `url(${location.avatarUrl})`,
          }}
        >
          <div className="bg-gradient-to-b from-transparent via-transparent to-black h-full">
              <div class="md:w-1/2 absolute bottom-4 pl-8">
                <div class="text-2xl w-40 mb-2">{location.headerTitle}</div>           
                <span class="w-full">
                  {location.accommodationTitle}
                </span>
                <span className="ml-2 mb-10 font-light">Accommodations</span>
              </div>
          </div>
        </div>
    </a>
    )
}

export default Item
