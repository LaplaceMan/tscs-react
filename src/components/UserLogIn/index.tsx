import { IDCard } from "../";
import { BiWalletAlt, BiGlobe } from "react-icons/bi";
import { SiEthereum } from "react-icons/si";

const UserLogIn = (): React.ReactElement => {
  return (
    <div className="flex flex-col rounded-md bg-white items-center max-w-[232px]">
      <div className="flex flex-row mb-3 justify-start items-center px-4">
        <img
          src="http://api.btstu.cn/sjtx/api.php?lx=c1&format=images"
          className="flex rounded-full w-[30%]"
        />
        <div className="flex w-full flex-col ml-3 justify-center">
          <div className="flex text-base font-medium items-center ">
            ENS <div className="flex text-xs ml-2 text-[#696969]">#1024</div>
          </div>
          <div className="flex text-[#696969] text-sm mt-0.5">0x555...555</div>
          <div className="flex w-full rounded-md p-1 bg-gray-100 text-black items-center justify-center">
            <SiEthereum
              className="mr-1"
              style={{ lineHeight: "13", fontSize: "13" }}
            />
            0.5 eth
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full mb-3">
        <div className="flex flex-row justify-between items-center px-3 py-0.5 text-base border-t-2">
          <div>Wallet</div>
          <div className="flex flex-row items-center justify-center">
            <BiWalletAlt className="mr-2 text-[#696969]" />
            Metamask
          </div>
        </div>
        <div className="flex flex-row justify-between items-center px-3 py-0.5 text-base border-t-2">
          <div>Network</div>
          <div className="flex flex-row items-center justify-center">
            <BiGlobe className="mr-2 text-[#696969]" />
            Goerli
          </div>
        </div>
        <div className="flex px-3 py-1 text-base border-dashed border-y-2 items-center justify-center text-[#696969] cursor-pointer hover:text-[#48a8ff] hover:border-[#48a8ff]">
          Disconnect
        </div>
      </div>
      <div className="flex w-full items-center justify-center px-4">
        <IDCard />
      </div>
      <div className="flex items-center justify-center text-[#696969] text-xs w-full mt-3 text-center px-4">
        Your ID card changes with reputation.
      </div>
    </div>
  );
};

export default UserLogIn;