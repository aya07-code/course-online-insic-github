import React from "react";
import {
  LineChart,
  Tooltip,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", students: 148 },
  { name: "Feb", students: 100 },
  { name: "Marc", students: 205 },
  { name: "April", students: 110 },
  { name: "May", students: 165 },
  { name: "Jun", students: 145 },
  { name: "July", students: 180 },
  { name: "Agust", students: 156 },
  { name: "Sept", students: 148 },
  { name: "Oct", students: 220 },
  { name: "Now", students: 180 },
  { name: "Dec", students: 245 },
];

const Charts = () => {
  const chart = (interval) => (
    <ResponsiveContainer height={250} width="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="" />
        <XAxis tick={{ fontSize: 12 }} dataKey="name" interval={interval} />
        <YAxis
          tick={{ fontSize: 12 }}
          domain={[0, 300]}
          tickCount={7}
          interval={interval}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="students"
          strokeWidth={2}
          stroke="#336CFB"
          fill="#336CFB"
          activeDot={{ r: 8 }}
        />
        {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
      </LineChart>
    </ResponsiveContainer>
  );

  return (
    <>
      {chart("preserveEnd")}
    </>
  );
};

export default Charts;