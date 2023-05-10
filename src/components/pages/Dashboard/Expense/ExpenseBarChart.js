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
  Label,
} from 'recharts';

const ExpenseBarChart = ({ groupedExpenses, CATEGORY_COLORS }) => {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <BarChart
        data={groupedExpenses}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 50,
        }}
      >
        <CartesianGrid vertical={false} fill='gray' fillOpacity={0.1} />
        <XAxis dataKey='category' tick={{ display: 'none' }} axisLine={false}>
          <Label value='Expense Category' offset={0} position='insideBottom' />
        </XAxis>
        <YAxis axisLine={false}>
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
