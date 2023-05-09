import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const ExpenseStackedBarChart = ({ stackedBarChartData, CATEGORY_COLORS }) => {
  return (
    <>
      {stackedBarChartData.length > 0 && (
        <ResponsiveContainer width='40%' height={400}>
          <BarChart data={stackedBarChartData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='date' />
            <YAxis />
            <Tooltip />
            {/* <Legend /> */}
            {stackedBarChartData.map((data, index) =>
              Object.keys(stackedBarChartData[index])
                .filter((key) => key !== 'date' && key !== 'total')
                .map((key, index) => (
                  <Bar
                    key={key}
                    dataKey={key}
                    stackId='a'
                    fill={CATEGORY_COLORS[key]}
                  />
                ))
            )}
          </BarChart>
        </ResponsiveContainer>
      )}
    </>
  );
};

export default ExpenseStackedBarChart;
