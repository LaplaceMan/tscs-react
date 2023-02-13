import React, { useContext, useEffect, useState } from "react";
import { Tabs, Empty, Spin } from "antd";
import { SiEthereum } from "react-icons/si";
import { DataContext } from "../context/DataContext";
import { ApplicationContext } from "../context/ApplicationContext";
import { GlobalContext } from "../context/GlobalContext";
import { shortenAddress } from "../utils/tools";
import { RANDOM_AVATAR_API, SUPPORT_NETWORK } from "../utils/constants";
import {
  OwnAssetCard,
  OwnApplicationCard,
  OwnSubtitleCard,
  OwnAuditCard,
  DepositAssetCard,
} from "../components";
import { ZIMU_TOKEN, VIDEO_TOKEN } from "../utils/contracts";
import {
  getNetwork,
  getProvider,
  fetchEnsAvatar,
  fetchEnsName,
} from "@wagmi/core";
import { personal_default } from "../assets";

const NoItems = () => {
  return (
    <div className="flex flex-col mx-auto my-10">
      <Empty description={false} />
      <div className="flex flex-col max-w-[360px] mx-auto text-center">
        <span className="font-bold text-2xl">No items to display</span>
        <span className="text-[#696969] text-base mt-1">
          Please refresh the page to try again or submit a new transaction.
        </span>
      </div>
    </div>
  );
};

const Personal = (): React.ReactElement => {
  const user = window.location.pathname.slice(10);
  const { userOwnData, queryUserOwnData, isGetDataLoading } =
    useContext(DataContext);
  const { personalDID, getPersonalPageData } = useContext(ApplicationContext);
  const { chainId } = useContext(GlobalContext);
  const [avatarAndName, setAvatarAndName] = useState({ avatar: "", name: "" });
  const { chain } = getNetwork();
  const provider = getProvider();

  useEffect(() => {
    if (provider) {
      fetchEnsAvatar({ address: user as `0x${string}` }).then((ens: any) => {
        if (ens) {
          setAvatarAndName({ ...avatarAndName, avatar: ens });
        }
      });
      fetchEnsName({ address: user as `0x${string}` }).then((ens: any) => {
        if (ens) {
          setAvatarAndName({ ...avatarAndName, name: ens });
        }
      });
    }
    queryUserOwnData(user);
    getPersonalPageData(user);
    const timer = setInterval(() => queryUserOwnData(user), 600000);
    return () => clearInterval(timer);
  }, [chainId]);

  const Assets = () => {
    return (
      <div className="flex flex-wrap items-center justify-around md:justify-start">
        {DepositAssetCard()}
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
        })}
      </div>
    );
  };

  const Applications = () => {
    return isGetDataLoading ? (
      <div className="flex w-full items-center justify-center h-32">
        <Spin />
      </div>
    ) : (
      <div className="flex flex-wrap items-center justify-around md:justify-start">
        {userOwnData.applications[0] &&
          userOwnData.applications[0].applyId != "0" &&
          userOwnData.applications.map((item, index) =>
            OwnApplicationCard(
              {
                name: item.name,
                type: item.type,
                price: item.price,
                state: item.state,
                source: item.source,
                videoId: item.videoId,
                applyId: item.applyId,
                language: item.language,
                deadline: item.deadline,
              },
              index
            )
          )}
        {(!userOwnData.applications[0] ||
          (userOwnData.applications[0] &&
            userOwnData.applications[0].applyId == "0")) &&
          NoItems()}
      </div>
    );
  };

  const Subtitles = () => {
    return isGetDataLoading ? (
      <div className="flex w-full items-center justify-center h-32">
        <Spin />
      </div>
    ) : (
      <div className="flex flex-wrap items-center justify-around md:justify-start">
        {userOwnData.subtitles[0] &&
          userOwnData.subtitles[0].applyId != "0" &&
          userOwnData.subtitles.map((item, index) =>
            OwnSubtitleCard(
              {
                subtitleId: item.subtitleId,
                cid: item.cid,
                support: item.support,
                oppose: item.oppose,
                state: item.state,
                applyId: item.applyId,
                language: item.language,
                type: item.type,
                platform: item.platform,
              },
              index
            )
          )}
        {(!userOwnData.subtitles[0] ||
          (userOwnData.subtitles[0] &&
            userOwnData.subtitles[0].subtitleId == "0")) &&
          NoItems()}
      </div>
    );
  };

  const Audits = () => {
    return isGetDataLoading ? (
      <div className="flex w-full items-center justify-center h-32">
        <Spin />
      </div>
    ) : (
      <div className="flex flex-wrap items-center justify-around md:justify-start">
        {userOwnData.audits[0] &&
          userOwnData.audits[0].applyId != "0" &&
          userOwnData.audits.map((item, index) =>
            OwnAuditCard(
              {
                subtitleId: item.subtitleId,
                cid: item.cid,
                state: item.state,
                applyId: item.applyId,
                language: item.language,
                attitude: item.attitude,
                type: item.type,
                platform: item.platform,
              },
              index
            )
          )}
        {(!userOwnData.audits[0] ||
          (userOwnData.audits[0] && userOwnData.audits[0].subtitleId == "0")) &&
          NoItems()}
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full h-[250px] md:h-[270px] mt-[8px] px-[8px]">
        <div
          className="w-full ring ring-black ring-offset-4 bg-center bg-cover"
          style={{
            backgroundImage: `url(${personal_default})`,
          }}
        >
          <div className="mt-40 flex justify-center mx-[60px] align-bottom">
            <img
              className="shrink-0 w-32 h-32 md:w-36 md:h-36 rounded-xl shadow"
              src={
                avatarAndName.avatar != ""
                  ? avatarAndName.avatar
                  : RANDOM_AVATAR_API
              }
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center mt-11 mb-3 md:mt-10">
        <div className="text-3xl font-bold">
          {avatarAndName.name != "" ? avatarAndName.name : "ENS"}
        </div>
        <div className="flex text-base font-medium text-[#696969] items-center">
          <SiEthereum className="mr-1 mt-0.5" />
          {shortenAddress(user)}
        </div>
      </div>
      <Tabs
        defaultActiveKey="1"
        tabBarGutter={50}
        centered
        size="large"
        items={[
          {
            label: <div className="font-semibold text-lg ">Applications</div>,
            key: "1",
            children: Applications(),
          },
          {
            label: <div className="font-semibold text-lg">Subtitles</div>,
            key: "2",
            children: Subtitles(),
          },
          {
            label: <div className="font-semibold text-lg">Audited</div>,
            key: "3",
            children: Audits(),
          },
          {
            label: <div className="font-semibold text-lg">Assets</div>,
            key: "4",
            children: Assets(),
          },
        ]}
      />
    </div>
  );
};
export default Personal;
