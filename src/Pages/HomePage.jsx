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
import {
  Avatar,
  Button,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import PieRechartComponent from "../Components/Chart/PieChart";
import {useAppContext} from "../provider/AppProvider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const Item = styled(Paper)(({theme}) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const HomePage = () => {
  const [viewsChartData, setViewsChartData] = React.useState();
  const [dayTimeChartData, setDayTimeChartData] = React.useState([]);
  const [tableData, setTableData] = React.useState();
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);

  React.useEffect(() => {
    getViewsChartData().then((res) => {
      setViewsChartData(res);
    });
    getDayTimeChartData().then((res) => {
      setDayTimeChartData(res);
      console.log(
        "y",
        res.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      );
      console.log("x", res);
    });
    getHomePage().then((res) => setTableData(res));
  }, []);
  const pageBack = () => {
    if (page > 0) setPage(page - 1);
  };
  const pageNext = () => {
    if (dayTimeChartData.length / rowsPerPage > page + 1) setPage(page + 1);
  };
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
            }}
            elevation={6}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}>
              <IconButton aria-label="delete" onClick={pageBack}>
                <ArrowBackIcon />
              </IconButton>

              <IconButton aria-label="delete" onClick={pageNext}>
                <ArrowForwardIcon />
              </IconButton>
            </div>

            <LineChartPage
              data={dayTimeChartData.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )}
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
            }}
            elevation={6}>
            {viewsChartData && (
              <PieRechartComponent
                data={viewsChartData}
                colors={["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"]}
                width={500}
                height={400}
              />
            )}
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
