import React from 'react';
import Login from './Login';
import Register from './Register';
import BackgroundImg from '../../../images/auth-bg2.jpeg';
import { useSelector } from 'react-redux';
import Spinner from '../../common/Spinner';

const Authentication = () => {
  const { status } = useSelector((state) => state.user);

  return (
    <div>
      {status === 'loading' ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <div className='d-flex justify-content-center align-items-center container-fluid vh-100 w-100 position-relative'>
          <img
            src={BackgroundImg}
            className='object-fit-fill position-absolute z-index-1'
            alt=''
          />
          <div className='position-absolute container-fluid h-100 bg-black z-index-2 opacity-8'></div>
          <div className='d-flex flex-row justify-content-center align-items-center z-index-3 bg-white opacity-8 p-3 w-50 py-4 rounded'>
            <Register />
            <Login />
          </div>
        </div>
      )}
    </div>
  );
};

export default Authentication;
