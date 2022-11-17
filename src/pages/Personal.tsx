import React, { useContext, useEffect } from "react";
import { Tabs, Empty } from "antd";
import { SiEthereum } from "react-icons/si";
import { WalletContext } from "../context/WalletContext";
import { DataContext } from "../context/DataContext";
import { ApplicationContext } from "../context/ApplicationContext";
import { shortenAddress } from "../utils/tools";
import {
  OwnAssetCard,
  OwnApplicationCard,
  OwnSubtitleCard,
  OwnAuditCard,
  DepositAssetCard,
} from "../components";
import { ZIMU_TOKEN, VIDEO_TOKEN } from "../utils/contracts";

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
  const { accountState } = useContext(WalletContext);
  const { userOwnData, queryUserOwnData } = useContext(DataContext);
  const { personalDID, getPersonalPageData } = useContext(ApplicationContext);
  const user = window.location.pathname.slice(10);

  useEffect(() => {
    queryUserOwnData(user);
    getPersonalPageData(user);
    let timer = setInterval(() => queryUserOwnData(user), 60000);
    return () => clearInterval(timer);
  }, []);

  const Assets = () => {
    return (
      <div className="flex flex-wrap items-center sm:justify-around md:justify-start">
        {DepositAssetCard()}
        {OwnAssetCard({
          name: "Zimu",
          balance: personalDID.zimu,
          type: "ERC-20",
          issuser: "TSCS",
          address: ZIMU_TOKEN[accountState.network],
          symbol: "Zimu",
          tokenId: "0",
          decimals: 18,
        })}
        {OwnAssetCard({
          name: "VideoToken-0",
          balance: personalDID.vt0,
          type: "ERC-1155",
          issuser: "TSCS",
          address: VIDEO_TOKEN[accountState.network],
          symbol: "VT",
          tokenId: "0",
          decimals: 6,
        })}
      </div>
    );
  };

  const Applications = () => {
    return (
      <div className="flex flex-wrap items-center sm:justify-around md:justify-start">
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
    return (
      <div className="flex flex-wrap items-center sm:justify-around md:justify-start">
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
    return (
      <div className="flex flex-wrap items-center sm:justify-around md:justify-start">
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
      <div
        className="h-[250px] md:h-[270px] mt-[8px] ring ring-black ring-offset-4 bg-center bg-cover"
        style={{
          backgroundImage: `url("https://i.seadn.io/gae/P3RpreFAUcZIt1FeVB-y2o95x3zw7DWBU9dXsihVsgdfElfZcl0_8g601ydvtTaOIIN6Pae0VXmZTuN_xictxe6_DsCmR0pO_dSFZg?auto=format&w=1920")`,
        }}
      >
        <div className="mt-40 flex justify-center mx-[60px] align-bottom">
          <img
            className="shrink-0 w-32 h-32 md:w-36 md:h-36 rounded-xl shadow"
            src={"http://api.btstu.cn/sjtx/api.php?lx=c1&format=images"}
          />
        </div>
      </div>
      <div className="flex flex-col items-center mt-11 mb-3 md:mt-10">
        <div className="text-3xl font-bold">ENS</div>
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
