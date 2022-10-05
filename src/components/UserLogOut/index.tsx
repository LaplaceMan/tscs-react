import { useState } from "react";
import { Modal } from "antd";
import { AiOutlineUser } from "react-icons/ai";
import { ConnectWallet } from "../";
const UserLogOut = () => {
  const [connectWalletModal, setConnectWalletModal] = useState(false);
  const showConnectWalletHandle = () => {
    setConnectWalletModal(true);
  };

  const hideConnectWalletModalHandle = (): any => {
    setConnectWalletModal(false);
  };

  return (
    <div className="flex flex-col rounded-md bg-white items-center px-4 min-w-[232px]">
      <div className="flex w-full flex-row mb-3 justify-start items-center">
        <div className="flex rounded-full w-10 h-10 bg-[#696969] items-center justify-center">
          <AiOutlineUser color="#fff" />
        </div>
        <div className="flex flex-col ml-3 justify-center">
          <div className="flex text-base font-medium mb-0.5">None</div>
          <div className="flex text-[#696969] text-sm">0x000...000</div>
        </div>
      </div>
      <div
        className="flex w-full items-center justify-center py-3 rounded-md bg-[#696969] hover:bg-[#48a8ff] text-white font-medium cursor-pointer"
        onClick={showConnectWalletHandle}
      >
        Connect Wallet
      </div>
      <Modal open={connectWalletModal} footer={null} closable={false} centered>
        {ConnectWallet(hideConnectWalletModalHandle)}
      </Modal>
    </div>
  );
};

export default UserLogOut;
