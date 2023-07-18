import { Modal, Button } from 'react-bootstrap';
import React, { useState } from 'react';

import { BudgetForm } from './BudgetForm';
import { AlertForm } from '../alert/AlertForm';
import { useNavigate } from 'react-router-dom';

export const Budget = ({ index, budget, currentPage, setCurrentPage }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleShowAlert = () => {
    setShowAlertModal(true);
  };
  const handleCloseAlert = () => {
    setShowAlertModal(false);
  };

  function handleButtonClick(budgetId) {
    navigate(`/budgets/${budgetId}/alerts`);
  }

  return (
    <>
      <tr>
        <td>{index + 1 + (currentPage - 1) * 5}</td>
        <td>{budget?.categoryId.title}</td>
        <td>{budget?.threshold}</td>
        <td>{budget?.month.substring(0, 10)}</td>
        <td>
          <Button variant='link' onClick={handleShowAlert}>
            Add
          </Button>
        </td>
        <td>
          <Button variant='link' onClick={() => handleButtonClick(budget?._id)}>
            Alerts
          </Button>
        </td>
        <td>
          <Button variant='link' onClick={handleShowModal}>
            View
          </Button>
        </td>
      </tr>
      <Modal
        show={showModal}
        onHide={() => handleCloseModal()}
        backdrop='static'
      >
        <BudgetForm
          budget={budget}
          showModal={handleShowModal}
          handleCloseModal={handleCloseModal}
          create={false}
          setCurrentPage={setCurrentPage}
        />
      </Modal>
      <AlertForm
        showModal={showAlertModal}
        budgetId={budget._id}
        create={true}
        handleCloseModal={handleCloseAlert}
      />
    </>
  );
};
