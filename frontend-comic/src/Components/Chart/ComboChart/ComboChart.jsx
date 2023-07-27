import React from "react";
import {
  Bar,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
const ComboChart = (props) => {
  const { data } = props;
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        {/* <XAxis dataKey="month" /> */}
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <XAxis dataKey="name" />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="user"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="comic"
          stroke="#82ca9d"
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="comic"
          stroke="#413ea0"
        />{" "}
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="chapter"
          stroke="#ff7300"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ComboChart;
