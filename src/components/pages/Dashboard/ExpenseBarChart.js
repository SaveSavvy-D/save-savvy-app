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
import { chartConfig } from '../../../utils/chartConfig';

const ExpenseBarChart = ({ groupedExpenses, CATEGORY_COLORS }) => {
  return (
    <ResponsiveContainer width='100%' height={200}>
      <BarChart data={groupedExpenses} margin={chartConfig.margin}>
        <CartesianGrid vertical={false} fill='gray' fillOpacity={0.1} />
        <XAxis dataKey='category' tick={chartConfig.tick} axisLine={false}>
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
