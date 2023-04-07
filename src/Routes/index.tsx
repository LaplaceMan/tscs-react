import { Routes, Route } from "react-router-dom";
import {
  Home,
  Tasks,
  Items,
  Personal,
  Tools,
  UserNotFound,
  Post,
  Submit,
} from "../pages";
import React from "react";

export const AllRoutes = (): React.ReactElement => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Tasks" element={<Tasks />} />
      <Route path="/Items" element={<Items />} />
      <Route path="/Tools" element={<Tools />} />
      <Route path="/Personal/:id" element={<Personal />} />
      <Route path="/Personal/" element={<UserNotFound />} />
      <Route path="/Post" element={<Post />} />
      <Route path="/Submit" element={<Submit />} />
    </Routes>
  );
};
