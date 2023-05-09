import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
  Label,
} from 'recharts';

const ExpenseBarChart = ({ groupedExpenses, CATEGORY_COLORS }) => {
  return (
    <ResponsiveContainer width='40%' height={400}>
      <BarChart
        data={groupedExpenses}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 50,
        }}
      >
        {/* <Legend
          verticalAlign='top'
          align='left'
          payload={groupedExpenses.map((groupedExpense, index) => ({
            value: groupedExpense.category,
            type: 'circle',
            id: `dataKey${index}`,
            color: CATEGORY_COLORS[groupedExpense.category],
          }))}
        /> */}
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='category' tick={{ display: 'none' }}>
          <Label value='Expense Category' offset={0} position='insideBottom' />
        </XAxis>
        <YAxis>
          <Label
            angle={-90}
            value='Amount Spent'
            position='insideLeft'
            style={{ textAnchor: 'middle' }}
          />
        </YAxis>
        <Tooltip />
        <Bar dataKey='Amount'>
          {groupedExpenses.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={CATEGORY_COLORS[entry.category]}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ExpenseBarChart;
