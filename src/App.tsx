import {
  HeaderTop,
  UploadSubtitle,
  SubmitApplication,
  AuditSubtitle,
  DefaultFooter,
  TokenTransaction,
  UpdateApplication,
  WithdrawReward,
  DepositAssetManageModal,
} from "./components";
import React, { useContext } from "react";
import { Layout, Affix, Modal } from "antd";
import { AllRoutes } from "./routes";
import { GlobalContext } from "./context/GlobalContext";

const { Header, Content, Footer } = Layout;
const App = () => {
  const {
    isUploadModalOpen,
    isApplicationModalOpen,
    isAuditModalOpen,
    isTokenTransactionModalOpen,
    isUpdateApplicationModalOpen,
    isWithdrawRewardModalOpen,
    isDespoitAssetModalOpen,
  } = useContext(GlobalContext);

  const path = location.pathname.split("/")[2];

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
          <Content>
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
            <Modal
              open={isDespoitAssetModalOpen}
              destroyOnClose={true}
              forceRender={true}
              closable={false}
              footer={null}
              centered
            >
              {DepositAssetManageModal()}
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
