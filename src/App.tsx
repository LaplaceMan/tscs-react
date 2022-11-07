import {
  UploadSubtitle,
  SubmitApplication,
  AuditSubtitle,
  DefaultFooter,
} from "./components";
import { useContext } from "react";
import { Layout, Affix, Modal } from "antd";
import { AllRoutes, HeaderRoutes } from "./routes";
import { ApplicationContext } from "./context/ApplicationContext";

const { Content, Footer } = Layout;
const App = () => {
  const { isUploadModalOpen, isApplicationModalOpen, isAuditModalOpen, isLoading } =
    useContext(ApplicationContext);
  return (
    <div className="mbg">
      <Layout>
        <Affix offsetTop={0}>{HeaderRoutes()}</Affix>
        <div className="flex w-full items-center justify-center">
          <Content className="max-w-[1400px] md:mx-10">
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
        </div>
        <Footer>
          <DefaultFooter />
        </Footer>
      </Layout>
    </div>
  );
};

export default App;
