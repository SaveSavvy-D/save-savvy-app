import React from 'react';
import { useSelector } from 'react-redux';

const ProfileInfo = () => {
  const { profile } = useSelector((state) => state.profile);
  return (
    <div className='d-flex flex-column'>
      <div className='w-100 pt-5 ps-3 bg-gray border-bottom border-success border-4 bold'>
        <p className='fs-2 text-success'>Profile Details</p>
      </div>
      <div className='d-flex flex-column gap-2 container w-100 pt-5 pb-3 ps-3 fs-5'>
        <div className='d-flex w-100'>
          <p className='w-25'>Name</p>
          <p className='w-75'>{profile.name}</p>
        </div>
        <div className='d-flex w-100'>
          <p className='w-25'>Currency</p>
          <p className='w-75'>{profile.currency}</p>
        </div>
        <div>
          <div className='d-flex'>
            <p className='w-25'>Earning Details</p>
            <div className=' d-flex justify-content-center w-75'>
              <table className='earning-details-table d-flex flex-column w-100 bg-white shadow fs-6'>
                <tr>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
                {profile.earningDetails.map((earningDetails) => (
                  <tr>
                    <td>{earningDetails.amount}</td>
                    <td>{earningDetails.month.substring(0, 10)} </td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
