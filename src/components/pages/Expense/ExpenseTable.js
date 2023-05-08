import { Button, Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';

import { AppSpinner } from '../../common/AppSpinner';
import { STATUSES } from '../../../constants/statuses';
import { fetchExpenses } from '../../../store/expenseSlice';
import { showAllNotifications } from '../../../utils/notificationHelper';
import ToastColors from '../../../constants/toastColors';
import { Expense } from './Expense';

export const ExpenseTable = ({ currentPage, setCurrentPage }) => {
  const dispatch = useDispatch();

  const { data, status, errors } = useSelector((state) => state.expense);

  const getResults = (pageNum) => {
    setCurrentPage(pageNum);
    dispatch(fetchExpenses(pageNum));
  };

  if (status === STATUSES.LOADING) {
    return <AppSpinner />;
  }
  if (status === STATUSES.ERROR) {
    const errorArray = errors.map((error) => error.msg);
    showAllNotifications(errorArray, ToastColors.error);
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
          {data?.expenses?.length ? (
            data?.expenses.map((expense, index) => (
              <Expense
                key={expense?._id}
                index={index}
                expense={expense}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            ))
          ) : (
            <tr>
              <td colSpan='5'>There are no items to display</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Container className='table-navigators'>
        {currentPage > 1 && (
          <Button onClick={() => getResults(currentPage - 1)} variant='link'>
            Previous
          </Button>
        )}
        {data?.remainingRecords > 0 && (
          <Button variant='link' onClick={() => getResults(currentPage + 1)}>
            Next
          </Button>
        )}
      </Container>
    </>
  );
};
