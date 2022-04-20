// src/components/pie.rechart.js

import React from "react";
import {PieChart, Pie, Cell, Tooltip, Legend} from "recharts";
import Typography from "@mui/material/Typography";

const PieRechartComponent = (props) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

  const CustomTooltip = ({active, payload, label}) => {
    if (active) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#ffff",
            padding: "3px",
            border: "1px solid #cccc",
          }}>
          <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
        </div>
      );
    }

    return null;
  };

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
      <PieChart width={450} height={383}>
        <Pie
          data={props.data}
          color="#000000"
          dataKey="value"
          nameKey="name"
          cx="45%"
          cy="50%"
          fill="#8884d8">
          {props.data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />

        <Legend
          layout="vertical"
          verticalAlign="middle"
          align="right"
          wrapperStyle={{marginLeft: "-300px !important"}}
        />
      </PieChart>
    </>
  );
};

export default PieRechartComponent;
