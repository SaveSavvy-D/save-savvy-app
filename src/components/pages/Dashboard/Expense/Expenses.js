import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import CATEGORY_COLORS from '../../../../constants/dashboardColors';
import ExpenseBarChart from './ExpenseBarChart';
import ExpenseLineChart from './ExpenseLineChart';
import ExpenseStackedBarChart from './ExpenseStackedBarChart';

const Expenses = ({ expenses, COLORS }) => {
  const [groupedExpenses, setGroupedExpenses] = useState([]);
  const [stackedBarChartData, setStackedBarChartData] = useState([]);

  useEffect(() => {
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
  }, [expenses]);

  return (
    <>
      <h2>
        Expenses
        <FontAwesomeIcon icon={faPenToSquare} className='margin-left-5' />
      </h2>
      <div className='dashboard-charts'>
        <ExpenseBarChart
          CATEGORY_COLORS={CATEGORY_COLORS}
          groupedExpenses={groupedExpenses}
        />
        <ExpenseLineChart stackedBarChartData={stackedBarChartData} />
        <ExpenseStackedBarChart
          stackedBarChartData={stackedBarChartData}
          CATEGORY_COLORS={CATEGORY_COLORS}
        />
      </div>
    </>
  );
};

export default Expenses;
