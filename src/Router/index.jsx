import React from "react";
import {Route, Routes} from "react-router-dom";
import {ProtectedRoute} from "./ProtectedRoute";
import SignIn from "../Components/Auth/Signin";
import {EventsPage} from "../Pages/EventsPage";
import {EventsInformationsPage} from "../Pages/EventsInformationsPage";
import Settings from "../Components/Auth/Settings";
import {HomePage} from "../Pages/HomePage";
import {EventsChoicePage} from "../Pages/EventsChoice";
const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<HomePage />} exact />
        <Route path="/settings" element={<Settings />} />
        <Route path="/:page/event" element={<EventsPage />} />
        <Route path="/:page/event/choice" element={<EventsChoicePage />} />

        <Route path="/:page" element={<EventsInformationsPage />} />
      </Routes>
      {/* <ProtectedRoute /> */}
    </>
  );
};

export default Router;
