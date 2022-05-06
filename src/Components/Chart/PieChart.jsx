// src/components/pie.rechart.js

import React, {useCallback} from "react";
import {PieChart, Pie, Cell, Tooltip, Legend} from "recharts";
import Typography from "@mui/material/Typography";
import {useCurrentPng} from "recharts-to-png";
import FileSaver from "file-saver";
import DownloadIcon from "@mui/icons-material/Download";
import {IconButton} from "@mui/material";
const PieRechartComponent = (props) => {
  const [getAreaPng, {ref: pieRef}] = useCurrentPng();
  const handlePieDownload = useCallback(async () => {
    const png = await getAreaPng();
    if (png) {
      FileSaver.saveAs(png, "area-chart.png");
    }
  }, [getAreaPng]);
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
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <Typography
          component="h2"
          variant="h6"
          color="primary"
          gutterBottom
          align="left"
          style={{color: "#dd0031"}}>
          {props.title ? props.title : ""}
        </Typography>
        <IconButton onClick={handlePieDownload} aria-label="download">
          <DownloadIcon />
        </IconButton>
      </div>
      <PieChart ref={pieRef} width={props.width} height={props.height}>
        <Pie
          isAnimationActive={false}
          data={props.data}
          color="#000000"
          dataKey="value"
          nameKey="name"
          cx="45%"
          labelLine={false}
          cy="38%"
          label={renderCustomizedLabel}
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
          align={props.align === "right" ? "right" : "center"}
        />
      </PieChart>
    </>
  );
};

export default PieRechartComponent;

// import React, {useCallback, useState} from "react";
// import {PieChart, Pie, Cell, Tooltip, Legend} from "recharts";

// const data = [
//   {name: "Group A", value: 400},
//   {name: "Group B", value: 300},
//   {name: "Group C", value: 300},
//   {name: "Group D", value: 200},
// ];

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({
//   cx,
//   cy,
//   midAngle,
//   innerRadius,
//   outerRadius,
//   percent,
//   index,
// }) => {
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <text
//       x={x}
//       y={y}
//       fill="white"
//       textAnchor={x > cx ? "start" : "end"}
//       dominantBaseline="central">
//       {`${(percent * 100).toFixed(0)}%`}
//     </text>
//   );
// };

// const CustomTooltip = ({active, payload, label}) => {
//   if (active) {
//     return (
//       <div
//         className="custom-tooltip"
//         style={{
//           backgroundColor: "#ffff",
//           padding: "3px",
//           border: "1px solid #cccc",
//         }}>
//         <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
//       </div>
//     );
//   }

//   return null;
// };

// export default function PieRechartComponent(props) {
//   return (
//     <PieChart width={400} height={400}>
//       <Pie
//         isAnimationActive={false}
//         data={props.data}
//         cx={200}
//         cy={200}
//         labelLine={false}
//         label={renderCustomizedLabel}
//         outerRadius={80}
//         fill="#8884d8"
//         dataKey="value">
//         {props.data.map((entry, index) => (
//           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//         ))}
//         <Tooltip content={<CustomTooltip />} />

//         <Legend
//           layout={props.location === "bottom" ? "horizontal" : "vertical"}
//           verticalAlign={props.location === "bottom" ? "bottom" : "middle"}
//           align="right"
//         />
//       </Pie>
//     </PieChart>
//   );
// }
