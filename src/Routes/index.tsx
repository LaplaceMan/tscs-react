import { Routes, Route } from "react-router-dom";
import {
  Home,
  Tasks,
  Items,
  Personal,
  Tools,
  UserNotFound,
  Post,
} from "../pages";
import React from "react";

export const AllRoutes = (): React.ReactElement => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Application" element={<Tasks />} />
      <Route path="/Government" element={<Items />} />
      <Route path="/Tools" element={<Tools />} />
      <Route path="/Personal/:id" element={<Personal />} />
      <Route path="/Personal/" element={<UserNotFound />} />
      <Route path="/Post" element={<Post />} />
    </Routes>
  );
};
