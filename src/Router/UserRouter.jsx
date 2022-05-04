import React from "react";
import {Route, Routes} from "react-router-dom";
import SignIn from "../Components/Auth/Signin";
import {EventsPage} from "../Pages/EventsPage";
import {EventsInformationsPage} from "../Pages/EventsInformationsPage";
import Settings from "../Components/Auth/Settings";
import {HomePage} from "../Pages/HomePage";
import {EventsChoicePage} from "../Pages/EventsChoice";
import ForgotPassword from "../Components/Auth/ForgotPassword";
import ConsultAccount from "../Components/ConsulterAccount";
import {AdminIndex} from "../Pages/AdminIndex";
// import ResetPassword from "../Components/Auth/ResetPassword";
const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<HomePage />} exact />
        <Route path="/settings" element={<Settings />} />
        <Route path="/:page/event" element={<EventsPage />} />
        <Route path="/:page/event/choice" element={<EventsChoicePage />} />
        <Route path="/account" element={<ConsultAccount />} />
        <Route path="/admin" element={<AdminIndex />} />

        <Route path="/:page" element={<EventsInformationsPage />} />
      </Routes>
    </>
  );
};

export default Router;
