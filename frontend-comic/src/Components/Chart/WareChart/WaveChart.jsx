import React from "react";
import { LineChart, Line, XAxis, Tooltip, Legend } from "recharts";
const WareChart = (props) => {
  const { data } = props;
  return (
    <LineChart width={200} height={150} data={data}>
      <XAxis dataKey="name" />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="value"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
};

export default WareChart;
