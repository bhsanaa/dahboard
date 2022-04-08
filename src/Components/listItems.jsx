import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import {getAllEventNames, getAllPageNames} from "../service/pageService";
import SideBarListItem from "./SideBarListItem";

export const MainListItems = () => {
  const [pageNames, setPageNames] = React.useState([]);
  const [eventNames, setEventNames] = React.useState([]);

  React.useEffect(() => {
    getAllPageNames().then((res) => setPageNames(res));
    getAllEventNames().then((res) => setEventNames(res));
  }, []);

  return (
    <React.Fragment>
      <ListItemButton>
        <ListItemText primary="General Information" sx={{marginLeft: "20px"}} />
      </ListItemButton>
      {pageNames &&
        pageNames.map((item) => (
          <SideBarListItem key={item} pageName={item} eventNames={eventNames} />
        ))}
    </React.Fragment>
  );
};

export const SecondaryListItems = () => {
  return (
    <React.Fragment>
      <ListSubheader component="div" inset>
        Saved reports{" "}
      </ListSubheader>{" "}
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>{" "}
        <ListItemText primary="Current month" />
      </ListItemButton>{" "}
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>{" "}
        <ListItemText primary="Last quarter" />
      </ListItemButton>{" "}
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>{" "}
        <ListItemText primary="Year-end sale" />
      </ListItemButton>{" "}
    </React.Fragment>
  );
};
