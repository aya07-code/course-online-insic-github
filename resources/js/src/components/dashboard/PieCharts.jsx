import {
  Pie,
  Tooltip,
  Legend,
  PieChart,
  Cell,
  ResponsiveContainer,
} from "recharts";

const topFormations = [
  { name: "React", students: 90 },
  { name: "Laravel", students: 70 },
  { name: "Python", students: 50 },
  { name: "UI/UX", students: 30 },
  { name: "Marketing", students: 20 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];
const PieChartComponent = () => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart width={350} height={350}>
        <Pie
          dataKey="students"
          isAnimationActive={false}
          data={topFormations}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={75}
          fill="#336CFB"
        >
          {topFormations.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />                        ))}
          </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};
export default PieChartComponent;