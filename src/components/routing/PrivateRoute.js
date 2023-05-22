import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AppSpinner } from '../common/AppSpinner';

const PrivateRoute = ({ component: Component }) => {
  const { authSuccess, status } = useSelector((state) => state.user);
  useEffect(() => {
    console.log(authSuccess);
  }, []);
  if (status === 'loading') return <AppSpinner />;
  if (authSuccess) return <Component />;
  if (!authSuccess) return <Navigate to='/auth' />;
};

export default PrivateRoute;
