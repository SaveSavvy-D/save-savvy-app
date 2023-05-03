import React from 'react';
import AuthForm from './AuthForm';
const login = () => {
  return (
    <div className='d-flex flex-column justify-content-center w-100 p-3'>
      <p className='text-center fs-2 mb-5 text-info'>Login </p>
      <AuthForm type={'LOGIN'} />
    </div>
  );
};

export default login;
