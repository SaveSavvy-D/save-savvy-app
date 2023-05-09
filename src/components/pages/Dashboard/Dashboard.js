import React from 'react';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import Expenses from './Expense/Expenses';
import CATEGORY_COLORS from '../../../constants/dashboardColors';
import { fetchBudgets } from '../../../store/budgetSlice';
import { fetchExpenses } from '../../../store/expenseSlice';
import { STATUSES } from '../../../constants/statuses';
import { AppSpinner } from '../../common/AppSpinner';
import { showAllNotifications } from '../../../utils/notificationHelper';
import ToastColors from '../../../constants/toastColors';

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBudgets());
    dispatch(fetchExpenses('all'));
  }, []);

  const {
    data: expenseData,
    status: expenseStatus,
    errors: expenseErrors,
  } = useSelector((state) => state.expense);

  if (expenseStatus === STATUSES.LOADING) {
    return <AppSpinner />;
  }
  if (expenseErrors === STATUSES.ERROR) {
    const errorArray = expenseErrors.map((error) => error.msg);
    showAllNotifications(errorArray, ToastColors.error);
  }

  return (
    <Container>
      <h2 className='margin-bottom-50'>
        <FontAwesomeIcon icon={faChartLine} className='margin-right-5' />
        Dashboard
      </h2>
      <Expenses
        expenses={expenseData?.expenses}
        COLORS={Object.values(CATEGORY_COLORS)}
      />
    </Container>
  );
};

export default Dashboard;
