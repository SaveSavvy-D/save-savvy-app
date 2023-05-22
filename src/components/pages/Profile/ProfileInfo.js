import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProfile } from '../../../store/profileSlice';

const ProfileInfo = () => {
  const { profile } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  return (
    <div className='d-flex flex-column'>
      <div className='d-flex flex-column bg-light-grey mt-4 pb-4'>
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
                      <td>{earningDetails.date} </td>
                    </tr>
                  ))}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='d-flex justify-content-end mb-4'>
        <button
          onClick={() => dispatch(deleteProfile())}
          className='bg-light-red border-0 mt-5 text-white  mb-2  py-2 px-5 rounded'
        >
          Delete Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
