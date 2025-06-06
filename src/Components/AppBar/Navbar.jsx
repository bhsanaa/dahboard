import React from "react";
import {styled} from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountMenu from "./AccountMenu";
import {red} from "@mui/material/colors";
import {useAppContext} from "../../provider/AppProvider";

const drawerWidth = 250;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({theme, open}) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const Navbar = (props) => {
  const {loggedIn} = useAppContext();

  const {open, toggleDrawer} = props;

  return (
    <>
      <AppBar position="absolute" open={open} elevation={0}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
            backgroundColor: "white",
            boxShadow: "0px",
          }}>
          {loggedIn !== "" && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                color: "#000000",
                marginRight: "36px",
                ...(open && {display: "none"}),
              }}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            component="h1"
            variant="h5"
            color={"#dd0031"}
            noWrap
            sx={{flexGrow: 2}}>
            <b> Accumen Analytic Dashboard</b>
          </Typography>
          {loggedIn !== "" && <AccountMenu />}
        </Toolbar>
      </AppBar>
    </>
  );
};
