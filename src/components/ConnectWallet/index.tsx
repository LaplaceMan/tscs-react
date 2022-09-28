import React from "react";
import { AiFillWallet, AiOutlineClose } from "react-icons/ai";

const WalletButtonItems = [
  {
    icon: "https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngafe81c804287ae8ef3652214b434dcc1377629c30dae68c170638d10d89b5293",
    label: "Metamask",
  },
  {
    icon: "https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngc7fbb15391340f1f3a9c3b77059561036d185a3e6a21b0a78d960cf95f1e4834",
    label: "WalletConnect",
  },
];
const WalletButton = (
  icon: string,
  info: string,
  key: React.Key
): React.ReactElement => {
  return (
    <div
      className="flex w-[230px] h-[60px] rounded-full cursor-pointer hover:shadow-md items-center"
      key={key}
    >
      <img width={40} src={icon} style={{ margin: "0 10px 0 15px" }} />
      <div className="font-semibold">{info}</div>
    </div>
  );
};
const ConnectWallet = (hideConnectWalletModel: any): React.ReactElement => {
  return (
    <div className="flex flex-col bg-[#fff] border shadow-md rounded-lg p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <div className="flex w-[38px] h-[38px] rounded-full bg-[#e8e7e6] items-center justify-center">
            <AiFillWallet fontSize={20} />
          </div>
          <div className="font-semibold text-lg ml-3">Select a Wallet</div>
        </div>
        <div
          className="flex hover:text-[#48a8ff] items-center justify-center rounded-md cursor-pointer"
          onClick={hideConnectWalletModel}
        >
          <AiOutlineClose fontSize={16} />
        </div>
      </div>
      <div className="flex flex-row items-center justify-between mt-5">
        {WalletButtonItems.map((item, index) =>
          WalletButton(item.icon, item.label, index)
        )}
      </div>
    </div>
  );
};

export default ConnectWallet;