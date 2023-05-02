import React from 'react';
import AuthForm from './AuthForm';
const login = () => {
  return (
    <div className="w-100 p-2 mx-2">
      <p className="text-center fs-2 mb-5">Login </p>
      <AuthForm type={'LOGIN'} />
    </div>
  );
};

export default login;
