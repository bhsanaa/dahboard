import React, {PureComponent, useEffect} from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Typography from "@mui/material/Typography";

export default function LineChartPage(props) {
  return (
    <>
      <Typography
        component="h2"
        variant="h6"
        color="primary"
        gutterBottom
        align="left">
        {props.title ? props.title : ""}
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={props.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            tickFormatter={(unixTime) =>
              (unixTime / 1000 / 60 / 60).toFixed(2) + "h"
            }
          />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={props.dataKey} stroke="#82aaca" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
