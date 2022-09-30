import { HeaderTop } from "./components";
import { useState } from "react";
import { Layout, Affix } from "antd";
import AllRoutes from "./routes";
import { getScrollTop } from "./utils/tools";
import { discord, github, telegram, twitter } from "./assets";

const { Header, Content, Footer } = Layout;
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
        <Footer>
          <div className="flex flex-col">
            <div className="flex flex-row">
              {[discord, github, telegram, twitter].map((item, index) => (
                <img src={item} key={index} className="mr-3 w-6" />
              ))}
            </div>
            <div className="flex text-sm mt-3">
              Copyright © 2022 LaplasMan. All rights reserved.
            </div>
          </div>
        </Footer>
      </Layout>
    </div>
  );
};

export default App;
