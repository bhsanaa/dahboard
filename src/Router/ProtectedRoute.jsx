import React from "react";
import {Route, Routes} from "react-router-dom";
import {useAppContext} from "../provider/AppProvider";
import {EventsPage} from "../Pages/EventsPage";
import {EventsInformationsPage} from "../Pages/EventsInformationsPage";
import Settings from "../Components/Auth/Settings";
import {HomePage} from "../Pages/HomePage";

export const ProtectedRoute = ({path, element}) => {
  const {loggedIn} = useAppContext();

  return (
    <>
      {loggedIn ? (
        <Routes>
          <Route path="/" element={<HomePage />} exact />

          <Route path="/settings" element={<Settings />} />
          <Route path="/:page/event" element={<EventsPage />} />
          <Route path="/:page" element={<EventsInformationsPage />} />
        </Routes>
      ) : (
        "Not AUthorized"
      )}
    </>
  );
};
