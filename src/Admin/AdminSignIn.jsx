import {useState} from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {useAppContext} from "../provider/AppProvider";
import {useNavigate} from "react-router-dom";
import {Paper} from "@mui/material";
import {getAdmin} from "../service/AdminService";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function AdminSignIn() {
  const {setLoggedIn} = useAppContext();
  let navigate = useNavigate();

  const [values, setValues] = useState({});
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  };

  const signInForm = async () => {
    const res = await getAdmin(values);
    if (res.status === "err") {
      alert(res.msg);
      return;
    }
    setLoggedIn(res.token);
    navigate(`/admin`);
    // changeSnackBar(true, "Logged In", "success");
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="User Name"
              name="username"
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2}}
              onClick={signInForm}
              style={{backgroundColor: "#dd0031"}}>
              Sign In
            </Button>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
