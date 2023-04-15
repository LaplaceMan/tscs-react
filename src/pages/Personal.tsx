import React, { useContext, useEffect, useState } from "react";
import { Tabs, Spin } from "antd";
import { BiWalletAlt, BiAward, BiBitcoin, BiCheckShield } from "react-icons/bi";
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
  NoItems,
} from "../components";
import { ZIMU_TOKEN, VIDEO_TOKEN } from "../utils/contracts";
import { getNetwork, getProvider, fetchEnsAvatar } from "@wagmi/core";
import { personal_default } from "../assets";

const PersonalItem = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactElement;
}) => {
  return (
    <div className="flex flex-col items-center text-white border border-dashed p-2 rounded-xl text-base w-[150px]">
      <div>{label}</div>
      <div className="flex items-center space-x-1">
        <div>{icon}</div>
        <div>{value}</div>
      </div>
    </div>
  );
};

const Personal = (): React.ReactElement => {
  const { userOwnData, queryUserOwnData, isGetDataLoading } =
    useContext(DataContext);
  const { personalDID, getPersonalPageData } = useContext(ApplicationContext);
  const { chainId } = useContext(GlobalContext);
  const [avatarAndName, setAvatarAndName] = useState({ avatar: "", name: "" });
  const { chain } = getNetwork();
  const provider = getProvider();
  const user: string = window.location.pathname.slice(10);
  useEffect(() => {
    if (provider) {
      fetchEnsAvatar({ address: user as `0x${string}` }).then((ens: any) => {
        if (ens) {
          setAvatarAndName({ ...avatarAndName, avatar: ens });
        }
      });
    }
    // queryUserOwnData(user);
    // getPersonalPageData(user);
  }, [chainId]);

  const Assets = () => {
    return (
      <div className="flex items-center justify-center">
        <div className="grid md:grid-cols-3 grid-cols-1 w-[1200px]">
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
                videoId: item.videoId,
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
                videoId: item.videoId,
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
        <div>{shortenAddress(user)}</div>
      </div>
      <div className="flex items-center justify-center my-5 space-x-2">
        <PersonalItem label="REPUTATION" value="100.0" icon={<BiAward />} />
        <PersonalItem label="DEPOSIT" value="100.0" icon={<BiBitcoin />} />
        <PersonalItem
          label="GUARD"
          value="0x1234...5678"
          icon={<BiCheckShield />}
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
            children: Applications(),
          },
          {
            label: <div className="font-semibold text-lg">ITEMS</div>,
            key: "2",
            children: Subtitles(),
          },
          {
            label: <div className="font-semibold text-lg">AUDITED</div>,
            key: "3",
            children: Audits(),
          },
          {
            label: <div className="font-semibold text-lg">ASSETS</div>,
            key: "4",
            children: Assets(),
          },
        ]}
      />
    </div>
  );
};
export default Personal;
