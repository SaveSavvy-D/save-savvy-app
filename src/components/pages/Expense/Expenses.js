import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';

import { ExpenseTable } from './ExpenseTable';
import { AddExpense } from './AddExpense';

export const Expenses = () => {
  const [expenseModal, setExpenseModal] = useState(false);
  const handleClose = () => setExpenseModal(false);
  const handleShow = () => setExpenseModal(true);

  return (
    <>
      <Container>
        <div className='page-header-row'>
          <h2>
            <FontAwesomeIcon icon={faCalculator} className='margin-right-5' />
            Expenses
          </h2>
          <Button
            variant='success'
            className='bg-color-green'
            onClick={handleShow}
          >
            + Add Budget
          </Button>
        </div>
        <ExpenseTable />
        <AddExpense
          showModal={expenseModal}
          handleClose={handleClose}
          create={true}
        />
      </Container>
    </>
  );
};
