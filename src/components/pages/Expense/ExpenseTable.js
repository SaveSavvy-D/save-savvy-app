import { useEffect, useRef, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';

import { AppSpinner } from '../../common/AppSpinner';
import { AppAlert } from '../../common/AppAlert';
import { AddExpense } from './AddExpense';
import { STATUSES } from '../../../constants/statuses';
import { fetchExpenses } from '../../../store/expenseSlice';

export const ExpenseTable = () => {
  const dispatch = useDispatch();
  const currentPage = useRef(1);
  const [expenseModal, setExpenseModal] = useState(false);
  const [singleExpense, setSingleExpense] = useState('');
  const { data: expenses, status } = useSelector((state) => state.expense);

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  const getResults = (pageNum) => {
    currentPage.current = pageNum;
    dispatch(fetchExpenses(pageNum));
  };

  const handleShow = (expenseData) => {
    setSingleExpense(expenseData);
    setExpenseModal(true);
  };

  const handleClose = () => setExpenseModal(false);

  if (status === STATUSES.LOADING) {
    return <AppSpinner />;
  }

  if (status === STATUSES.ERROR) {
    return <AppAlert variant={'danger'} message='Oops! Something went wrong' />;
  }

  return (
    <>
      <Table className='table-text' striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Category</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {expenses?.data?.expenses?.length ? (
            expenses?.data?.expenses.map((expense, index) => (
              <tr key={expense?._id}>
                <td>{index + 1 + (currentPage.current - 1) * 5}</td>
                <td>{expense?.title}</td>
                <td>{expense?.amount}</td>
                <td>{expense?.date.substring(0, 10)}</td>
                <td>{expense?.category?.title}</td>
                <td>
                  <Button variant='link' onClick={() => handleShow(expense)}>
                    View
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='5'>There are no items to display</td>
            </tr>
          )}
        </tbody>
      </Table>
      <AddExpense
        expense={singleExpense}
        showModal={expenseModal}
        handleClose={handleClose}
        create={false}
      />
      <Container className='table-navigators'>
        {currentPage.current > 1 && (
          <Button
            onClick={() => getResults(currentPage.current - 1)}
            variant='link'
          >
            Previous
          </Button>
        )}
        {expenses?.data?.remainingRecords > 0 && (
          <Button
            variant='link'
            onClick={() => getResults(currentPage.current + 1)}
          >
            Next
          </Button>
        )}
      </Container>
    </>
  );
};
