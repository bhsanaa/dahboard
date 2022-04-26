import React from "react";
import {Route, Routes} from "react-router-dom";
import {HomePage} from "../Pages/HomePage";
import {EventsPage} from "../Pages/EventsPage";
import {EventsInformationsPage} from "../Pages/EventsInformationsPage";
import SignIn from "../Components/Auth/Signin";
import {useAppContext} from "../provider/AppProvider";

const Router = () => {
  const {setLoggedIn, loggedIn} = useAppContext();

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/:page/event" element={<EventsPage />} />
        <Route path="/:page" element={<EventsInformationsPage />} />
      </Routes>
    </>
  );
};

export default Router;
