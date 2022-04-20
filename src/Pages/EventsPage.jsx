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
        console.log("lol sana ", res);
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
    const res = Object.keys(reducedEvents).map((el) => {
      return {
        name: el,
        data: reducedEvents[el].length,
      };
    });
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
        value: (pageData.FilterSearchEvent.length / total) * 100,
      },
      {
        name: "PinnedEvent",
        value: (pageData.PinnedEvent.length / total) * 100,
      },
      {
        name: "aggEvent",
        value: (pageData.aggEvent.length / total) * 100,
      },
      {
        name: "checkfilterEvent",
        value: (pageData.checkfilterEvent.length / total) * 100,
      },
      {
        name: "filterEvent",
        value: (pageData.filterEvent.length / total) * 100,
      },
      {
        name: "groupEvent",
        value: (pageData.groupEvent.length / total) * 100,
      },
      {
        name: "searchEvent",
        value: (pageData.searchEvent.length / total) * 100,
      },
      {
        name: "selectEvent",
        value: (pageData.selectEvent.length / total) * 100,
      },
      {
        name: "sortEvent",
        value: (pageData.sortEvent.length / total) * 100,
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
        value: (pageData.checkfilterEvent.length / total) * 100,
      },
      {
        name: "filterEvent",
        value: (pageData.filterEvent.length / total) * 100,
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
            }}>
            <LineChartPage
              data={pageData ? groupEventsByDate() : []}
              dataKey="data"
              title={"Time/Page"}
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
            }}>
            <PieRechartComponent
              title={"Events"}
              data={pageData ? EventPrctg() : []}
            />
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{marginTop: "20px"}}>
        <Grid item xs={12} md={6} lg={5}>
          <Paper>
            <PieRechartComponent data={pageData ? FilterPieData() : []} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8} lg={7}>
          <Paper>
            {filterTableData && (
              <DataTable
                headerNames={["Filter By", "Type Filter", "Side Bar", "Nb"]}
                tableData={filterTableData}
              />
            )}
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{marginTop: "20px"}}>
        <Grid item xs={12} md={6} lg={5}>
          <Paper>
            <PieRechartComponent data={groupPieChart} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8} lg={7}>
          <Paper>
            {groupTableData && (
              <DataTable
                headerNames={["Group By ", "Side Bar", "Nb"]}
                tableData={groupTableData}
              />
            )}
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{marginTop: "20px"}}>
        <Grid item xs={12} md={6} lg={4}>
          <Paper>
            <PieRechartComponent data={pageData ? SearchPieData() : []} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper>
            Yassine
            {searchTableData && (
              <DataTable
                headerNames={["Nombre Par Session", "Nb"]}
                tableData={searchTableData}
              />
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper>
            Rapport
            {filterSearchTableData && (
              <DataTable
                headerNames={["Nombre Par Session", "Nb"]}
                tableData={filterSearchTableData}
              />
            )}
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{marginTop: "20px"}}>
        <Grid item xs={12} md={6} lg={6}>
          <Paper>
            <PieRechartComponent data={selectPieData} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Paper>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 400,
              }}>
              <BarChartPage data={selectBarData} field={"nb"} />
            </Paper>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{marginTop: "20px"}}>
        <Grid item xs={12} md={6} lg={6}>
          <Paper>
            <PieRechartComponent data={sortPieData} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Paper>
            {sortTableData && (
              <DataTable
                headerNames={["Field Name", "Sort By", "Nb"]}
                tableData={sortTableData}
              />
            )}
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{marginTop: "20px"}}>
        <Grid item xs={12} md={6} lg={6}>
          <Paper>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 400,
              }}>
              <BarChartPage
                data={aggBarData}
                field={"nb"}
                title={"Views/Page"}
              />
            </Paper>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Paper>
            {aggTableData && (
              <DataTable
                headerNames={["Agg by", "Function", "Nb"]}
                tableData={aggTableData}
              />
            )}
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{marginTop: "20px"}}>
        <Grid item xs={12} md={6} lg={6}>
          <Paper>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 400,
              }}>
              <PieRechartComponent data={pinChartData} />
            </Paper>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Paper>
            {pinTableData && (
              <DataTable
                headerNames={["Agg by", "Function", "Nb"]}
                tableData={pinTableData}
              />
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
