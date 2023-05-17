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
import { chartConfig } from '../../../utils/chartConfig';

const BudgetStackedBarChart = ({ data }) => {
  return (
    <ResponsiveContainer width='100%' height={200}>
      <BarChart data={data} margin={chartConfig.margin}>
        <XAxis dataKey='category' tick={chartConfig.tick} axisLine={false} />
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
