import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useEffect } from 'react';
import { AuthSchema } from '../../../utils/yup/schemas';
import { login, signup } from '../../../store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ type }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authSuccess } = useSelector((state) => state.user);
  useEffect(() => {
    console.log('In use Effect');
    if (authSuccess) navigate('/');
  }, [authSuccess]);

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
          <Form className="d-flex flex-column gap-3 h-full w-100">
            <div className="h-full w-full">
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="px-3 py-3 rounded border w-100 bg-light"
              />
              <ErrorMessage name="email" />
            </div>
            <div>
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="px-3 py-3 rounded border  w-100 bg-light"
              />
              <ErrorMessage name="password" />
            </div>
            <div className="d-flex justify-content-center w-100">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-success text-white rounded border border-2 py-2 px-5 w-100"
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
