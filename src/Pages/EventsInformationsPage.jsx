import * as React from "react";
import {styled} from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
  getDayViewsPageChartData,
  getinfoPage,
  getSessionTimeChartData,
} from "../service/pageService";
import BarChartPage from "../Components/Chart/BarChart";
import LineChartPage from "../Components/Chart/LineChart";
import DataTable from "../Components/DataTable";
import {Avatar, CardContent, IconButton, Typography} from "@mui/material";
import PieRechartComponent from "../Components/Chart/PieChart";
import DataThresholdingRoundedIcon from "@mui/icons-material/DataThresholdingRounded";

import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {useParams} from "react-router-dom";

const Item = styled(Paper)(({theme}) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const EventsInformationsPage = () => {
  const {page} = useParams();
  const [dayTimeChartData, setDayTimeChartData] = React.useState([]);
  const [dayViewsChartData, setDayViewsChartData] = React.useState([]);
  const [dayInfoData, setDayInfoData] = React.useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [pageNum, setPageNum] = React.useState(0);
  const [barNum, setbarNum] = React.useState(0);

  React.useEffect(() => {
    if (page) {
      getSessionTimeChartData(page).then((res) => setDayTimeChartData(res));
      getDayViewsPageChartData(page).then((res) => setDayViewsChartData(res));
      getinfoPage(page).then((res) => setDayInfoData(res));
    }
  }, [page]);

  const pageBack = () => {
    if (pageNum > 0) setPageNum(pageNum - 1);
  };
  const pageNext = () => {
    if (dayTimeChartData.length / rowsPerPage > pageNum + 1)
      setPageNum(pageNum + 1);
  };

  const barBack = () => {
    if (barNum > 0) setbarNum(barNum - 1);
  };
  const barNext = () => {
    console.log("cc", dayViewsChartData.length);
    if (dayViewsChartData.length / rowsPerPage > barNum + 1)
      setbarNum(barNum + 1);
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
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
                pageNum * rowsPerPage,
                pageNum * rowsPerPage + rowsPerPage
              )}
              dataKey="time"
              title={"Time/Page"}
            />
          </Paper>
        </Grid>
        <Grid container item xs={3} mt={6}>
          <Grid item xs={12}>
            <Paper elevation={6}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0 20px",
                }}>
                <div>
                  <h4 style={{color: "#dd0031"}}>Number of Events</h4>
                  <h1 style={{marginLeft: "-80px"}}>
                    {dayInfoData && dayInfoData.nbEvents}
                  </h1>
                </div>
                <EventAvailableRoundedIcon fontSize="large" />{" "}
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={6}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0 20px",
                }}>
                <div>
                  <h4 style={{color: "#dd0031"}}>Sessions</h4>
                  <h1>{dayInfoData && dayInfoData.sessionNb}</h1>
                </div>
                <DataThresholdingRoundedIcon fontSize="large" />
              </div>
            </Paper>
          </Grid>
        </Grid>

        <Grid item xs={9}>
          {" "}
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
              <IconButton onClick={barBack}>
                <ArrowBackIcon />
              </IconButton>

              <IconButton onClick={barNext}>
                <ArrowForwardIcon />
              </IconButton>
            </div>
            <BarChartPage
              data={dayViewsChartData.slice(
                barNum * rowsPerPage,
                barNum * rowsPerPage + rowsPerPage
              )}
              field="views"
              title={"Views/Day"}
            />{" "}
          </Paper>
        </Grid>
        <Grid container item xs={3} mt={6}>
          <Grid item xs={12}>
            <Paper elevation={6}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0 20px",
                }}>
                <div>
                  <h4 style={{color: "#dd0031"}}>Time</h4>
                  <h1>
                    {dayInfoData &&
                      `${new Date(parseInt(dayInfoData.time) * 1000)
                        .toISOString()
                        .slice(11, 19)}
                    `}
                  </h1>
                </div>
                <AccessTimeFilledRoundedIcon fontSize="large" />
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={6}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0 20px",
                }}>
                <div>
                  <h4 style={{color: "#dd0031"}}>Session AVG</h4>
                  <h1>
                    {dayInfoData &&
                      `
                    ${new Date(parseInt(dayInfoData.sessionAvg) * 1000)
                      .toISOString()
                      .slice(11, 19)}
                      `}
                  </h1>
                </div>
                <TimelineRoundedIcon fontSize="large" />
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
