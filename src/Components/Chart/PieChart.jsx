// src/components/pie.rechart.js

import React from "react";
import {PieChart, Pie, Cell, Tooltip, Legend} from "recharts";

const PieRechartComponent = (props) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

  const CustomTooltip = ({active, payload, label}) => {
    if (active) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#ffff",
            padding: "5px",
            border: "1px solid #cccc",
          }}>
          <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
        </div>
      );
    }

    return null;
  };

  return (
    <PieChart
      width={500}
      height={383}
      style={{
        margin: "auto",
      }}>
      <Pie
        data={props.data}
        color="#000000"
        dataKey="value"
        nameKey="name"
        cx="45%"
        cy="50%"
        outerRadius={120}
        fill="#8884d8">
        {props.data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip content={<CustomTooltip />} />
      {/* <Legend /> */}
      <Legend layout="vertical" verticalAlign="middle" align="right" />

      {/* <Legend content={renderLegend} /> */}
    </PieChart>
  );
};

export default PieRechartComponent;
