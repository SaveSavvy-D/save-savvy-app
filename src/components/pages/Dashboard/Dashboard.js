import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import CATEGORY_COLORS from '../../../constants/dashboardColors';
import { fetchBudgets } from '../../../store/budgetSlice';
import { fetchExpenses } from '../../../store/expenseSlice';
import { STATUSES } from '../../../constants/statuses';
import { AppSpinner } from '../../common/AppSpinner';
import { showAllNotifications } from '../../../utils/notificationHelper';
import ToastColors from '../../../constants/toastColors';
import DashboardCards from './DashboardCards';
import ExpenseStackedBarChart from './ExpenseStackedBarChart';
import ExpenseLineChart from './ExpenseLineChart';
import ExpenseBarChart from './ExpenseBarChart';
import '../../css/Dashboard.css';
import BudgetStackedBarChart from './BudgetStackedBarChart';
import {
  getExpenseBarChartData,
  getGroupedExpenses,
} from '../../../utils/Dashboard/Expenses/expensesHelper';
import { getGroupedBudgets } from '../../../utils/Dashboard/Budgets/budgetsHelper';
import { fetchProfile } from '../../../store/profileSlice';

const Dashboard = () => {
  const [expenditure, setExpenditure] = useState(0);
  const [groupedExpenses, setGroupedExpenses] = useState([]);
  const [expenseStackedBarChartData, setExpenseStackedBarChartData] = useState(
    []
  );
  const [budgetStackedBarChartData, setBudgetStackedBarChartData] = useState(
    []
  );
  const dispatch = useDispatch();

  const {
    data: expenseData,
    status: expenseStatus,
    errors: expenseErrors,
  } = useSelector((state) => state.expense);

  const {
    data: budgetData,
    status: budgetStatus,
    errors: budgetErrors,
  } = useSelector((state) => state.budget);

  const {
    profile: profileData,
    status: profileStatus,
    errors: profileErrors,
  } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchBudgets('all'));
    dispatch(fetchExpenses('all'));
    dispatch(fetchProfile());
  }, []);

  useEffect(() => {
    const expenses = expenseData?.expenses;
    const budgets = budgetData?.budgets;

    if (expenses && budgets) {
      const groupedExpenses = getGroupedExpenses(expenses);
      setGroupedExpenses(groupedExpenses);

      const total = groupedExpenses.reduce(
        (acc, expense) => acc + expense.Amount,
        0
      );
      setExpenditure(total);

      const expenseBarChartData = getExpenseBarChartData(expenses);
      setExpenseStackedBarChartData(expenseBarChartData);

      const groupedBudgets = getGroupedBudgets(groupedExpenses, budgets);
      setBudgetStackedBarChartData(groupedBudgets);
    }
  }, [expenseData?.expenses, budgetData?.budgets, profileData]);

  if (
    expenseStatus === STATUSES.LOADING ||
    budgetStatus === STATUSES.LOADING ||
    profileStatus === STATUSES.LOADING
  ) {
    return <AppSpinner />;
  }
  if (
    expenseStatus === STATUSES.ERROR ||
    budgetStatus === STATUSES.ERROR ||
    profileStatus === STATUSES.ERROR
  ) {
    let errorArray = budgetErrors || expenseErrors || profileErrors;
    errorArray = errorArray.map((error) => error.msg);
    showAllNotifications(errorArray, ToastColors.error);
  }

  return (
    <Container>
      <div className='dashboard-container'>
        <div className='dashboard-column-1'>
          <DashboardCards expenditure={expenditure} profile={profileData} />
          <div className='dashboard-card-stacked-bar-chart'>
            <ExpenseLineChart
              expenseStackedBarChartData={expenseStackedBarChartData}
            />
          </div>
        </div>
        <div className='dashboard-column-2'>
          <div className='dashboard-cards'>
            <ExpenseBarChart
              CATEGORY_COLORS={CATEGORY_COLORS}
              groupedExpenses={groupedExpenses}
            />
          </div>
          <div className='dashboard-cards'>
            <BudgetStackedBarChart
              data={budgetStackedBarChartData}
              currency={profileData?.currency}
            />
          </div>
        </div>
        <ExpenseStackedBarChart
          expenseStackedBarChartData={expenseStackedBarChartData}
          CATEGORY_COLORS={CATEGORY_COLORS}
        />
      </div>
    </Container>
  );
};

export default Dashboard;
