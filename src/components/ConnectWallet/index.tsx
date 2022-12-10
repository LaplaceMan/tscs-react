import React, { useContext } from "react";
import { MdAccountBalanceWallet, MdOutlineClose } from "react-icons/md";
import { WalletContext } from "../../context/WalletContext";

const WalletButton = (
  icon: string,
  info: string,
  func: () => void,
  key: React.Key
): React.ReactElement => {
  return (
    <div
      className="flex w-[230px] h-[60px] rounded-full cursor-pointer hover:shadow-md items-center"
      key={key}
      onClick={func}
    >
      <img width={40} src={icon} style={{ margin: "0 10px 0 15px" }} />
      <div className="font-semibold">{info}</div>
    </div>
  );
};
const ConnectWallet = (hideConnectWalletModal: any): React.ReactElement => {
  const { connectWalletMetaMask } = useContext(WalletContext);
  const WalletButtonItems = [
    {
      icon: "https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngafe81c804287ae8ef3652214b434dcc1377629c30dae68c170638d10d89b5293",
      label: "Metamask",
      func: connectWalletMetaMask,
    },
    {
      icon: "https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngc7fbb15391340f1f3a9c3b77059561036d185a3e6a21b0a78d960cf95f1e4834",
      label: "WalletConnect",
      func: () => {
        // 目前未实现
      },
    },
  ];
  return (
    <div className="flex flex-col bg-[#fff] border shadow-md rounded-lg p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <div className="flex w-[38px] h-[38px] rounded-full bg-[#e8e7e6] items-center justify-center">
            <MdAccountBalanceWallet fontSize={22} />
          </div>
          <div className="font-semibold text-lg ml-3">Select a Wallet</div>
        </div>
        <div
          className="flex hover:text-white hover:bg-black items-center justify-center rounded-full cursor-pointer p-0.5"
          onClick={hideConnectWalletModal}
        >
          <MdOutlineClose fontSize={16} />
        </div>
      </div>
      <div className="flex flex-row items-center justify-between mt-5">
        {WalletButtonItems.map((item, index) =>
          WalletButton(item.icon, item.label, item.func, index)
        )}
      </div>
    </div>
  );
};

export default ConnectWallet;
