import * as React from "react";
import {styled, createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  mainListItems,
  secondaryListItems,
} from "../Components/AppBar/listItems";
import {Navbar} from "../Components/AppBar/Navbar";
import {Sidebar} from "../Components/AppBar/Sidebar";
import {
  getAggBarChartData,
  getAggTableData,
  getFilterEventTableData,
  getFilterSearchTableData,
  getFullPageData,
  getGroupEventTableData,
  getGroupPieChartData,
  getPinPieChartData,
  getPinTableData,
  getSearchTableData,
  getSelectBarChartData,
  getSelectPieChartData,
  getSortData,
  getSortPieChartData,
} from "../service/pageService";
import BarChartPage from "../Components/Chart/BarChart";
import LineChartPage from "../Components/Chart/LineChart";
import PieRechartComponent from "../Components/Chart/PieChart";
import {useParams} from "react-router-dom";
import DataTable from "../Components/DataTable";

const reduceArray = (tab, field) => {
  return tab.reduce((group, tx) => {
    const value = tx[field].split("T")[0];
    group[value] = group[value] ?? [];
    group[value].push(tx);
    return group;
  }, {});
};

export const EventsPage = () => {
  const {page} = useParams();
  const [open, setOpen] = React.useState(true);
  const [pageData, setPageData] = React.useState(null);
  const [filterTableData, setFilterTableData] = React.useState();
  const [groupTableData, setGroupTableData] = React.useState();
  const [groupPieChart, setGroupPieChart] = React.useState([]);
  const [searchTableData, setSearchTableData] = React.useState([]);
  const [filterSearchTableData, setFilterSearchTableData] = React.useState([]);
  const [selectPieData, setSelectPieData] = React.useState([]);
  const [selectBarData, setSelectBarData] = React.useState([]);
  const [sortPieData, setSortPieData] = React.useState([]);
  const [sortTableData, setSortTableData] = React.useState([]);
  const [aggBarData, setAggBarData] = React.useState([]);
  const [aggTableData, setAggTableData] = React.useState([]);
  const [pinChartData, setPinChartData] = React.useState([]);
  const [pinTableData, setPinTableData] = React.useState([]);

  React.useEffect(() => {
    if (page) {
      getFullPageData(page).then((pageData) => {
        setPageData(pageData);
      });
      getFilterEventTableData(page).then((res) => {
        setFilterTableData(res);
      });
      getGroupEventTableData(page).then((res) => {
        setGroupTableData(res);
      });
      getGroupPieChartData(page).then((res) => {
        setGroupPieChart(res);
      });
      getSearchTableData(page).then((res) => {
        setSearchTableData(res);
      });
      getFilterSearchTableData(page).then((res) => {
        setFilterSearchTableData(res);
      });
      getSelectPieChartData(page).then((res) => {
        setSelectPieData(res);
      });
      getSelectBarChartData(page).then((res) => {
        setSelectBarData(res);
      });
      getSortPieChartData(page).then((res) => {
        setSortPieData(res);
      });
      getSortData(page).then((res) => {
        setSortTableData(res);
      });
      getAggBarChartData(page).then((res) => {
        setAggBarData(res);
      });
      getAggTableData(page).then((res) => {
        setAggTableData(res);
      });
      getPinPieChartData(page).then((res) => {
        setPinChartData(res);
      });
      getPinTableData(page).then((res) => {
        setPinTableData(res);
      });
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

  const SearchPieData = () => {
    const Events = [
      pageData.searchEvent.length,
      pageData.FilterSearchEvent.length,
    ];
    const total = Events.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0
    );

    const res = [
      {
        name: "searchAccountEvent",
        value: (pageData.searchEvent.length / total) * 100,
      },
      {
        name: "FilterSearchEvent",
        value: (pageData.FilterSearchEvent.length / total) * 100,
      },
    ];
    return res;
  };

  const FilterPieData = () => {
    const Events = [
      pageData.checkfilterEvent.length,
      pageData.filterEvent.length,
    ];
    const total = Events.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0
    );

    const res = [
      {
        name: "checkfilterEvent",
        value: (pageData.checkfilterEvent.length / total).toFixed(2) * 100,
      },
      {
        name: "filterEvent",
        value: (pageData.filterEvent.length / total).toFixed(2) * 100,
      },
    ];
    return res;
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
              width={500}
              height={330}
            />
          </Paper>
        </Grid>
      </Grid>

      <Grid
        container
        xs={12}
        sx={{marginTop: "20px", backgroundColor: "#fafafa"}}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 500,
            width: "100%",
          }}>
          <Grid item sx={{padding: "20px"}}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
              align="left"
              style={{color: "#dd0031"}}>
              Filter Event :
            </Typography>{" "}
          </Grid>
          <Grid container item spacing={3} lg={12}>
            <Grid item xs={12} md={6} lg={5}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 376,
                }}
                elevation={6}>
                <PieRechartComponent
                  colors={["#dd0031", "#a3a2a2"]}
                  data={pageData ? FilterPieData() : []}
                  width={420}
                  height={400}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={8} lg={7}>
              {filterTableData && (
                <DataTable
                  headerNames={["Filter By", "Type Filter", "Side Bar", "Nb"]}
                  tableData={filterTableData}
                />
              )}
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <Grid container sx={{marginTop: "20px"}}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 500,
            width: "100%",
          }}>
          <Grid item sx={{padding: "10px"}}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
              align="left"
              style={{color: "#dd0031"}}>
              Group Event :
            </Typography>{" "}
          </Grid>
          <Grid container item spacing={3} lg={12}>
            <Grid item xs={12} md={6} lg={5}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 376,
                }}
                elevation={6}>
                <PieRechartComponent
                  colors={[
                    "#dd0031",
                    "#a3a2a2",
                    "#FFBB28",
                    "#FF8042",
                    "#AF19FF",
                  ]}
                  data={groupPieChart}
                  width={420}
                  height={400}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={8} lg={7}>
              {groupTableData && (
                <DataTable
                  headerNames={["Group By ", "Side Bar", "Nb"]}
                  tableData={groupTableData}
                />
              )}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid container sx={{marginTop: "20px"}}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 570,
            width: "100%",
          }}>
          <Grid item sx={{padding: "20px"}}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
              align="left"
              style={{color: "#dd0031"}}>
              Search Event :
            </Typography>{" "}
          </Grid>
          <Grid container item xs={12} spacing={2}>
            <Grid item xs={12} md={6} lg={4}>
              <Paper style={{height: "458px"}} elevation={6}>
                <div style={{color: "transparent"}}>lol</div>
                <PieRechartComponent
                  colors={[
                    "#dd0031",
                    "#a3a2a2",
                    "#FFBB28",
                    "#FF8042",
                    "#AF19FF",
                  ]}
                  data={pageData ? SearchPieData() : []}
                  width={350}
                  height={430}
                  location="bottom"
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              {searchTableData && (
                <DataTable
                  headerNames={["Nombre Par Session", "Nb"]}
                  tableData={searchTableData}
                  title="Search By Account"
                />
              )}
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              {filterSearchTableData && (
                <DataTable
                  headerNames={["Nombre Par Session", "Nb"]}
                  tableData={filterSearchTableData}
                  title="Search by headerName"
                />
              )}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid container sx={{marginTop: "20px"}}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 500,
            width: "100%",
          }}>
          <Grid item sx={{padding: "20px"}}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
              align="left"
              style={{color: "#dd0031"}}>
              Select Event :
            </Typography>{" "}
          </Grid>
          <Grid container item xs={12} spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <Paper elevation={6}>
                <PieRechartComponent
                  data={selectPieData}
                  colors={[
                    "#dd0031",
                    "#a3a2a2",
                    "#FFBB28",
                    "#FF8042",
                    "#AF19FF",
                  ]}
                  width={420}
                  height={380}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Paper>
                <Paper
                  sx={{
                    p: 2,
                    mt: 1,
                    display: "flex",
                    flexDirection: "column",
                    height: 380,
                  }}
                  elevation={6}>
                  <BarChartPage data={selectBarData} field={"nb"} />
                </Paper>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid container sx={{marginTop: "20px"}}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 500,
            width: "100%",
          }}>
          {" "}
          <Grid item sx={{padding: "20px"}}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
              align="left"
              style={{color: "#dd0031"}}>
              Filter Event :
            </Typography>{" "}
          </Grid>
          <Grid container item spacing={3} lg={12}>
            <Grid item xs={12} md={6} lg={5}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 376,
                }}
                elevation={6}>
                <PieRechartComponent
                  data={sortPieData}
                  colors={[
                    "#dd0031",
                    "#a3a2a2",
                    "#FFBB28",
                    "#FF8042",
                    "#AF19FF",
                  ]}
                  width={420}
                  height={400}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={8} lg={7}>
              {sortTableData && (
                <DataTable
                  headerNames={["Field Name", "Sort By", "Nb"]}
                  tableData={sortTableData}
                />
              )}
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <Grid container sx={{marginTop: "20px"}}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 500,
            width: "100%",
          }}>
          <Grid item sx={{padding: "20px"}}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
              align="left"
              style={{color: "#dd0031"}}>
              Agg Event :
            </Typography>{" "}
          </Grid>
          <Grid container item spacing={3} lg={12}>
            <Grid item xs={12} md={6} lg={5}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 376,
                }}
                elevation={6}>
                <BarChartPage data={aggBarData} field={"nb"} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={7}>
              {aggTableData && (
                <DataTable
                  headerNames={["Agg by", "Function", "Nb"]}
                  tableData={aggTableData}
                />
              )}
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <Grid container sx={{marginTop: "20px"}}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 500,
            width: "100%",
            backgroundColor: "#fff",
          }}>
          <Grid item sx={{padding: "20px"}}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
              align="left"
              style={{color: "#dd0031"}}>
              Pin Event :
            </Typography>{" "}
          </Grid>
          <Grid container item spacing={3} lg={12}>
            <Grid item xs={12} md={6} lg={5}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 376,
                }}
                elevation={6}>
                <PieRechartComponent
                  data={pinChartData}
                  colors={[
                    "#dd0031",
                    "#a3a2a2",
                    "#FFBB28",
                    "#FF8042",
                    "#AF19FF",
                  ]}
                  width={420}
                  height={400}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={7}>
              {pinTableData && (
                <DataTable
                  headerNames={["Pinned by", "Function", "Nb"]}
                  tableData={pinTableData}
                />
              )}{" "}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
};
