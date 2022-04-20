import * as React from "react";
import {styled} from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
  getDayTimeChartData,
  getViewsChartData,
  getHomePage,
} from "../service/pageService";
import BarChartPage from "../Components/Chart/BarChart";
import LineChartPage from "../Components/Chart/LineChart";
import DataTable from "../Components/DataTable";
import {Avatar, CardContent, Typography} from "@mui/material";
import PieRechartComponent from "../Components/Chart/PieChart";

const Item = styled(Paper)(({theme}) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const HomePage = () => {
  const [viewsChartData, setViewsChartData] = React.useState();
  const [dayTimeChartData, setDayTimeChartData] = React.useState();
  const [tableData, setTableData] = React.useState();
  const [time, setTime] = React.useState(0);

  React.useEffect(() => {
    getViewsChartData().then((res) => setViewsChartData(res));
    getDayTimeChartData().then((res) => setDayTimeChartData(res));
    getHomePage().then((res) => setTableData(res));
  }, []);

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={6}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 400,
            }}>
            <LineChartPage
              data={dayTimeChartData}
              dataKey="time"
              title={"Time/Page"}
            />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          {" "}
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 400,
            }}>
            <BarChartPage
              data={viewsChartData}
              field={"views"}
              title={"Views/Page"}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={12} lg={12}>
          {tableData && (
            <DataTable
              headerNames={[
                "Name",
                "Total Time",
                "Sessions",
                "AVG TimeSession",
                "Event %",
              ]}
              tableData={tableData}
            />
          )}
        </Grid>
      </Grid>
    </div>
  );
};
