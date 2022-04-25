import "./App.css";
import Index from "./Pages/index";
import {BrowserRouter} from "react-router-dom";
import {AppProvider} from "./provider/AppProvider.jsx";
import {createTheme, ThemeProvider} from "@mui/material";
import {red} from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#943e3e",
    },
    secondary: {
      main: red[900],
    },
  },
});

function App() {
  return (
    <div className="App">
      <AppProvider>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Index />
          </BrowserRouter>{" "}
        </ThemeProvider>{" "}
      </AppProvider>{" "}
    </div>
  );
}

export default App;
