import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import {Link, useNavigate} from "react-router-dom";
import {useAppContext} from "../../provider/AppProvider";
import jwt_decode from "jwt-decode";

export default function AccountMenu() {
  const {setLoggedIn, loggedIn} = useAppContext();
  let navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{display: "flex", alignItems: "center", textAlign: "center"}}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ml: 2}}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}>
            <Avatar sx={{width: 32, height: 32}}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{horizontal: "right", vertical: "top"}}
        anchorOrigin={{horizontal: "right", vertical: "bottom"}}>
        {loggedIn === "" ? (
          <Link to="/signin" style={{color: "inherit", textDecoration: "none"}}>
            <MenuItem>
              <ListItemIcon>
                <LoginIcon fontSize="medium" />
              </ListItemIcon>
              Sign In
            </MenuItem>
          </Link>
        ) : (
          <div>
            <>
              <Link
                to="/settings"
                style={{color: "inherit", textDecoration: "none"}}>
                <MenuItem>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
              </Link>

              <MenuItem
                onClick={() => {
                  if (jwt_decode(loggedIn).role === "user") navigate(`/signin`);
                  if (jwt_decode(loggedIn).role === "admin") setLoggedIn("");
                  setLoggedIn("");

                  navigate(`/admin/signin`);
                }}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </>
          </div>
        )}
      </Menu>
    </React.Fragment>
  );
}
