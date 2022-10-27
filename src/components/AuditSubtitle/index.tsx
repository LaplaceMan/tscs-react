import { useContext } from "react";
import { CircleFlag } from "react-circle-flags";
import { MdOutlineClose } from "react-icons/md";
import { ApplicationContext } from "../../context/ApplicationContext";
const AuditSubtitle = () => {
  const { hideAuditModal } = useContext(ApplicationContext);
  return (
    <div className="flex flex-col w-full p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="text-xl font-bold flex">
          Participate in audit after using subtitle
        </div>
        <div
          className="flex hover:text-[#48a8ff] hover:bg-gray-100 items-center justify-center cursor-pointer mt-1 rounded-full p-0.5"
          onClick={hideAuditModal}
        >
          <MdOutlineClose fontSize="1.25rem" />
        </div>
      </div>
      <div className="flex flex-row p-3 justify-between">
        <div className="flex flex-col w-1/2 mr-1">
          <div className="flex flex-row items-center">
            <div className="flex h-11">
              <CircleFlag countryCode="cn" />
            </div>
            <div className="flex flex-col items-start ml-3">
              <div className="flex items-end">
                <div className="text-lg font-medium">Lulu</div>
                <div className="text-sm text-[#696969] ml-2">#50</div>
              </div>
              <div className="text-sm text-[#696969]">0x666...666</div>
            </div>
          </div>
          <div className="flex flex-col my-2">
            <div className="flex items-center justify-center text-[#696969]">
              Simhash Fingerprint
            </div>
            <div className="flex p-2 bg-gray-100 break-all rounded-md font-medium items-center justify-center">
              0xa54698dac6
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center justify-center text-[#696969] ">
              IPFS CID
            </div>
            <div className="flex p-2 bg-gray-100 break-all font-medium rounded-md items-center justify-center">
              QmXVPFgeQH7BgSRv6eDATU8i6oaLmmUM9WQB99wCgg87or
            </div>
          </div>
        </div>
        {/* <div className="flex w-1 bg-gray-100 rounded-full h-full" /> */}
        <div className="flex flex-col w-1/2 ml-1">
          <div className="flex flex-row items-center">
            <div className="flex h-11">
              <img
                src="http://api.btstu.cn/sjtx/api.php?lx=c1&format=images"
                className="flex rounded-full"
              />
            </div>
            <div className="flex flex-col items-start ml-3">
              <div className="flex items-end">
                <div className="text-lg font-medium">Lulu</div>
                <div className="text-sm text-[#696969] ml-2">#50</div>
              </div>
              <div className="text-sm text-[#696969]">0x666...666</div>
            </div>
          </div>
          <div className="flex flex-col my-2">
            <div className="flex items-center justify-center text-[#696969]">
              Reputation
            </div>
            <div className="flex p-2 bg-gray-100 break-all rounded-md font-medium items-center justify-center">
              0xa54698dac6
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center justify-center text-[#696969] ">
              Soulbound Token
            </div>
            <div className="flex p-2 bg-gray-100 break-all font-medium rounded-md items-center justify-center">
              QmXVPFgeQH7BgSRv6eDATU8i6oaLmmUM9WQB99wCgg87or
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center w-full text-white font-semibold text-base mt-2">
        <div className="flex items-center justify-center rounded-l-full bg-gradient-to-r from-purple-400 to-purple-200 w-1/2 py-2 cursor-pointer hover:bg-gradient-to-r hover:from-purple-400 hover:to-purple-400">
          Adopt
        </div>
        <div className="flex items-center justify-center rounded-r-full bg-gradient-to-r from-blue-200 to-blue-400 w-1/2 py-2 cursor-pointer hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-400">
          Report
        </div>
      </div>
    </div>
  );
};

export default AuditSubtitle;
