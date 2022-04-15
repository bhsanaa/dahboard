import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {HomePage} from "../Pages/HomePage";
import {EventsPage} from "../Pages/EventsPage";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/:page/event" element={<EventsPage />} />
      </Routes>
    </>
  );
};

export default Router;
