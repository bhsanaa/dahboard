import React, {useContext, useState} from "react";
const ThemeContext = React.createContext("light");

export const AppProvider = ({children}) => {
  const [loggedIn, setLoggedIn] = useState("");
  const [events, setEvents] = useState({
    filter: {
      isActive: true,
      data: {
        table: true,
        chart: true,
      },
    },
    group: {
      isActive: true,
      data: {
        table: true,
        chart: true,
      },
    },
    search: {
      isActive: true,
      data: {
        tableAccount: true,
        tableHeader: true,
        chart: true,
      },
    },
    select: {
      isActive: true,
      data: {
        table: true,
        chart: true,
      },
    },
    sort: {
      isActive: true,
      data: {
        table: true,
        chart: true,
      },
    },
    pin: {
      isActive: true,
      data: {
        table: true,
        chart: true,
      },
    },
    agg: {
      isActive: true,
      data: {
        table: true,
        chart: true,
      },
    },
  });
  return (
    <ThemeContext.Provider value={{setLoggedIn, loggedIn, events, setEvents}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(ThemeContext);
};
