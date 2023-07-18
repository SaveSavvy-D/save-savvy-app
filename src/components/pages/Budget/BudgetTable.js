import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Button } from 'react-bootstrap';

import { STATUSES } from '../../../constants/statuses';
import { fetchBudgets } from '../../../store/budgetSlice';
import { Budget } from './Budget';
import { AppSpinner } from '../../common/AppSpinner';
import { showAllNotifications } from '../../../utils/notificationHelper';
import ToastColors from '../../../constants/toastColors';

export const BudgetTable = ({ currentPage, setCurrentPage }) => {
  const dispatch = useDispatch();

  const { data, status, errors } = useSelector((state) => state.budget);
  const { alertStatus, alertErrors } = useSelector((state) => state.alert);

  const getResults = (pageNum) => {
    setCurrentPage(pageNum);
    dispatch(fetchBudgets(pageNum));
  };

  if (status === STATUSES.LOADING) {
    return <AppSpinner />;
  }
  if (status === STATUSES.ERROR) {
    const errorArray = errors.map((error) => error.msg);
    showAllNotifications(errorArray, ToastColors.error);
  }
  if (alertStatus === STATUSES.ERROR) {
    const errorArray = alertErrors.map((error) => error.msg);
    showAllNotifications(errorArray, ToastColors.error);
  }

  return (
    <>
      <Table className='table-text' striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Category</th>
            <th>Threshold</th>
            <th>Budget Month</th>
            <th>Add Alerts</th>
            <th>View Alerts</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {data?.budgets?.length ? (
            data?.budgets.map((budget, index) => (
              <Budget
                key={budget?._id}
                index={index}
                budget={budget}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            ))
          ) : data !== null ? (
            <tr>
              <td colSpan='5'>There are no items to display</td>
            </tr>
          ) : (
            false
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
