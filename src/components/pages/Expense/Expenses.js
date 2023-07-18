import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { Button, Container, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { ExpenseTable } from './ExpenseTable';
import { ExpenseForm } from './ExpenseForm';
import { useEffect } from 'react';
import { fetchCategories } from '../../../store/categorySlice';
import { fetchExpenses } from '../../../store/expenseSlice';
import { AppSpinner } from '../../common/AppSpinner';
import { showAllNotifications } from '../../../utils/notificationHelper';
import ToastColors from '../../../constants/toastColors';
import { STATUSES } from '../../../constants/statuses';
import { fetchProfile } from '../../../store/profileSlice';
import ProfileCreateButton from '../Profile/ProfileCreateButton';

export const Expenses = () => {
  const [expenseModal, setExpenseModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchExpenses());
    dispatch(fetchProfile());
  }, []);

  const handleClose = () => setExpenseModal(false);
  const handleShow = () => setExpenseModal(true);

  const { status: categoryStatus, errors } = useSelector(
    (state) => state.category
  );

  const { status: profileStatus } = useSelector((state) => state.profile);

  if (categoryStatus === STATUSES.LOADING) {
    return <AppSpinner />;
  }
  if (categoryStatus === STATUSES.ERROR) {
    const errorArray = errors.map((error) => error.msg);
    showAllNotifications(errorArray, ToastColors.error);
  }

  if (profileStatus === STATUSES.ERROR) {
    return <ProfileCreateButton />;
  }

  return (
    <>
      <Container>
        <div className='page-header-row'>
          <h2>
            <FontAwesomeIcon icon={faPenToSquare} className='margin-right-5' />
            Expenses
          </h2>
          <Button
            variant='success'
            className='bg-color-green'
            onClick={handleShow}
          >
            + Add Expense
          </Button>
        </div>
        <Modal
          show={expenseModal}
          onHide={() => handleClose()}
          backdrop='static'
        >
          <ExpenseForm
            setCurrentPage={setCurrentPage}
            showModal={expenseModal}
            handleCloseModal={handleClose}
            create={true}
          />
        </Modal>
        <ExpenseTable
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </Container>
    </>
  );
};
