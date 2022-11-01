import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import { GlobalContext } from "../context/GlobalContext";
import { Home, Application, Government, Personal } from "../pages";
import { HeaderTop } from "../components";
import React, { useContext } from "react";
const { Header } = Layout;
export const AllRoutes = (): React.ReactElement => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Application" element={<Application />} />
      <Route path="/Government" element={<Government />} />
      <Route path="/Personal" element={<Personal />} />
    </Routes>
  );
};

export const HeaderRoutes = (): React.ReactElement => {
  const { scrollHeight } = useContext(GlobalContext);
  return (
    <Routes>
      <Route
        path="/Personal"
        element={
          <Header
            className="flex items-center bg-white shadow-sm"
            style={{ padding: 0 }}
          >
            <HeaderTop />
          </Header>
        }
      />
      <Route
        path="/*"
        element={
          <Header
            className={`flex items-center  ${
              scrollHeight > 0 ? "bg-white shadow-sm" : ""
            }`}
            style={{ padding: 0 }}
          >
            <HeaderTop />
          </Header>
        }
      />
    </Routes>
  );
};
