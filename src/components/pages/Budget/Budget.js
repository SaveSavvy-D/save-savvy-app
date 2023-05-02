import { Modal, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { BudgetForm } from './BudgetForm';

export const Budget = ({ index, budget, currentPage, categories }) => {
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
        <td>{index + 1 + (currentPage.current - 1) * 5}</td>
        <td>{budget?.categoryId.title}</td>
        <td>{budget?.threshold}</td>
        <td>{budget?.startDate.substring(0, 10)}</td>
        <td>{budget?.endDate.substring(0, 10)}</td>
        <td>
          <Button variant="link" onClick={handleShowModal}>
            View
          </Button>
        </td>
      </tr>
      <Modal
        show={showModal}
        onHide={() => handleCloseModal()}
        backdrop="static"
      >
        <BudgetForm
          budget={budget}
          showModal={handleShowModal}
          handleCloseModal={handleCloseModal}
          categories={categories}
        />
      </Modal>
    </>
  );
};
