import React from 'react';
import AuthForm from './AuthForm';

const Register = () => {
  return (
    <div className="d-flex flex-column justify-content-center w-100 p-2 mx-2">
      <p className="text-center fs-2 mb-5">Register </p>
      <AuthForm type={'REGISTER'} />
    </div>
  );
};

export default Register;
