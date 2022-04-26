import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {Link} from "react-router-dom";
import AssessmentIcon from "@mui/icons-material/Assessment";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleIcon from "@mui/icons-material/Article";

export default function SideBarListItem(props) {
  const {pageName, pageId} = props;
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <ArticleIcon />
        </ListItemIcon>
        <ListItemText primary={pageName} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link
            to={"/" + pageId}
            style={{textDecoration: "none", color: "inherit"}}>
            <ListItemButton
              style={
                open
                  ? {
                      margin: "0 20px",
                    }
                  : {
                      margin: "0",
                    }
              }>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Page Information" />
            </ListItemButton>
          </Link>
          <Link
            to={"/" + pageId + "/event"}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}>
            <ListItemButton
              style={
                open
                  ? {
                      margin: "0 20px",
                    }
                  : {
                      margin: "0",
                    }
              }>
              <ListItemIcon>
                <AssessmentIcon />
              </ListItemIcon>
              <ListItemText primary="Events" />
            </ListItemButton>
          </Link>
        </List>
      </Collapse>
    </>
  );
}
