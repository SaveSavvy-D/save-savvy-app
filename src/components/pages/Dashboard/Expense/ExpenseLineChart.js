import React from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
} from 'recharts';

const ExpenseLineChart = ({ stackedBarChartData }) => {
  return (
    <ResponsiveContainer width='40%' height={400}>
      <LineChart
        data={stackedBarChartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 50,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='date' />
        <YAxis />
        <Tooltip />
        {/* <Legend /> */}
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
