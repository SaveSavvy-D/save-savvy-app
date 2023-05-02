import React, { useState, useEffect } from 'react';
import { BudgetTable } from './BudgetTable';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { BudgetForm } from './BudgetForm';
import '../../../App.css';
import { fetchCategories } from '../../../store/categorySlice';

export const Budgets = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const { data: categories, status } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container>
      <div className="page-header-row">
        <h2>
          <FontAwesomeIcon icon={faPenToSquare} className="margin-right-5" />
          Budgets
        </h2>
        <Button
          variant="success"
          className="bg-color-green"
          onClick={handleShowModal}
        >
          + Add Budget
        </Button>
      </div>
      <Modal
        show={showModal}
        onHide={() => handleCloseModal()}
        backdrop="static"
      >
        <BudgetForm
          showModal={handleShowModal}
          handleCloseModal={handleCloseModal}
          categories={categories?.data?.categories}
          create={true}
        />
      </Modal>
      <BudgetTable />
    </Container>
  );
};
