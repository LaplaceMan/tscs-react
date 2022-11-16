import {
  UploadSubtitle,
  SubmitApplication,
  AuditSubtitle,
  DefaultFooter,
  TokenTransaction,
  UpdateApplication,
  WithdrawReward,
} from "./components";
import { useContext } from "react";
import { Layout, Affix, Modal } from "antd";
import { AllRoutes, HeaderRoutes } from "./routes";
import { GlobalContext } from "./context/GlobalContext";

const { Content, Footer } = Layout;
const App = () => {
  const {
    isUploadModalOpen,
    isApplicationModalOpen,
    isAuditModalOpen,
    isTokenTransactionModalOpen,
    isUpdateApplicationModalOpen,
    isWithdrawRewardModalOpen,
  } = useContext(GlobalContext);
  return (
    <div className="mbg">
      <Layout>
        <Affix offsetTop={0}>{HeaderRoutes()}</Affix>
        <div className="flex w-full items-center justify-center">
          <Content className="max-w-[1400px] md:mx-10 min-h-[70vh]">
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
            <Modal
              open={isTokenTransactionModalOpen}
              destroyOnClose={true}
              forceRender={true}
              closable={false}
              footer={null}
              centered
            >
              {TokenTransaction()}
            </Modal>
            <Modal
              open={isUpdateApplicationModalOpen}
              destroyOnClose={true}
              forceRender={true}
              closable={false}
              footer={null}
              centered
            >
              {UpdateApplication()}
            </Modal>
            <Modal
              open={isWithdrawRewardModalOpen}
              destroyOnClose={true}
              forceRender={true}
              closable={false}
              footer={null}
              centered
            >
              {WithdrawReward()}
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
