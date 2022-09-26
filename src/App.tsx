import { HeaderTop } from "./components";
import React, { useState } from "react";
import { Layout, Affix } from "antd";
import AllRoutes from "./Routes";
import { getScrollTop } from "./utils/tools";

const { Header, Content } = Layout;
const App = () => {
  const [scrollHeight, setScrollHeight] = useState(0);
  window.addEventListener("scroll", () => {
    var height: number = getScrollTop();
    setScrollHeight(height);
  });
  return (
    <div className="mbg">
      <Layout>
        <Affix offsetTop={0}>
          <Header
            className={`flex items-center ${
              scrollHeight > 0 ? "bg-white shadow-sm" : ""
            }`}
            style={{ padding: 0 }}
          >
            <HeaderTop />
          </Header>
        </Affix>
        <Content className="p-10">{AllRoutes()}</Content>
      </Layout>
    </div>
  );
};

export default App;
