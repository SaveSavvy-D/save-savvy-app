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

const ExpenseLineChart = ({ stackedBarChartData }) => {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <LineChart
        data={stackedBarChartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 50,
        }}
      >
        <CartesianGrid vertical={false} fill='gray' fillOpacity={0.1} />
        <XAxis axisLine={false} dataKey='date' />
        <YAxis axisLine={false} />
        <Tooltip />
        <Line
          type='monotone'
          dataKey='total'
          name='Expenditure'
          stroke='#8884d8'
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ExpenseLineChart;
