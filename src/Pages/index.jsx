import * as React from "react";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import {Navbar} from "../Components/AppBar/Navbar";
import {Sidebar} from "../Components/AppBar/Sidebar";
import AppRouter from "../Router/UserRouter";
import {useAppContext} from "../provider/AppProvider";
import CustomizedSnackbars from "../Components/Snackbar";
import jwt_decode from "jwt-decode";

const mdTheme = createTheme();
function DashboardContent() {
  const {loggedIn} = useAppContext();

  const [open, setOpen] = React.useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{display: "flex"}}>
        <CssBaseline />
        <>
          <Navbar
            toggleDrawer={toggleDrawer}
            open={loggedIn === "" ? false : !open}
          />
          {loggedIn !== "" && jwt_decode(loggedIn).role === "user" && (
            <Sidebar toggleDrawer={toggleDrawer} open={!open} />
          )}
        </>

        <Box
          component="main"
          sx={{
            backgroundColor: "#efefef",
            flexGrow: 1,
            height: "auto",
            minHeight: "100vh",
            overflow: "auto",
          }}>
          <Toolbar />
          <Container maxWidth="lg" sx={{pt: 4, pb: 4}}>
            <AppRouter />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
