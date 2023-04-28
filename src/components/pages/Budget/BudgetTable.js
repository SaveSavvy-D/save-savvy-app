import { useEffect, useRef } from 'react';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { STATUSES } from '../../../constants/statuses';
import { fetchBudgets } from '../../../store/budgetSlice';
import '../../../App.css';
import { Container, Button } from 'react-bootstrap';

export const BudgetTable = () => {
  const dispatch = useDispatch();
  const currentPage = useRef(1);

  const { data: budgets, status } = useSelector((state) => state.budget);

  useEffect(() => {
    dispatch(fetchBudgets());
  }, []);

  const getResults = (pageNum) => {
    currentPage.current = pageNum;
    dispatch(fetchBudgets(pageNum));
  };

  if (status === STATUSES.LOADING) {
    return <h2>Loading.....</h2>;
  }
  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong!</h2>;
  }

  return (
    <>
      <Table className="table-text" striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Category</th>
            <th>Threshold</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {budgets?.data?.budgets.length ? (
            budgets?.data?.budgets.map((budget, index) => (
              <tr key={budget?._id}>
                <td>{index + 1 + (currentPage.current - 1) * 5}</td>
                <td>{budget?.categoryId.title}</td>
                <td>{budget?.threshold}</td>
                <td>{budget?.startDate.substring(0, 10)}</td>
                <td>{budget?.endDate.substring(0, 10)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No budgets found</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Container className="table-navigators">
        {currentPage.current > 1 && (
          <Button
            onClick={() => getResults(currentPage.current - 1)}
            variant="link"
          >
            Previous
          </Button>
        )}
        {budgets?.data?.budgets.length && (
          <Button
            variant="link"
            onClick={() => getResults(currentPage.current + 1)}
          >
            Next
          </Button>
        )}
      </Container>
    </>
  );
};
