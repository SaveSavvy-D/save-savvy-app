import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const ExpenseStackedBarChart = ({ stackedBarChartData, CATEGORY_COLORS }) => {
  return (
    <>
      {stackedBarChartData.length > 0 && (
        <ResponsiveContainer width='95%' height={385}>
          <BarChart data={stackedBarChartData}>
            <CartesianGrid vertical={false} fill='gray' fillOpacity={0.1} />
            <XAxis dataKey='date' axisLine={false} />
            <YAxis axisLine={false} />
            <Tooltip />
            {Object.keys(CATEGORY_COLORS).map((name) => (
              <Bar
                key={name}
                dataKey={name}
                stackId='a'
                fill={CATEGORY_COLORS[name]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      )}
    </>
  );
};

export default ExpenseStackedBarChart;
