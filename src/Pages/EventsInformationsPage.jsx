import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
  getDayViewsPageChartData,
  getFullPageData,
  getinfoPage,
  getSessionTimeChartData,
} from "../service/pageService";
import BarChartPage from "../Components/Chart/BarChart";
import LineChartPage from "../Components/Chart/LineChart";
import {Button, IconButton} from "@mui/material";
import PieRechartComponent from "../Components/Chart/PieChart";
import DataThresholdingRoundedIcon from "@mui/icons-material/DataThresholdingRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {useParams} from "react-router-dom";

const reduceArray = (tab, field) => {
  return tab.reduce((group, tx) => {
    const value = tx[field].split("T")[0];
    group[value] = group[value] ?? [];
    group[value].push(tx);
    return group;
  }, {});
};

export const EventsInformationsPage = () => {
  const {page} = useParams();
  const [pageData, setPageData] = React.useState(null);
  const [dayTimeChartData, setDayTimeChartData] = React.useState([]);
  const [dayViewsChartData, setDayViewsChartData] = React.useState([]);
  const [dayInfoData, setDayInfoData] = React.useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [pageNum, setPageNum] = React.useState(0);
  const [barNum, setbarNum] = React.useState(0);

  React.useEffect(() => {
    if (page) {
      getFullPageData(page).then((pageData) => {
        setPageData(pageData);
      });
      getSessionTimeChartData(page).then((res) => setDayTimeChartData(res));
      getDayViewsPageChartData(page).then((res) => setDayViewsChartData(res));
      getinfoPage(page).then((res) => setDayInfoData(res));
    }
  }, [page]);

  const groupEventsByDate = () => {
    const Events = [
      ...pageData.FilterSearchEvent,
      ...pageData.PinnedEvent,
      ...pageData.aggEvent,
      ...pageData.checkfilterEvent,
      ...pageData.filterEvent,
      ...pageData.groupEvent,
      ...pageData.searchEvent,
      ...pageData.selectEvent,
      ...pageData.sortEvent,
    ];

    const reducedEvents = reduceArray(Events, "createdAt");
    let res = Object.keys(reducedEvents).map((el) => {
      return {
        name: el,
        "Number of Events": reducedEvents[el].length,
      };
    });
    res = res.sort((e1, e2) => (e1.name > e2.name ? 1 : -1));
    return res;
  };
  const EventPrctg = () => {
    const Events = [
      pageData.FilterSearchEvent.length,
      pageData.PinnedEvent.length,
      pageData.aggEvent.length,
      pageData.checkfilterEvent.length,
      pageData.filterEvent.length,
      pageData.groupEvent.length,
      pageData.searchEvent.length,
      pageData.selectEvent.length,
      pageData.sortEvent.length,
    ];
    const total = Events.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0
    );

    const res = [
      {
        name: "FilterSearchEvent",
        value: (pageData.FilterSearchEvent.length / total).toFixed(2) * 100,
      },
      {
        name: "PinnedEvent",
        value: (pageData.PinnedEvent.length / total).toFixed(2) * 100,
      },
      {
        name: "aggEvent",
        value: (pageData.aggEvent.length / total).toFixed(2) * 100,
      },
      {
        name: "checkfilterEvent",
        value: (pageData.checkfilterEvent.length / total).toFixed(2) * 100,
      },
      {
        name: "filterEvent",
        value: (pageData.filterEvent.length / total).toFixed(2) * 100,
      },
      {
        name: "groupEvent",
        value: (pageData.groupEvent.length / total).toFixed(2) * 100,
      },
      {
        name: "searchEvent",
        value: (pageData.searchEvent.length / total).toFixed(2) * 100,
      },
      {
        name: "selectEvent",
        value: (pageData.selectEvent.length / total).toFixed(2) * 100,
      },
      {
        name: "sortEvent",
        value: (pageData.sortEvent.length / total).toFixed(2) * 100,
      },
    ];
    return res;
  };

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
    if (dayViewsChartData.length / rowsPerPage > barNum + 1)
      setbarNum(barNum + 1);
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
            <BarChartPage
              data={pageData ? groupEventsByDate() : []}
              title={"Events/Page"}
              field={"Number of Events"}
              pagination
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 400,
            }}
            elevation={6}>
            <PieRechartComponent
              colors={[
                "#0088FE",
                "#00C49F",
                "#FFBB28",
                "#c07575",
                "#FF8042",
                "#AF19FF",
                "#2fc4d1",
                "#ff2869",
                "#91a00f",
              ]}
              title={"Events/Page"}
              data={pageData ? EventPrctg() : []}
              width={450}
              height={330}
              align="right"
            />
          </Paper>
        </Grid>
      </Grid>

      <Grid container item xs={12} spacing={3} mt={1} mb={3}>
        <Grid item xs={3}>
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
                    `${new Date(parseInt(dayInfoData.time))
                      .toISOString()
                      .slice(11, 19)}
                    `}
                </h1>
              </div>
              <AccessTimeFilledRoundedIcon fontSize="large" />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={3}>
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
        <Grid item xs={3}>
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
        <Grid item xs={3}>
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
                pageNum * rowsPerPage,
                pageNum * rowsPerPage + rowsPerPage
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
            <BarChartPage
              data={dayViewsChartData}
              field="views"
              title={"Views/Day"}
              pagination
            />{" "}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
