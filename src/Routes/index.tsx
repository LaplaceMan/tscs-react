import { Routes, Route } from "react-router-dom";
import { Home, Application, Government } from "../pages";
import React from "react";

const AllRoutes = (): React.ReactElement => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Application" element={<Application />} />
      <Route path="/Government" element={<Government />} />
    </Routes>
  );
};

export default AllRoutes;
