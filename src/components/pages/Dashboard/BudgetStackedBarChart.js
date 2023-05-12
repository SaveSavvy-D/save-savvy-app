import React from 'react';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import CustomTooltip from '../../../utils/CustomToolTip';

const BudgetStackedBarChart = ({ data }) => {
  return (
    <ResponsiveContainer width='100%' height={200}>
      <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey='category' tick={{ display: 'none' }} axisLine={false} />
        <YAxis />
        <CartesianGrid vertical={false} fill='gray' fillOpacity={0.1} />
        <Tooltip content={CustomTooltip} />
        <Legend />
        <Bar dataKey='used' stackId='a' fill='#82ca9d' />
        <Bar dataKey='remaining' stackId='a' fill='#8884d8' />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BudgetStackedBarChart;
