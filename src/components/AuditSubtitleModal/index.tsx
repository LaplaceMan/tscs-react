import React, { useContext } from "react";
import { Tag, Spin } from "antd";
import { BigNumber } from "bignumber.js";
import { CircleFlag } from "react-circle-flags";
import { MdOutlineClose } from "react-icons/md";
import { RiSecurePaymentLine, RiStarSmileLine } from "react-icons/ri";
import { ApplicationContext } from "../../context/ApplicationContext";
import { useAccount } from "wagmi";
import { DataContext } from "../../context/DataContext";
import { GlobalContext } from "../../context/GlobalContext";
import { timestampToDate, shortenAddress, shortenCID } from "../../utils/tools";
import { Audit } from "../../types/formTypes";
import { RANDOM_AVATAR_API } from "../../utils/constants";

const AuditSubtitle = () => {
  const { address, isConnected } = useAccount();
  const { defaultAuditSubtitleData, auditSubtitle } =
    useContext(ApplicationContext);
  const { hideAuditModal, isLoading } = useContext(GlobalContext);
  const { defaultAuditSubtitleMaker } = useContext(DataContext);

  const txParams = (attitude: number): Audit => {
    return {
      subtitleId: defaultAuditSubtitleData.subtitleId,
      attitude: attitude,
      auditor: address!,
    };
  };

  return (
    <Spin spinning={isLoading} size="large">
      <div className="flex flex-col w-full p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="text-xl font-bold flex">
            Participate in audit after using subtitle
          </div>
          <div
            className="flex hover:text-white hover:bg-black items-center justify-center cursor-pointer mt-1 rounded-full p-0.5"
            onClick={hideAuditModal}
          >
            <MdOutlineClose fontSize="1.25rem" />
          </div>
        </div>
        <div className="flex flex-row p-3 justify-between">
          <div className="flex flex-col w-1/2 mr-1">
            <div className="flex flex-row items-center justify-center">
              <div className="flex h-11">
                <CircleFlag countryCode={defaultAuditSubtitleData.language} />
              </div>
              <div className="flex flex-col items-start ml-3">
                <div className="text-lg font-medium">
                  <a href={defaultAuditSubtitleData.applySource}>Source</a>
                </div>
                <div className="text-sm text-[#696969]">
                  {"#" + defaultAuditSubtitleData.applyId}
                </div>
              </div>
            </div>
            <div className="flex flex-row mt-2 items-center justify-center">
              <Tag color="purple">Subtitle</Tag>
              <Tag color="purple">
                {timestampToDate(defaultAuditSubtitleData.start)}
              </Tag>
              <Tag
                color="purple"
                className="flex items-center"
                icon={<RiSecurePaymentLine style={{ marginRight: "3px" }} />}
              >
                {defaultAuditSubtitleData.payType}
              </Tag>
            </div>
            <div className="flex flex-col my-2">
              <div className="flex items-center justify-center text-[#696969]">
                Simhash Fingerprint
              </div>
              <div className="flex p-2 bg-gray-100 break-all rounded-xl font-medium items-center justify-center">
                {"0x" +
                  BigNumber(defaultAuditSubtitleData.fingerprint).toString(16)}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center justify-center text-[#696969] ">
                IPFS CID
              </div>
              <div className="flex p-2 bg-gray-100 break-all font-medium rounded-xl items-center justify-center">
                {shortenCID(defaultAuditSubtitleData.cid, "audit")}
              </div>
            </div>
          </div>
          {/* <div className="flex w-1 bg-gray-100 rounded-full h-full" /> */}
          <div className="flex flex-col w-1/2 ml-1">
            <div className="flex flex-row items-center justify-center">
              <div className="flex h-11">
                <img src={RANDOM_AVATAR_API} className="flex rounded-full" />
              </div>
              <div className="flex flex-col items-start ml-3">
                <div className="text-lg font-medium">ENS</div>
                <div className="text-sm text-[#696969]">
                  {shortenAddress(defaultAuditSubtitleData.maker)}
                </div>
              </div>
            </div>
            <div className="flex flex-row mt-2 items-center justify-center">
              <Tag color="blue">Maker</Tag>
              <Tag color="blue">
                {timestampToDate(defaultAuditSubtitleMaker.join)}
              </Tag>
              <Tag
                color="blue"
                className="flex items-center"
                icon={<RiStarSmileLine style={{ marginRight: "3px" }} />}
              >
                {defaultAuditSubtitleMaker.adopted}
              </Tag>
            </div>
            <div className="flex flex-col my-2">
              <div className="flex items-center justify-center text-[#696969]">
                Reputation
              </div>
              <div className="flex p-2 bg-gray-100 break-all rounded-xl font-medium items-center justify-center">
                {BigNumber(defaultAuditSubtitleMaker.reputation)
                  .div(10)
                  .toString()}
              </div>
            </div>
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-center text-[#696969] ">
                Despoit Token
              </div>
              <div className="flex p-2 bg-gray-100 break-all font-medium rounded-xl items-center justify-center h-full">
                {defaultAuditSubtitleMaker.deposit}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center w-full text-white font-semibold text-base mt-2">
          <div
            className="flex items-center justify-center rounded-xl bg-gradient-to-r w-1/2 py-2 cursor-pointer from-purple-400 to-purple-200 mr-1 hover:brightness-110"
            onClick={() => isConnected && auditSubtitle(txParams(0))}
          >
            Adopt
          </div>
          <div
            className="flex items-center justify-center rounded-xl bg-gradient-to-r w-1/2 py-2 cursor-pointer from-blue-200 to-blue-400 ml-1 hover:brightness-110"
            onClick={() => isConnected && auditSubtitle(txParams(1))}
          >
            Report
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default AuditSubtitle;
