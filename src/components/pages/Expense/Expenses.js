import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { ExpenseTable } from './ExpenseTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';
import '../../css/tables.css';
import { AddExpense } from './AddExpense';

export const Expenses = () => {
  const [expenseModal, setExpenseModal] = useState(false);

  const handleClose = () => setExpenseModal(false);
  const handleShow = () => setExpenseModal(true);
  return (
    <>
      <div className='container'>
        <div className='table-header'>
          <h2>
            <FontAwesomeIcon
              icon={faCalculator}
              flip='horizontal'
              size='lg'
              style={{ color: '#1f5122' }}
            />
            Expenses
          </h2>
          <Button className='add-button' onClick={handleShow}>
            {' '}
            + Add expense
          </Button>
        </div>
      </div>
      <ExpenseTable />
      <AddExpense showModal={expenseModal} handleClose={handleClose} />
    </>
  );
};
