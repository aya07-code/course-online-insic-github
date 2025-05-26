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
  { name: "Jan", quiz: 14 },
  { name: "Feb", quiz: 10},
  { name: "Marc", quiz: 25 },
  { name: "April", quiz: 11 },
  { name: "May", quiz: 16 },
  { name: "Jun", quiz: 18},
  { name: "July", quiz: 18 },
  { name: "Agust", quiz: 15 },
  { name: "Sept", quiz: 14 },
  { name: "Oct", quiz: 22 },
  { name: "Now", quiz: 18 },
  { name: "Dec", quiz: 13 },
];

const Charts = () => {
  const chart = (interval) => (
    <ResponsiveContainer height={250} width="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="" />
        <XAxis tick={{ fontSize: 12 }} dataKey="name" interval={interval} />
        <YAxis
          tick={{ fontSize: 12 }}
          domain={[0, 30]}
          tickCount={7}
          interval={interval}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="quiz"
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