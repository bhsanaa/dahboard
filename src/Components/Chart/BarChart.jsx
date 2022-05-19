import React from "react";
import {useCallback} from "react";
import {PieChart, Pie, Cell, Tooltip, Legend} from "recharts";
import Typography from "@mui/material/Typography";
import {useCurrentPng} from "recharts-to-png";
import FileSaver from "file-saver";
import DownloadIcon from "@mui/icons-material/Download";
import {IconButton} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const BarChartPage = (props) => {
  const {pagination} = props;
  const [getAreaPng, {ref: areaRef}] = useCurrentPng();
  const [barNum, setbarNum] = React.useState(0);

  const handleBarDownload = useCallback(async () => {
    const png = await getAreaPng();
    if (png) {
      FileSaver.saveAs(png, "area-chart.png");
    }
  }, [getAreaPng]);

  const barBack = () => {
    if (barNum > 0) setbarNum(barNum - 1);
  };
  const barNext = () => {

    if (props.data.length / 4 > barNum + 1) setbarNum(barNum + 1);
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
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}>
          <IconButton onClick={handleBarDownload} aria-label="download">
            <DownloadIcon />
          </IconButton>
          {pagination && (
            <>
              <IconButton aria-label="delete" onClick={barBack}>
                <ArrowBackIcon />
              </IconButton>
              <IconButton aria-label="delete" onClick={barNext}>
                <ArrowForwardIcon />
              </IconButton>
            </>
          )}
        </div>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          ref={areaRef}
          width={"100%"}
          height={"100%"}
          data={props.data.slice(barNum * 4, barNum * 4 + 4)}
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
          <Bar dataKey={props.field} barSize={50} fill="#669bbc" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default BarChartPage;
