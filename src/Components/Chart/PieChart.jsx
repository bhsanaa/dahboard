// src/components/pie.rechart.js

import React from "react";
import {PieChart, Pie, Cell, Tooltip, Legend} from "recharts";
import Typography from "@mui/material/Typography";

const PieRechartComponent = (props) => {
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
        align="left"
        style={{color: "#dd0031"}}>
        {props.title ? props.title : ""}
      </Typography>
      <PieChart width={props.width} height={props.height}>
        <Pie
          data={props.data}
          color="#000000"
          dataKey="value"
          nameKey="name"
          cx="45%"
          cy="38%"
          fill="#d8848f">
          {props.data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={props.colors[index % props.colors.length]}
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />

        <Legend
          layout={props.location === "bottom" ? "horizontal" : "vertical"}
          verticalAlign={props.location === "bottom" ? "bottom" : "middle"}
          align="right"
        />
      </PieChart>
    </>
  );
};

export default PieRechartComponent;
