import {
  HeaderTop,
  UploadSubtitle,
  SubmitApplication,
  AuditSubtitle,
} from "./components";
import { useContext } from "react";
import { Layout, Affix, Modal } from "antd";
import AllRoutes from "./routes";
import { discord, github, telegram, twitter } from "./assets";
import { GlobalContext } from "./context/GlobalContext";
import { ApplicationContext } from "./context/ApplicationContext";
const { Header, Content, Footer } = Layout;
const App = () => {
  const { scrollHeight } = useContext(GlobalContext);
  const { isUploadModalOpen, isApplicationModalOpen, isAuditModalOpen } =
    useContext(ApplicationContext);
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
        <Content className="p-10">
          {AllRoutes()}
          <Modal
            open={isUploadModalOpen}
            destroyOnClose={true}
            forceRender={true}
            closable={false}
            footer={null}
            centered
          >
            {UploadSubtitle()}
          </Modal>
          <Modal
            open={isApplicationModalOpen}
            destroyOnClose={true}
            forceRender={true}
            closable={false}
            footer={null}
            centered
          >
            {SubmitApplication()}
          </Modal>
          <Modal
            open={isAuditModalOpen}
            destroyOnClose={true}
            forceRender={true}
            closable={false}
            footer={null}
            centered
          >
            {AuditSubtitle()}
          </Modal>
        </Content>
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
