import React from 'react';
import { Spinner } from 'react-bootstrap';
import '../../App.css';

export const AppSpinner = () => {
  return (
    <div className="spinner-container">
      <Spinner animation="border" role="status" className="spinner">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};
