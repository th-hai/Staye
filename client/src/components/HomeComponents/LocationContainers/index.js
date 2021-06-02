import React from 'react';
import Item from './item';
const LocationContainers = (props) => {
  const { locations } = props;
  return (
      <div className="w-full flex justify-center">
        <div className="grid lg:grid-cols-6 sm:grid-cols-3  w-full  gap-4">
          {locations &&
            locations.map((location) => <Item location={location} />)}
        </div>
      </div>
  );
};

export default LocationContainers;
