import { useContext } from "react";
import { Modal } from "antd";
import { AiOutlineUser } from "react-icons/ai";
import { ConnectWallet } from "..";
import { GlobalContext } from "../../context/GlobalContext";
const UserLogOut = () => {
  const {
    showConnectWalletModal,
    hideConnectWalletModal,
    isConnectWalletModalOpen,
  } = useContext(GlobalContext);

  return (
    <div className="flex flex-col rounded-md bg-white items-center px-4 min-w-[232px]">
      <div className="flex w-full flex-row mb-3 justify-start items-center">
        <div className="flex rounded-full w-10 h-10 bg-black items-center justify-center">
          <AiOutlineUser color="#fff" fontSize={18} />
        </div>
        <div className="flex flex-col ml-3 justify-center">
          <div className="flex text-base font-medium mb-0.5">None</div>
          <div className="flex text-[#696969] text-sm">0x000...000</div>
        </div>
      </div>
      <div
        className="flex w-full items-center justify-center py-[4px] px-[4px]  text-base font-medium cursor-pointer rounded-full bg-gradient-to-br from-purple-400 to-blue-400 text-[#8f95fb]"
        onClick={showConnectWalletModal}
      >
        <div className="flex items-center justify-center py-1 bg-white rounded-full w-full hover:bg-gradient-to-br from-purple-400 to-blue-400 hover:text-white transition duration-500 ease-in-out">
          Connect Wallet
        </div>
      </div>
      <Modal
        open={isConnectWalletModalOpen}
        footer={null}
        closable={false}
        centered
      >
        {ConnectWallet(hideConnectWalletModal)}
      </Modal>
    </div>
  );
};

export default UserLogOut;
