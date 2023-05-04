import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useEffect } from 'react';
import { AuthSchema } from '../../../utils/yup/schemas';
import { login, signup } from '../../../store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AuthForm = ({ type }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authSuccess, authErrors } = useSelector((state) => state.user);
  useEffect(() => {
    if (authSuccess) navigate('/');
    if (authErrors) console.log(authErrors);
  }, [authSuccess, authErrors]);

  const onSubmit = (creds, { setSubmitting, resetForm }) => {
    type === 'LOGIN' ? dispatch(login(creds)) : dispatch(signup(creds));
    setSubmitting(false);
    resetForm();
    console.log('Auth form submitted');
  };
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={AuthSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => {
        return (
          <Form className='d-flex flex-column gap-3 h-full w-100'>
            <ErrorMessage
              name='email'
              className='text-danger'
              component='div'
            />
            <div className='d-flex align-items-center h-full w-full px-3 py-3 rounded border w-100 bg-light'>
              <FontAwesomeIcon icon={faEnvelope} />
              <Field
                type='email'
                name='email'
                placeholder='Email'
                className='border border-0 bg-transparent w-100 mx-2 input'
              />
            </div>

            <ErrorMessage
              name='password'
              className='text-danger'
              component='div'
            />

            <div className='d-flex align-items-center h-full w-full px-3 py-3 rounded border w-100 bg-light'>
              <FontAwesomeIcon icon={faLock} />
              <Field
                type='password'
                name='password'
                placeholder='Password'
                className='border border-0 bg-transparent w-100 mx-2 input'
              />
            </div>

            <div className='d-flex justify-content-center w-100'>
              <button
                type='submit'
                disabled={isSubmitting}
                className={`${
                  type === 'LOGIN' ? 'bg-info' : 'bg-success'
                } text-white rounded border border-0 py-2 px-5 w-100 mt-2`}
              >
                {type}
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AuthForm;
