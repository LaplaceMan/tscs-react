import {
  HeaderTop,
  DefaultFooter,
  TokenTransactionModal,
  UpdateTaskModal,
  WithdrawRewardModal,
  DepositManageModal,
  AuditModal,
  GuardManageModal,
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
    isGuardManageModalOpen,
  } = useContext(GlobalContext);

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
              getContainer={false}
              open={isAuditModalOpen}
              destroyOnClose={true}
              forceRender
              footer={null}
              closable={false}
              centered
            >
              <AuditModal />
            </Modal>
            <Modal
              getContainer={false}
              open={isTokenTransactionModalOpen}
              destroyOnClose={true}
              forceRender
              closable={false}
              footer={null}
              centered
            >
              <TokenTransactionModal />
            </Modal>
            <Modal
              getContainer={false}
              open={isUpdateTaskModalOpen}
              destroyOnClose={true}
              forceRender={true}
              closable={false}
              footer={null}
              centered
            >
              <UpdateTaskModal />
            </Modal>
            <Modal
              getContainer={false}
              open={isWithdrawRewardModalOpen}
              destroyOnClose={true}
              forceRender
              closable={false}
              footer={null}
              centered
            >
              <WithdrawRewardModal />
            </Modal>
            <Modal
              getContainer={false}
              open={isDepositAssetModalOpen}
              destroyOnClose={true}
              forceRender
              closable={false}
              footer={null}
              centered
            >
              <DepositManageModal />
            </Modal>
            <Modal
              getContainer={false}
              open={isGuardManageModalOpen}
              destroyOnClose={true}
              forceRender
              closable={false}
              footer={null}
              centered
            >
              <GuardManageModal />
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
