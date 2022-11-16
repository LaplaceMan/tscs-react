import { useContext } from "react";
import { Empty } from "antd";
import { GlobalContext } from "../../context/GlobalContext";
import { WalletContext } from "../../context/WalletContext";
const UserNotFound = () => {
  const { showConnectWalletModal } = useContext(GlobalContext);
  const { accountState } = useContext(WalletContext);
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <Empty
        description={
          <div className="flex flex-col text-2xl font-bold text-[#696969]">
            <div>The address you queried is invalid</div>
            <div>or does not exist.</div>
          </div>
        }
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{
          height: 220,
        }}
        className="flex flex-col items-center justify-center"
      />
      {!accountState.address && (
        <div
          className="flex items-center justify-center py-2 px-3 rounded-full w-full bg-gradient-to-r from-purple-400 to-blue-400 text-white font-bold text-lg cursor-pointer hover:brightness-110 max-w-[250px] mt-3"
          onClick={showConnectWalletModal}
        >
          Connect Wallet
        </div>
      )}
    </div>
  );
};

export default UserNotFound;
