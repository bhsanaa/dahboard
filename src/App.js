import "./App.css";
import Index from "./Pages/index";
import {BrowserRouter} from "react-router-dom";
import {AppProvider} from "./provider/AppProvider.jsx";
import {createTheme, ThemeProvider} from "@mui/material";
import {red} from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#dd0031",
    },
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <AppProvider>
          <BrowserRouter>
            <Index />
          </BrowserRouter>{" "}
        </AppProvider>{" "}
      </ThemeProvider>{" "}
    </div>
  );
}

export default App;
