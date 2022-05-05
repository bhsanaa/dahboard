import React from "react";
import {Route, Routes} from "react-router-dom";
import SignIn from "../Components/Auth/Signin";
import {EventsPage} from "../Pages/EventsPage";
import {EventsInformationsPage} from "../Pages/EventsInformationsPage";
import Settings from "../Components/Auth/Settings";
import {HomePage} from "../Pages/HomePage";
import {EventsChoicePage} from "../Pages/EventsChoice";
import ForgotPassword from "../Components/Auth/ForgotPassword";
import Profile from "../Components/Auth/Profile";
import ConsultAccount from "../Components/ConsulterAccount";
import {AdminIndex} from "../Pages/AdminIndex";
import AdminSignIn from "../Admin/AdminSignIn";

// import ResetPassword from "../Components/Auth/ResetPassword";
const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/admin/signin" element={<AdminSignIn />} />
        <Route path="/admin" element={<AdminIndex />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/signin" element={<SignIn />} />
        {/* <Route path="/settings" element={<Settings />} /> */}
        <Route path="/settings" element={<Profile />} />
        <Route path="/:page/event" element={<EventsPage />} />
        <Route path="/:page/event/choice" element={<EventsChoicePage />} />
        <Route path="/:page" element={<EventsInformationsPage />} />
        <Route path="/" element={<HomePage />} exact />
      </Routes>
    </>
  );
};

export default Router;
