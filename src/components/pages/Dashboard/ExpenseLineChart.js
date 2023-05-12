import React from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import monthMappings from '../../../constants/monthMappings';

const ExpenseLineChart = ({ expenseStackedBarChartData }) => {
  return (
    <ResponsiveContainer width='100%' height={385}>
      <LineChart
        data={expenseStackedBarChartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
        }}
      >
        <CartesianGrid vertical={false} fill='gray' fillOpacity={0.1} />
        <XAxis
          axisLine={false}
          dataKey='date'
          tickFormatter={(date) =>
            `${date.substring(0, 2)} ${monthMappings[date.substring(3, 5)]}`
          }
        />
        <YAxis axisLine={false} />
        <Tooltip />
        <Line
          type='monotone'
          dataKey='total'
          name='Expenditure'
          stroke='#8884d8'
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ExpenseLineChart;
