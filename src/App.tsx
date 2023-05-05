import { HeaderTop, DefaultFooter } from "./components";
import React from "react";
import { Layout, Affix } from "antd";
import { AllRoutes } from "./routes";

const { Header, Content, Footer } = Layout;
const App = () => {
  return (
    <div>
      <Layout>
        <Affix offsetTop={0}>
          <Header
            className="flex items-center bg-[#0f0a19]"
            style={{ padding: 0 }}
          >
            <HeaderTop />
          </Header>
        </Affix>
        <div className="flex w-full items-center justify-center">
          <Content>{AllRoutes()}</Content>
        </div>
        <Footer>
          <DefaultFooter />
        </Footer>
      </Layout>
    </div>
  );
};

export default App;
