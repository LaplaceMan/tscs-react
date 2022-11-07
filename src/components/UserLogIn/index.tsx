import { IDCard } from "../";
import { BsAwardFill } from "react-icons/bs";
import { BiWalletAlt, BiGlobe } from "react-icons/bi";
import { Network } from "../../utils/constants";
import { shortenAddress } from "../../utils/tools";
const UserLogIn = (
  {
    address,
    network,
    type,
  }: {
    address: string;
    network: string;
    type: string;
  },
  killSessionWalletConnect: () => void
): React.ReactElement => {
  return (
    <div className="flex flex-col rounded-md bg-white items-center max-w-[232px]">
      <div className="flex flex-row mb-3 justify-start items-center px-4">
        <img
          src="http://api.btstu.cn/sjtx/api.php?lx=c1&format=images"
          className="flex rounded-full w-[30%]"
        />
        <div className="flex w-full flex-col ml-3 justify-center">
          <div className="flex text-base font-medium items-center ">
            ENS
          </div>
          <div className="flex text-[#696969] text-sm mt-0.5">
            {shortenAddress(address)}
          </div>
          <div className="flex w-full rounded-md p-1 bg-gray-100 text-black items-center justify-center">
            <BsAwardFill
              className="mr-1"
              style={{ lineHeight: "13", fontSize: "13" }}
            />
            100.0
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full mb-3">
        <div className="flex flex-row justify-between items-center px-3 py-0.5 text-base border-t-2">
          <div>Wallet</div>
          <div className="flex flex-row items-center justify-center">
            <BiWalletAlt className="mr-2 text-[#696969]" />
            {type}
          </div>
        </div>
        <div className="flex flex-row justify-between items-center px-3 py-0.5 text-base border-y-2">
          <div>Network</div>
          <div className="flex flex-row items-center justify-center">
            <BiGlobe className="mr-2 text-[#696969] mt-0.5" />
            {Network[network]}
          </div>
        </div>
      </div>
      {/* <div className="flex w-full items-center justify-center px-4">
        <IDCard />
      </div> */}
      {/* <div className="flex items-center justify-center text-[#696969] text-xs w-full mt-1 text-center px-4 scale-75">
        YOUR ID CARD CHANGS WITH REPUTATION
      </div> */}
      <div
        className="flex w-11/12 py-1.5 text-base items-center justify-center text-white bg-[#f02525] rounded-md hover:shadow-md font-medium cursor-pointer hover:brightness-110"
        onClick={killSessionWalletConnect}
      >
        Disconnect
      </div>
    </div>
  );
};

export default UserLogIn;
