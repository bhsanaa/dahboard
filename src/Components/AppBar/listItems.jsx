import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import AssignmentIcon from "@mui/icons-material/Assignment";
import {getAllEventNames, getAllPages} from "../../service/pageService";
import SideBarListItem from "./SideBarListItem";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import {Link} from "react-router-dom";

export const MainListItems = () => {
  const [pageNames, setPageNames] = React.useState([]);

  React.useEffect(() => {
    getAllPages().then((res) => setPageNames(res));
  }, []);
  return (
    <React.Fragment>
      <Link to={"/"} style={{textDecoration: "none", color: "inherit"}}>
        <ListItemButton>
          <ListItemIcon>
            <AutoAwesomeMosaicIcon />
          </ListItemIcon>
          <ListItemText primary="General Information" />
        </ListItemButton>
      </Link>

      {pageNames &&
        pageNames.map((item) => (
          <>
            <SideBarListItem
              key={item._id}
              pageName={item.name}
              pageId={item._id}
            />
          </>
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
