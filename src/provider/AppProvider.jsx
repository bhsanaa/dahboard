import React, {useContext, useState} from "react";
const ThemeContext = React.createContext("light");

export const AppProvider = ({children}) => {
  const [loggedIn, setLoggedIn] = useState("");

  return (
    <ThemeContext.Provider value={{setLoggedIn, loggedIn}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(ThemeContext);
};
