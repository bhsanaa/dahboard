import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {requestCompanyResetPassword} from "../../service/authService";
import {useLocation} from "react-router-dom";

export default function ForgotPassword() {
  const {pathname} = useLocation();

  const [values, setValues] = React.useState({
    email: null,
  });

  const onChange = (e) => {
    setValues({email: e.target.value});
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    if (!values.email) {
      return;
    }
    let res = null;
    res = await requestCompanyResetPassword("bhsana57@gmail.com");
    console.log("res ", res);
    // @ts-ignore
  };

  return (
    <Grid container component="main" sx={{height: "93vh"}}>
      <CssBaseline />
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        component={Paper}
        square
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#ededed",
        }}>
        <Paper
          sx={{
            my: 20,
            mx: 4,
            padding: "20px 30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          elevation={6}>
          <Typography component="h1" variant="h5">
            Forgot Password ?
          </Typography>
          <Box component="form" noValidate sx={{mt: 1}}>
            <TextField
              margin="normal"
              fullWidth
              name="email"
              label="Enter Your Email"
              id="password"
              autoComplete="current-password"
              onChange={onChange}
              color="secondary"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2}}
              onClick={resetPassword}
              color="secondary">
              Send Reset Email
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
