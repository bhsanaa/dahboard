import {useEffect, useState} from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {getUserById} from "../service/authService";
import {useAppContext} from "../provider/AppProvider";
import {Paper} from "@mui/material";
import jwt_decode from "jwt-decode";
import {withStyles} from "@material-ui/core/styles";
import styled from "@emotion/styled";

const theme = createTheme();

const CustomDisableInput = styled(TextField)(() => ({
  ".MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "#000",
    color: "#000",
    borderColor: "black",
  },
}));

export default function ConsultAccount() {
  const {loggedIn} = useAppContext();
  const [values, setValues] = useState({});

  useEffect(() => {
    if (loggedIn) {
      const id = jwt_decode(loggedIn).id;
      getUserById(id).then((res) => {
        console.log(res);
        setValues({
          username: res.username,
          email: res.email,
          title: res.title,
          departement: res.departement,
        });
      });
    }
  }, [loggedIn]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const onChange = (e) => {
    setValues({...values});
  };

  const DarkerDisabledTextField = withStyles({
    root: {
      marginRight: 8,
      "& .MuiInputBase-root.Mui-disabled": {
        color: "rgba(0, 0, 0, 0.6)", // (default alpha is 0.38)
      },
    },
  })(TextField);
  return (
    <ThemeProvider theme={theme}>
      <Container component="Paper" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            padding: "10px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 10,
            boxShadow: "0px 0px 5px black",
          }}
          elevation={6}>
          <Avatar sx={{m: 1, bgcolor: "#dd0031"}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Account Info
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
            <CustomDisableInput
              disabled
              margin="normal"
              required
              fullWidth
              id="email"
              label="User Name"
              name="username"
              value={values.username}
              autoComplete="email"
              autoFocus
              onChange={(e) => onChange(e)}
            />
            <CustomDisableInput
              disabled
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              value={values.email}
              autoComplete="email"
              autoFocus
              onChange={(e) => onChange(e)}
              style={{color: "black !important"}}
            />
            <CustomDisableInput
              disabled
              margin="normal"
              required
              fullWidth
              id="title"
              label="title"
              name="title"
              value={values.title}
              autoComplete="title"
              autoFocus
              onChange={(e) => onChange(e)}
              style={{color: "black !important"}}
            />
            <CustomDisableInput
              disabled
              margin="normal"
              required
              fullWidth
              id="departement"
              label="departement"
              name="departement"
              value={values.departement}
              autoComplete="departement"
              autoFocus
              onChange={(e) => onChange(e)}
              style={{color: "black !important"}}
            />
          </Box>
        </Box>
        <div
          style={{
            paddingBottom: "77px",
          }}></div>
      </Container>
    </ThemeProvider>
  );
}
