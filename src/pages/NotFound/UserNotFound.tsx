import React from "react";
import { Empty } from "antd";
import { useAccount } from "wagmi";
import { personal_404 } from "../../assets";
import { useConnectModal } from "@rainbow-me/rainbowkit";

const UserNotFound = () => {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <Empty
        description={
          <div className="flex flex-col text-2xl font-bold text-[#696969]">
            <div>The address you queried is invalid</div>
            <div>or does not exist.</div>
          </div>
        }
        image={personal_404}
        imageStyle={{
          height: 220,
        }}
        className="flex flex-col items-center justify-center"
      />
      {!isConnected && (
        <div
          className="flex items-center justify-center py-2 px-3 rounded-full w-full bg-gradient-to-r from-purple-400 to-blue-400 text-white font-bold text-lg cursor-pointer hover:brightness-110 max-w-[250px] mt-3"
          onClick={openConnectModal}
        >
          Connect Wallet
        </div>
      )}
    </div>
  );
};

export default UserNotFound;
