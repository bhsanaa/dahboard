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
import {getFullPageData} from "../service/pageService";
import BarChartPage from "../Components/Chart/BarChart";
import LineChartPage from "../Components/Chart/LineChart";
import PieRechartComponent from "../Components/Chart/PieChart";
import {useParams} from "react-router-dom";

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

  React.useEffect(() => {
    if (page) {
      getFullPageData(page).then((pageData) => {
        setPageData(pageData);
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
            <PieRechartComponent data={pageData ? EventPrctg() : []} />
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{marginTop: "20px"}}>
        <Grid item xs={12} md={6} lg={6}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 400,
            }}>
            <PieRechartComponent data={pageData ? FilterPieData() : []} />
          </Paper>
        </Grid>
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
      </Grid>
    </div>
  );
};
