import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";

export default function SideBarListItem(props) {
  const {pageName, eventNames} = props;
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <AutoAwesomeMotionIcon />
        </ListItemIcon>
        <ListItemText primary={pageName} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {eventNames.map((el) => (
            <ListItemButton key={el} sx={{pl: 4}}>
              <ListItemIcon>
                <AutoGraphIcon />
              </ListItemIcon>
              <ListItemText primary={el} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  );
}
