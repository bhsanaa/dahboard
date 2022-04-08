import React, {PureComponent, useEffect, useState} from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {getChartData} from "../service/pageService";

const BarChartPage = () => {
  const [chartData, setChartData] = useState();

  useEffect(() => {
    getChartData().then((res) => setChartData(res));
  }, []);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={"100%"}
        height={"100%"}
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="views" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartPage;
