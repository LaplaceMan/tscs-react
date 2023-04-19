import React, { useContext, useEffect, useState } from "react";
import { Tabs, Spin } from "antd";
import { BiWalletAlt, BiAward, BiBitcoin, BiCheckShield } from "react-icons/bi";
import { SiEthereum } from "react-icons/si";
import {
  RiTodoFill,
  RiUploadCloud2Fill,
  RiShieldCheckFill,
} from "react-icons/ri";
import { DataContext } from "../context/DataContext";
import { ApplicationContext } from "../context/ApplicationContext";
import { GlobalContext } from "../context/GlobalContext";
import { shortenAddress } from "../utils/tools";
import { RANDOM_AVATAR_API, SUPPORT_NETWORK } from "../utils/constants";
import { OwnAssetCard, OwnOtherCard, NoItems } from "../components";
import { ZIMU_TOKEN, VIDEO_TOKEN } from "../utils/contracts";
import { getNetwork, getProvider, fetchEnsAvatar } from "@wagmi/core";
import { personal_default } from "../assets";
import { useParams } from "react-router-dom";

const PersonalItem = ({
  label,
  value,
  icon,
  fn,
}: {
  label: string;
  value: string;
  icon: React.ReactElement;
  fn: { label: string; fn: () => void };
}) => {
  return (
    <div className="flex flex-col items-center text-white border border-dashed rounded-xl text-base w-[150px] my-1">
      <div className="flex flex-col items-center p-1.5">
        <div>{label}</div>
        <div className="flex items-center space-x-1">
          <div>{icon}</div>
          <div>{value}</div>
        </div>
      </div>
      <div
        className="w-full text-center border-t border-dashed border-[#696969] text-[#696969] hover:text-white hover:border-white hover:font-semibold cursor-pointer hover:bg-[#322d3a] rounded-b-xl"
        onClick={fn.fn}
      >
        {fn.label}
      </div>
    </div>
  );
};

const Personal = (): React.ReactElement => {
  const { userOwnData, queryUserOwnData, isGetDataLoading } =
    useContext(DataContext);
  const { personalDID, getPersonalPageData } = useContext(ApplicationContext);
  const { chainId, showDepositAssetModal, showUpdateTaskModal } =
    useContext(GlobalContext);
  const [avatarAndName, setAvatarAndName] = useState({ avatar: "", name: "" });
  const { chain } = getNetwork();
  const provider = getProvider();
  const param = useParams();

  useEffect(() => {
    if (provider) {
      fetchEnsAvatar({ address: param.id as `0x${string}` }).then(
        (ens: any) => {
          if (ens) {
            setAvatarAndName({ ...avatarAndName, avatar: ens });
          }
        }
      );
    }
    param.id && queryUserOwnData(param.id as `0x${string}`);
    // getPersonalPageData(user);
  }, [chainId]);

  const Tokens = () => {
    return (
      <div className="flex items-center justify-center">
        <div className="grid md:grid-cols-3 grid-cols-1 md:w-[1200px] gap-y-5">
          {OwnAssetCard({
            name: "Zimu",
            balance: personalDID.zimu,
            type: "ERC-20",
            issuser: "Murmes",
            address:
              chain && SUPPORT_NETWORK.includes(chain.id)
                ? ZIMU_TOKEN[chain.id]
                : "",
            symbol: "Zimu",
            tokenId: "0",
            decimals: 18,
            icon: <SiEthereum />,
          })}
          {OwnAssetCard({
            name: "VideoToken-0",
            balance: personalDID.vt0,
            type: "ERC-1155",
            issuser: "Murmes",
            address:
              chain && SUPPORT_NETWORK.includes(chain.id)
                ? VIDEO_TOKEN[chain.id]
                : "",
            symbol: "VT",
            tokenId: "0",
            decimals: 6,
            icon: <SiEthereum />,
          })}
          {OwnAssetCard({
            name: "VideoToken-1",
            balance: personalDID.vt1,
            type: "ERC-1155",
            issuser: "Lens",
            address:
              chain && SUPPORT_NETWORK.includes(chain.id)
                ? VIDEO_TOKEN[chain.id]
                : "",
            symbol: "VT",
            tokenId: "1",
            decimals: 6,
            icon: <SiEthereum />,
          })}
        </div>
      </div>
    );
  };

  const Tasks = () => {
    return isGetDataLoading ? (
      <div className="flex w-full items-center justify-center h-32">
        <Spin />
      </div>
    ) : (
      <div className="flex items-center justify-center">
        <div className="grid md:grid-cols-3 grid-cols-1 md:w-[1200px] gap-y-5">
          {userOwnData.applications[0] &&
            userOwnData.applications[0].applyId != "0" &&
            userOwnData.applications.map((item, index) => (
              <OwnOtherCard
                other={{
                  title: item.name,
                  detail: item.source,
                  label1: "Box ID",
                  value1: item.videoId,
                  label2: "Task ID",
                  value2: item.applyId,
                  label3: "Status",
                  value3: item.state,
                  icon: <RiTodoFill />,
                  fn1Name: "Update",
                  fn1: showUpdateTaskModal,
                  fn2Name: "Cancel",
                  fn2: () => [],
                }}
                key={index}
              />
            ))}
          {!userOwnData.applications[0] ||
            (userOwnData.applications[0] &&
              userOwnData.applications[0].applyId == "0" && <NoItems />)}
        </div>
      </div>
    );
  };

  const Items = () => {
    return isGetDataLoading ? (
      <div className="flex w-full items-center justify-center h-32">
        <Spin />
      </div>
    ) : (
      <div className="flex items-center justify-center">
        <div className="grid md:grid-cols-3 grid-cols-1 md:w-[1200px] gap-y-5">
          {userOwnData.subtitles[0] &&
            userOwnData.subtitles[0].applyId != "0" &&
            userOwnData.subtitles.map((item, index) => (
              <OwnOtherCard
                other={{
                  title: "#" + item.subtitleId,
                  detail: item.cid,
                  label1: "Task ID",
                  value1: item.applyId,
                  label2: "Box ID",
                  value2: item.videoId,
                  label3: "Status",
                  value3: item.state,
                  icon: <RiUploadCloud2Fill />,
                  fn1Name: "Pre Settlement",
                  fn1: () => [],
                  fn2Name: "Settlement",
                  fn2: () => [],
                }}
                key={index}
              />
            ))}
          {(!userOwnData.subtitles[0] ||
            (userOwnData.subtitles[0] &&
              userOwnData.subtitles[0].subtitleId == "0")) && <NoItems />}
        </div>
      </div>
    );
  };

  const Audits = () => {
    return isGetDataLoading ? (
      <div className="flex w-full items-center justify-center h-32">
        <Spin />
      </div>
    ) : (
      <div className="flex items-center justify-center">
        <div className="grid md:grid-cols-3 grid-cols-1 md:w-[1200px] gap-y-5">
          {userOwnData.audits[0] &&
            userOwnData.audits[0].applyId != "0" &&
            userOwnData.audits.map((item, index) => (
              <OwnOtherCard
                other={{
                  title: "#" + item.subtitleId,
                  detail: item.cid,
                  label1: "Task ID",
                  value1: item.applyId,
                  label2: "Result",
                  value2: item.attitude,
                  label3: "Status",
                  value3: item.state,
                  icon: <RiShieldCheckFill />,
                  fn1Name: "Pre Settlement",
                  fn1: () => [],
                  fn2Name: "Settlement",
                  fn2: () => [],
                }}
                key={index}
              />
            ))}
          {(!userOwnData.audits[0] ||
            (userOwnData.audits[0] &&
              userOwnData.audits[0].subtitleId == "0")) && <NoItems />}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full h-[250px]">
        <div
          className="w-full bg-center bg-cover"
          style={{
            backgroundImage: `url(${personal_default})`,
          }}
        >
          <div className="flex justify-center mt-40 align-bottom">
            <img
              className="shrink-0 w-32 h-32 md:w-36 md:h-36 rounded-full"
              src={
                avatarAndName.avatar != ""
                  ? avatarAndName.avatar
                  : RANDOM_AVATAR_API
              }
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center text-xl font-semibold text-white space-x-1 mt-12 md:mt-16">
        <BiWalletAlt />
        <div>{shortenAddress(param.id ? param.id : "")}</div>
      </div>
      <div className="flex flex-wrap items-center justify-center my-5 space-x-2">
        <PersonalItem
          label="REPUTATION"
          value="100.0"
          icon={<BiAward />}
          fn={{ label: "Submit", fn: () => [] }}
        />
        <PersonalItem
          label="DEPOSIT"
          value="100.0"
          icon={<BiBitcoin />}
          fn={{ label: "Update", fn: showDepositAssetModal }}
        />
        <PersonalItem
          label="GUARD"
          value="0x1234...5678"
          icon={<BiCheckShield />}
          fn={{ label: "Set", fn: () => [] }}
        />
      </div>
      <Tabs
        defaultActiveKey="1"
        tabBarGutter={50}
        centered
        size="large"
        items={[
          {
            label: <div className="font-semibold text-lg ">TASKS</div>,
            key: "1",
            children: <Tasks />,
          },
          {
            label: <div className="font-semibold text-lg">ITEMS</div>,
            key: "2",
            children: <Items />,
          },
          {
            label: <div className="font-semibold text-lg">AUDITED</div>,
            key: "3",
            children: <Audits />,
          },
          {
            label: <div className="font-semibold text-lg">ASSETS</div>,
            key: "4",
            children: <Tokens />,
          },
        ]}
      />
    </div>
  );
};
export default Personal;
