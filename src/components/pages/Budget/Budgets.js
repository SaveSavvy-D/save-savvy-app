import React, { useState, useEffect } from 'react';
import { BudgetTable } from './BudgetTable';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import { BudgetForm } from './BudgetForm';
import { fetchCategories } from '../../../store/categorySlice';
import { fetchBudgets } from '../../../store/budgetSlice';
import { STATUSES } from '../../../constants/statuses';
import { AppSpinner } from '../../common/AppSpinner';
import { showAllNotifications } from '../../../utils/notificationHelper';
import ToastColors from '../../../constants/toastColors';

export const Budgets = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchBudgets());
  }, []);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const { status: categoryStatus, errors } = useSelector(
    (state) => state.category
  );

  if (categoryStatus === STATUSES.LOADING) {
    return <AppSpinner />;
  }
  if (categoryStatus === STATUSES.ERROR) {
    const errorArray = errors.map((error) => error.msg);
    showAllNotifications(errorArray, ToastColors.error);
  }

  return (
    <Container>
      <div className='page-header-row'>
        <h2>
          <FontAwesomeIcon icon={faPenToSquare} className='margin-right-5' />
          Budgets
        </h2>
        <Button
          variant='success'
          className='bg-color-green'
          onClick={handleShowModal}
        >
          + Add Budget
        </Button>
      </div>
      <Modal
        show={showModal}
        onHide={() => handleCloseModal()}
        backdrop='static'
      >
        <BudgetForm
          showModal={handleShowModal}
          handleCloseModal={handleCloseModal}
          create={true}
          setCurrentPage={setCurrentPage}
        />
      </Modal>
      <BudgetTable currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </Container>
  );
};
