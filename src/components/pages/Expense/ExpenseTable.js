import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { STATUSES } from '../../../constants/statuses';
import { fetchExpenses } from '../../../store/expenseSlice';
import { EditExpense } from './EditExpense';

export const ExpenseTable = () => {
  const dispatch = useDispatch();
  const [expenseEditModal, setExpenseEditModal] = useState(false);
  const [singleExpense, setSingleExpense] = useState('');
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
  const handleCloseEdit = () => setExpenseEditModal(false);
  const handleEdit = (expenseData) => {
    setSingleExpense(expenseData);
    setExpenseEditModal(true);
  };

  return (
    <div className='container'>
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
          {expenses?.data?.expenses.map((expense, index) => (
            <tr key={expense?._id}>
              <td>{index + 1}</td>
              <td>{expense?.title}</td>
              <td>{expense?.amount}</td>
              <td>{expense?.category?.title}</td>
              <td>
                <Button variant='link' onClick={() => handleEdit(expense)}>
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <EditExpense
        singleExpense={singleExpense}
        showEditModal={expenseEditModal}
        handleCloseEdit={handleCloseEdit}
      />
    </div>
  );
};
