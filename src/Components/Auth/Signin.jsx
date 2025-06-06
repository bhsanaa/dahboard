import {useState} from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {signIn} from "../../service/authService";
import {useAppContext} from "../../provider/AppProvider";
import {Link, useNavigate} from "react-router-dom";
import {Grid, Paper} from "@mui/material";

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

export default function SignIn() {
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
    const res = await signIn(values);
    if (res.data.err) {
      alert(res.data.err);
      return;
    }
    if (res.data.token) {
      setLoggedIn(res.data.token);
      navigate(`/`);
    }
  };

  return (
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
        <Avatar sizes="md" sx={{m: 1, bgcolor: "#dd0031"}}>
          <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {/* <hr
          style={{height: "3px", width: "100%", backgroundColor: "#a7a7a7"}}
        /> */}
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
            color="secondary"
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
            color="secondary"
            autoComplete="current-password"
            onChange={(e) => onChange(e)}
          />
          <Grid container style={{margin: "10px 0"}}>
            <Grid item>
              <Link
                to="/forgot"
                style={{textDecoration: "none", color: "inherit"}}>
                {"Forgot Password ?"}
              </Link>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 1, mb: 2}}
            onClick={signInForm}
            style={{backgroundColor: "#dd0031", color: "#ffffff"}}>
            Sign In
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
