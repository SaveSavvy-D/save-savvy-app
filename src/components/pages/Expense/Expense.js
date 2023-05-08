import { Modal, Button } from 'react-bootstrap';
import React, { useState } from 'react';

import { ExpenseForm } from './ExpenseForm';

export const Expense = ({ index, expense, currentPage, setCurrentPage }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <tr>
        <td>{index + 1 + (currentPage - 1) * 5}</td>
        <td>{expense?.title}</td>
        <td>{expense?.amount}</td>
        <td>{expense?.date.substring(0, 10)}</td>
        <td>{expense?.category?.title}</td>
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
        <ExpenseForm
          expense={expense}
          showModal={handleShowModal}
          handleCloseModal={handleCloseModal}
          create={false}
          setCurrentPage={setCurrentPage}
        />
      </Modal>
    </>
  );
};
