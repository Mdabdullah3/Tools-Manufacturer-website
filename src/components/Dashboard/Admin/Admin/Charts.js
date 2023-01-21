import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Charts = () => {
  const data = [
    {
      month: "Aug 13",
      investment: 100000,
      sell: 241,
      revenue: 10401,
    },
    {
      month: "Aug 14",
      investment: 200000,
      sell: 423,
      revenue: 24500,
    },
    {
      month: "Aug 15",
      investment: 500000,
      sell: 726,
      revenue: 67010,
    },
    {
      month: "Aug 16",
      investment: 500000,
      sell: 529,
      revenue: 40405,
    },
    {
      month: "Aug 17",
      investment: 600000,
      sell: 601,
      revenue: 50900,
    },
  ];

  return (
    <div className="bg-primary/20 text-secondary px-10 rounded-3xl -mt-10 pt-7 font-mono">
      <LineChart width={400}height={253} data={data}>
        <Line
          stroke="#ffff"
          dataKey={"investment"}
          activeDot={{ r: 8 }}
        ></Line>
        <Line stroke="#ffff" dataKey={"revenue"} activeDot={{ r: 8 }}></Line>
        <Line stroke="#fff" dataKey={"sell"}></Line>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis stroke="#ffff" dataKey={"month"} ></XAxis>
        <Tooltip />
        <Legend />
        <YAxis stroke="#ffff"></YAxis>
      </LineChart>
    </div>
  );
};

export default Charts;
