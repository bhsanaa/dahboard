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

const theme = createTheme();

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
        });
      });
    }
  }, [loggedIn]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
    console.log("yassine sana", values);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="Paper" maxWidth="xs">
        <CssBaseline />
        <Paper
          sx={{
            padding: "10px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 10,
          }}>
          <Avatar sx={{m: 1, bgcolor: "#dd0031"}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Update
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
            <TextField
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
            <TextField
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
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => onChange(e)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirm"
              label="Confirm Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => onChange(e)}
            />
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
