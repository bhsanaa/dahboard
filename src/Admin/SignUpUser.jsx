import {useEffect, useState} from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {getUserById, updateAccountBackend} from "../service/authService";
import {useAppContext} from "../provider/AppProvider";
import {Link, useNavigate} from "react-router-dom";
import {Grid, Paper} from "@mui/material";
import jwt_decode from "jwt-decode";

const theme = createTheme();

export default function SignUpUser() {
  const {loggedIn} = useAppContext();
  const [values, setValues] = useState({});

  useEffect(() => {
    if (loggedIn) {
      const id = jwt_decode(loggedIn).id;
      getUserById(id).then((res) => {
        setValues({
          username: res.username,
          email: res.email,
        });
      });
    }
  }, [loggedIn]);

  let navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  };

  const updateAccount = async () => {
    if (!values.username || !values.password || !values.confirm) {
      alert("Please Fill All Fields");
    }
    if (values.password !== values.confirm) {
      alert("Passwords dont match");
    }

    const res = await updateAccountBackend(values);
    if (res) alert("Account Updated");

    // if (res.data.token) {
    //   setLoggedIn(res.data.token);
    // }
    // navigate(`/`);
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
          <Typography component="h1" variant="h5">
            Add User
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
              color={{color: "#dd0031"}}
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2}}
              onClick={updateAccount}
              style={{backgroundColor: "#dd0031"}}>
              Update Account
            </Button>
                        
            <Grid container style={{margin: "10px 0"}}>
                            
              <Grid item>
                                
                <Link href="/forgot" variant="body2" sx={{color: "black"}}>
                                    {"Forgot Password ?"}                
                </Link>
                              
              </Grid>
                          
            </Grid>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
