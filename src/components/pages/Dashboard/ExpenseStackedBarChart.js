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
import monthMappings from '../../../constants/monthMappings';

const ExpenseStackedBarChart = ({
  expenseStackedBarChartData,
  CATEGORY_COLORS,
}) => {
  return (
    <>
      {expenseStackedBarChartData.length > 0 && (
        <ResponsiveContainer width='100%' height={385}>
          <BarChart data={expenseStackedBarChartData}>
            <CartesianGrid vertical={false} fill='gray' fillOpacity={0.1} />
            <XAxis
              dataKey='date'
              axisLine={false}
              tickFormatter={(date) =>
                `${date.substring(0, 2)} ${monthMappings[date.substring(3, 5)]}`
              }
            />
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
