import {
  HeaderTop,
  DefaultFooter,
  TokenTransaction,
  UpdateApplication,
  WithdrawReward,
  DepositManageModal,
  AuditModal,
} from "./components";
import React, { useContext } from "react";
import { Layout, Affix, Modal } from "antd";
import { AllRoutes } from "./routes";
import { GlobalContext } from "./context/GlobalContext";

const { Header, Content, Footer } = Layout;
const App = () => {
  const {
    isAuditModalOpen,
    isTokenTransactionModalOpen,
    isUpdateTaskModalOpen,
    isWithdrawRewardModalOpen,
    isDepositAssetModalOpen,
    hideAuditModal,
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
              open={isAuditModalOpen}
              footer={null}
              closable={false}
              centered
            >
              <AuditModal />
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
              open={isUpdateTaskModalOpen}
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
              open={isDepositAssetModalOpen}
              destroyOnClose={true}
              forceRender={true}
              closable={false}
              footer={null}
              centered
            >
              {DepositManageModal()}
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
