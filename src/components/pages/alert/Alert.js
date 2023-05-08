import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { AlertForm } from './AlertForm';

export const Alert = ({ index, alert, currentPage, setCurrentPage }) => {
  console.log(alert);
  const [showAlertModal, setShowAlertModal] = useState(false);

  const handleShowAlert = () => {
    setShowAlertModal(true);
  };
  const handleCloseAlert = () => {
    setShowAlertModal(false);
  };
  return (
    <>
      <tr>
        <td>{index + 1 + (currentPage - 1) * 5}</td>
        <td>{alert?.title}</td>
        <td>{alert?.thresholdPercentage}</td>
        <td>{alert?.date.substring(0, 10)}</td>
        <td>
          <Button variant='link' onClick={handleShowAlert}>
            View
          </Button>
        </td>
      </tr>

      <AlertForm
        showModal={showAlertModal}
        budgetId={alert.budgetId}
        alert={alert}
        create={false}
        handleCloseModal={handleCloseAlert}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};
