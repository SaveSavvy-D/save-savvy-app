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

const Dashboard = () => {
  const [groupedExpenses, setGroupedExpenses] = useState([]);
  const [stackedBarChartData, setStackedBarChartData] = useState([]);
  const dispatch = useDispatch();

  const {
    data: expenseData,
    status: expenseStatus,
    errors: expenseErrors,
  } = useSelector((state) => state.expense);

  useEffect(() => {
    dispatch(fetchBudgets());
    dispatch(fetchExpenses('all'));
  }, []);

  useEffect(() => {
    const expenses = expenseData?.expenses;
    if (expenses) {
      const groupedExpenses = expenses.reduce((acc, curr) => {
        const categoryId = curr.category._id;
        if (acc[categoryId]) {
          acc[categoryId].Amount += curr.amount;
        } else {
          acc[categoryId] = {
            _id: categoryId,
            category: curr.category.title,
            Amount: curr.amount,
          };
        }
        return acc;
      }, {});
      setGroupedExpenses(Object.values(groupedExpenses));

      const groupedData = expenses.reduce((acc, { date, category, amount }) => {
        const dateStr = new Date(date).toLocaleDateString();
        if (!acc[dateStr]) {
          acc[dateStr] = {};
        }
        if (!acc[dateStr][category.title]) {
          acc[dateStr][category.title] = 0;
        }
        acc[dateStr][category.title] += amount;
        return acc;
      }, []);

      const transformedData = Object.keys(groupedData).map((date) => {
        const categories = groupedData[date];
        const total = Object.values(categories).reduce(
          (acc, curr) => acc + curr,
          0
        );

        return { date, ...categories, total };
      });
      setStackedBarChartData(transformedData.reverse());
    }
  }, [expenseData?.expenses]);

  if (expenseStatus === STATUSES.LOADING) {
    return <AppSpinner />;
  }
  if (expenseErrors === STATUSES.ERROR) {
    const errorArray = expenseErrors.map((error) => error.msg);
    showAllNotifications(errorArray, ToastColors.error);
  }

  return (
    <Container>
      <div className='dashboard-container'>
        <div className='dashboard-column-1'>
          <DashboardCards />
          <div className='dashboard-card-stacked-bar-chart'>
            <ExpenseStackedBarChart
              stackedBarChartData={stackedBarChartData}
              CATEGORY_COLORS={CATEGORY_COLORS}
            />
          </div>
        </div>
        <div className='dashboard-column-2'>
          <div className='dashboard-cards'>
            <ExpenseLineChart stackedBarChartData={stackedBarChartData} />
          </div>
          <div className='dashboard-cards'>
            <ExpenseBarChart
              CATEGORY_COLORS={CATEGORY_COLORS}
              groupedExpenses={groupedExpenses}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
