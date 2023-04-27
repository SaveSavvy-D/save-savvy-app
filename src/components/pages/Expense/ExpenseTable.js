import { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { STATUSES } from '../../../constants/statuses';
import { fetchExpenses } from '../../../store/expenseSlice';

export const ExpenseTable = () => {
  const dispatch = useDispatch();

  const { data: expenses, status } = useSelector((state) => state.expense);

  useEffect(() => {
    dispatch(fetchExpenses());
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
          <th>Title</th>
          <th>Amount</th>
          <th>Category</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        {
        expenses?.data?.expenses.map((expense, index) => (
          <tr key={expense?.id}>
          <td>{index + 1}</td>
          <td>{expense?.title}</td>
          <td>{expense?.amount}</td>
          <td>{expense?.category?.title}</td>
        </tr>
        ))
        }
      </tbody>
    </Table>
  );
};
