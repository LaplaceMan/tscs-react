import { Routes, Route } from "react-router-dom";
import { Home, Application, Government, Personal } from "../pages";
import React from "react";

const AllRoutes = (): React.ReactElement => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Application" element={<Application />} />
      <Route path="/Government" element={<Government />} />
      <Route path="/Personal" element={<Personal />} />
    </Routes>
  );
};

export default AllRoutes;
