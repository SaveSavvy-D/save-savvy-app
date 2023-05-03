import { useRef } from 'react';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Button } from 'react-bootstrap';

import { STATUSES } from '../../../constants/statuses';
import { fetchBudgets } from '../../../store/budgetSlice';
import { Budget } from './Budget';
import { AppSpinner } from '../../common/AppSpinner';
import { AppAlert } from '../../common/AppAlert';

export const BudgetTable = () => {
  const dispatch = useDispatch();
  const currentPage = useRef(1);

  const { data, status } = useSelector((state) => state.budget);

  const getResults = (pageNum) => {
    currentPage.current = pageNum;
    dispatch(fetchBudgets(pageNum));
  };

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
            <th>Category</th>
            <th>Threshold</th>
            <th>Start Date</th>
            <th>End Date</th>
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
        {currentPage.current > 1 && (
          <Button
            onClick={() => getResults(currentPage.current - 1)}
            variant='link'
          >
            Previous
          </Button>
        )}
        {data?.remainingRecords > 0 && (
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
