import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
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
import {useAppContext} from "../provider/AppProvider";

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
  const {events} = useAppContext();

  console.log("events ", events);
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
    let Events = [];
    if (events.search.isActive)
      Events = [...Events, ...pageData.FilterSearchEvent];
    if (events.pin.isActive) Events = [...Events, ...pageData.PinnedEvent];

    if (events.agg.isActive) Events = [...Events, ...pageData.aggEvent];

    if (events.filter.isActive)
      if (events.filter.isActive) Events = [...Events, ...pageData.filterEvent];
    if (events.group.isActive) Events = [...Events, ...pageData.groupEvent];

    if (events.search.isActive) Events = [...Events, ...pageData.searchEvent];

    if (events.select.isActive) Events = [...Events, ...pageData.selectEvent];

    if (events.sort.isActive) Events = [...Events, ...pageData.sortEvent];

    console.log("lol sana ", Events);

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
    const Events = [];
    if (events.search.isActive) Events.push(pageData.FilterSearchEvent.length);
    if (events.pin.isActive) Events.push(pageData.PinnedEvent.length);
    if (events.agg.isActive) Events.push(pageData.aggEvent.length);
    if (events.filter.isActive) Events.push(pageData.checkfilterEvent.length);
    if (events.filter.isActive) Events.push(pageData.filterEvent.length);
    if (events.group.isActive) Events.push(pageData.groupEvent.length);
    if (events.search.isActive) Events.push(pageData.searchEvent.length);
    if (events.select.isActive) Events.push(pageData.selectEvent.length);
    if (events.sort.isActive) Events.push(pageData.sortEvent.length);

    const total = Events.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0
    );

    const res = [];
    if (events.search.isActive)
      res.push({
        name: "FilterSearchEvent",
        value: (pageData.FilterSearchEvent.length / total).toFixed(2) * 100,
      });
    if (events.pin.isActive)
      res.push({
        name: "PinnedEvent",
        value: (pageData.PinnedEvent.length / total).toFixed(2) * 100,
      });
    if (events.agg.isActive)
      res.push({
        name: "aggEvent",
        value: (pageData.aggEvent.length / total).toFixed(2) * 100,
      });
    if (events.filter.isActive)
      res.push({
        name: "checkfilterEvent",
        value: (pageData.checkfilterEvent.length / total).toFixed(2) * 100,
      });
    if (events.filter.isActive)
      res.push({
        name: "filterEvent",
        value: (pageData.filterEvent.length / total).toFixed(2) * 100,
      });
    if (events.group.isActive)
      res.push({
        name: "groupEvent",
        value: (pageData.groupEvent.length / total).toFixed(2) * 100,
      });
    if (events.search.isActive)
      res.push({
        name: "searchEvent",
        value: (pageData.searchEvent.length / total).toFixed(2) * 100,
      });
    if (events.select.isActive)
      res.push({
        name: "selectEvent",
        value: (pageData.selectEvent.length / total).toFixed(2) * 100,
      });
    if (events.sort.isActive)
      res.push({
        name: "sortEvent",
        value: (pageData.sortEvent.length / total).toFixed(2) * 100,
      });
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
        name: "Check filter",
        value: (pageData.checkfilterEvent.length / total).toFixed(2) * 100,
      },
      {
        name: "HeaderName Filter",
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
              title={"Number of Events on page"}
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
              title={"Percentage of Events on Page "}
              data={pageData ? EventPrctg() : []}
              width={500}
              height={330}
            />
          </Paper>
        </Grid>
      </Grid>
      {events.filter.isActive &&
        (events.filter.data.chart || events.filter.data.table) && (
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
                {events.filter.data.chart && (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    lg={events.filter.data.table ? 5 : 12}>
                    <Paper
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        height: 376,
                      }}
                      elevation={6}>
                      <div style={{maxWidth: "400px", margin: "auto"}}>
                        <PieRechartComponent
                          colors={["#d00331", "#656768"]}
                          data={pageData ? FilterPieData() : []}
                          width={420}
                          height={400}
                        />
                      </div>
                    </Paper>
                  </Grid>
                )}

                <Grid
                  item
                  xs={12}
                  md={8}
                  lg={events.filter.data.chart ? 7 : 12}>
                  {filterTableData && events.filter.data.table && (
                    <DataTable
                      headerNames={[
                        "Filter By",
                        "Type Filter",
                        "Side Bar",
                        "Nb",
                      ]}
                      tableData={filterTableData}
                    />
                  )}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        )}

      {events.group.isActive &&
        (events.group.data.chart || events.group.data.table) && (
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
                {events.group.data.chart && (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    lg={events.group.data.table ? 5 : 12}>
                    <Paper
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        height: 376,
                      }}
                      elevation={6}>
                      <PieRechartComponent
                        colors={["#f13636", "#34c3e7"]}
                        data={groupPieChart}
                        width={420}
                        height={400}
                      />
                    </Paper>
                  </Grid>
                )}
                <Grid item xs={12} md={8} lg={events.group.data.chart ? 7 : 12}>
                  {groupTableData && events.group.data.table && (
                    <DataTable
                      headerNames={["Group By ", "Side Bar", "Nb"]}
                      tableData={groupTableData}
                    />
                  )}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        )}

      {events.search.isActive &&
        (events.search.data.chart || events.search.data.table) && (
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
                {events.search.data.chart && (
                  <Grid item xs={12} md={6} lg={4}>
                    <Paper style={{height: "458px"}} elevation={6}>
                      <div style={{color: "transparent"}}>lol</div>
                      <PieRechartComponent
                        colors={["#f13636", "#34c3e7"]}
                        data={pageData ? SearchPieData() : []}
                        width={350}
                        height={380}
                        location="bottom"
                      />
                    </Paper>
                  </Grid>
                )}

                <Grid item xs={12} md={6} lg={4}>
                  {searchTableData && events.search.data.tableAccount && (
                    <DataTable
                      headerNames={["Nombre Par Session", "Nb"]}
                      tableData={searchTableData}
                      title="Search By Account"
                    />
                  )}
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  {filterSearchTableData && events.search.data.tableHeader && (
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
        )}

      {events.select.isActive &&
        (events.select.data.chart || events.select.data.table) && (
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
                {events.select.data.chart && (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    lg={events.select.data.table ? 5 : 12}>
                    <Paper elevation={6}>
                      <PieRechartComponent
                        data={selectPieData}
                        colors={["#f13636", "#34c3e7"]}
                        width={420}
                        height={350}
                      />
                    </Paper>
                  </Grid>
                )}
                {events.select.data.table && (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    lg={events.select.data.chart ? 7 : 12}>
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
                )}
              </Grid>
            </Paper>
          </Grid>
        )}
      {events.sort.isActive &&
        (events.sort.data.chart || events.sort.data.table) && (
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
                  Sort Event :
                </Typography>{" "}
              </Grid>
              <Grid container item spacing={3} lg={12}>
                {events.sort.data.chart && (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    lg={events.sort.data.table ? 5 : 12}>
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
                        colors={["#f13636", "#34c3e7"]}
                        width={420}
                        height={400}
                      />
                    </Paper>
                  </Grid>
                )}
                <Grid item xs={12} md={8} lg={events.sort.data.chart ? 7 : 12}>
                  {sortTableData && events.sort.data.table && (
                    <DataTable
                      headerNames={["Field Name", "Sort By", "Nb"]}
                      tableData={sortTableData}
                    />
                  )}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        )}

      {events.agg.isActive && (events.agg.data.chart || events.agg.data.table) && (
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
              {events.agg.data.chart && (
                <Grid item xs={12} md={6} lg={events.agg.data.table ? 5 : 12}>
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
              )}

              <Grid item xs={12} md={6} lg={events.agg.data.chart ? 7 : 12}>
                {aggTableData && events.agg.data.table && (
                  <DataTable
                    headerNames={["Agg by", "Function", "Nb"]}
                    tableData={aggTableData}
                  />
                )}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      )}

      {events.pin.isActive && (events.pin.data.chart || events.pin.data.table) && (
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
              {events.pin.data.chart && (
                <Grid item xs={12} md={6} lg={events.pin.data.table ? 5 : 12}>
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
                      colors={["#f13636", "#34c3e7"]}
                      width={420}
                      height={400}
                    />
                  </Paper>
                </Grid>
              )}
              <Grid item xs={12} md={6} lg={events.pin.data.chart ? 7 : 12}>
                {pinTableData && events.pin.data.table && (
                  <DataTable
                    headerNames={["Pinned by", "Function", "Nb"]}
                    tableData={pinTableData}
                  />
                )}{" "}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      )}
    </div>
  );
};
