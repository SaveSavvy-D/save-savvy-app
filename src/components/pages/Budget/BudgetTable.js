import { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { STATUSES } from '../../../constants/statuses';
import { fetchBudgets } from '../../../store/budgetSlice';

export const BudgetTable = () => {
  const dispatch = useDispatch();

  const { data: budgets, status } = useSelector((state) => state.budget);

  useEffect(() => {
    dispatch(fetchBudgets());
  }, []);

  if (status === STATUSES.LOADING) {
    return <h2>Loading.....</h2>;
  }
  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong!</h2>;
  }

  return (
    <Table striped bordered hover>
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
        {budgets?.data?.budgets.map((budget, index) => (
          <tr key={budget?._id}>
            <td>{index + 1}</td>
            <td>{budget?.categoryId.title}</td>
            <td>{budget?.threshold}</td>
            <td>{budget?.startDate.substring(0, 10)}</td>
            <td>{budget?.endDate.substring(0, 10)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
