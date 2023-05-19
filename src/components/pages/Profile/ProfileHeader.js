import React, { useState } from 'react';

const ProfileHeader = ({ selection }) => {
  const [showSelected, setShowSelected] = useState(true);
  return (
    <div className='d-flex w-100'>
      <div className='col-6'>
        <button
          className={`w-100 btn-green text-white border-0 ${
            showSelected ? 'p-2' : 'p-1'
          }`}
          onClick={() => {
            setShowSelected(true);
            selection(true);
          }}
        >
          Show
        </button>
      </div>
      <div className='col-6'>
        <button
          className={`w-100 btn-green text-white border-0 ${
            showSelected ? 'p-1' : 'p-2'
          }`}
          onClick={() => {
            setShowSelected(false);
            selection(false);
          }}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
