import { Routes, Route } from "react-router-dom";
import {
  Home,
  Application,
  Government,
  Personal,
  UserNotFound,
  Player,
  Tools,
} from "../pages";
import React from "react";

export const AllRoutes = (): React.ReactElement => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Application" element={<Application />} />
      <Route path="/Government" element={<Government />} />
      <Route path="/Personal/:id" element={<Personal />} />
      <Route path="/Personal/" element={<UserNotFound />} />
      <Route path="/Player/:id/:id" element={<Player />} />
      <Route path="/Tools" element={<Tools />} />
    </Routes>
  );
};
