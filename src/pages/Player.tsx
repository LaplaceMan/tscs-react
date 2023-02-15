import React, { useEffect, useState, useContext, useRef } from "react";
import { Tag, Spin } from "antd";
import { DataContext } from "../context/DataContext";
import { shortenAddress, timestampToDate, shortenText } from "../utils/tools";
import { Subtitle } from "../types/baseTypes";
import { ApplicationContext } from "../context/ApplicationContext";
import { GlobalContext } from "../context/GlobalContext";
import { BigNumber } from "bignumber.js";

let applyId: string | undefined;
let aliplayer: any;

const tagFormat = (tagName: string, tagContent: string): string => {
  let text: string = tagContent;
  switch (tagName) {
    case "Applicant":
      text = shortenAddress(tagContent);
      break;
    case "Deadline":
      text = timestampToDate(parseInt(tagContent));
      break;
    case "Source":
      text = shortenText(tagContent);
      break;
    default:
      text = tagContent;
  }
  return text;
};
const Player = () => {
  const [usedSubtitle, setUsedSubtitle] = useState({ id: "", source: "" });
  const palyerRef = useRef<any>();
  const { updateDefaultAuditSubtitleData } = useContext(ApplicationContext);
  const {
    playerBaseInfo,
    querySpecialApplication,
    playerSubtitles,
    isGetDataLoading,
    queryUserData,
  } = useContext(DataContext);
  const { showAuditModal } = useContext(GlobalContext);
  useEffect(() => {
    applyId = location.pathname.split("/")[2];
    if (applyId) {
      querySpecialApplication(applyId);
    }
    const defaultProps = {
      id: `videoPlayer`,
      source:
        "http://10.201.1.236:8088/ipfs/QmYPAniT52qJvSTsPBTfK1BXgfgqNmALGfQpyaczsKePxh?filename=%E9%BB%91%E4%BA%BA%E5%B0%8F%E5%93%A5%E7%9C%8B%E9%BB%91%E7%A5%9E%E8%AF%9D%E6%82%9F%E7%A9%BA%E6%9C%80%E6%96%B0%E5%85%94%E5%B9%B4%E8%B4%BA%E5%B2%81%E7%9F%AD%E7%89%87.mp4",
      height: "100%",
      preload: false,
      isLive: false,
      autoplay: false,
      language: "zh-cn",
      controlBarVisibility: "always",
      x5_fullscreen: true,
    };
    if (aliplayer) {
      aliplayer.dispose();
    }
    aliplayer = new (window as any).Aliplayer(defaultProps);
    palyerRef.current = aliplayer;
  }, []);

  const auditSubtitleHandle = (data: Subtitle) => {
    updateDefaultAuditSubtitleData(data);
    queryUserData(data.maker);
    showAuditModal();
  };

  const selectSubtitle = (id: string, source: string) => {
    setUsedSubtitle({ id: id, source: source });
    if (palyerRef.current) {
      palyerRef.current.setTextTracks([
        {
          kind: "subtitles",
          label: "#" + usedSubtitle.id,
          src: "http://10.201.1.236:8088/ipfs/Qmd78LiUk1YoV5v4EePoEy4wPMAGNYe1Z5tMVR52E9FBMW?filename=%5B%E4%B8%AD%E5%AD%97%5DBlack%20Myth%20Wukong%20We%20Finally%20Get%20Dates%20_%20GBG%20Reacts.vtt",
          srclang: "zh-CN",
        },
      ]);
      palyerRef.current._ccService.switch("zh-CN");
    }
  };

  const BaseInfo = ({
    tagName,
    tagContent,
  }: {
    tagName: string;
    tagContent: string;
  }) => {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="text-[#696969] md:text-base">{tagName}</div>
        <div className="md:text-lg font-bold">
          {tagFormat(tagName, tagContent)}
        </div>
      </div>
    );
  };

  const AuditButton = ({ data }: { data: Subtitle }): React.ReactElement => {
    return (
      <div
        className="flex items-center justify-center rounded-xl text-white font-medium py-3 px-6 cursor-pointer bg-gradient-to-r from-purple-400 to-blue-400 hover:brightness-110"
        onClick={() => auditSubtitleHandle(data)}
      >
        Audit
      </div>
    );
  };

  const UploadedSubtitle = ({
    id,
    maker,
    cid,
    reputation,
    fingerprint,
    support,
    oppose,
  }: {
    id: string;
    maker: string;
    cid: string;
    reputation: string;
    fingerprint: string;
    support: string;
    oppose: string;
  }) => {
    return (
      <div
        className={`flex flex-row rounded-3xl w-full items-center justify-between p-4 hover:bg-gray-50 cursor-pointer h-[90px] text-base ${
          usedSubtitle.id == id ? "bg-green-50" : ""
        }`}
        onClick={() => selectSubtitle(id, cid)}
      >
        <div className=" font-bold">{`# ${id}`}</div>
        <div>
          <Tag>Maker</Tag>
          {shortenAddress(maker)}
        </div>
        <div>
          <Tag>Fingerprint</Tag>
          {"0x" + BigNumber(fingerprint).toString(16)}
        </div>
        <div>
          <Tag color="gold">Reputation</Tag>
          {BigNumber(reputation).div(10).toString()}
        </div>
        <div>
          <Tag color="cyan">Support</Tag>
          {support}
        </div>
        <div>
          <Tag color="red">Oppose</Tag>
          {oppose}
        </div>
        <AuditButton
          data={{
            applyId: applyId ? applyId : "",
            applySource: playerBaseInfo.source,
            payType: playerBaseInfo.payType,
            platformName: playerBaseInfo.platform,
            subtitleId: id,
            language: playerBaseInfo.language,
            support: support,
            oppose: oppose,
            maker: maker,
            start: parseInt(playerBaseInfo.start),
            deadline: parseInt(playerBaseInfo.deadline),
            fingerprint: fingerprint,
            cid: cid,
          }}
        />
      </div>
    );
  };

  const baseData: { tagName: string; tagContent: string }[] = [
    {
      tagName: "Applicant",
      tagContent: playerBaseInfo.applicant,
    },
    { tagName: "Platfrom", tagContent: playerBaseInfo.platform },
    { tagName: "Id", tagContent: applyId as string },
    { tagName: "Source", tagContent: playerBaseInfo.source },
    { tagName: "Uploads", tagContent: playerBaseInfo.uploads },
    { tagName: "Deadline", tagContent: playerBaseInfo.deadline },
    { tagName: "Language", tagContent: playerBaseInfo.language },
    { tagName: "Adopted", tagContent: playerBaseInfo.adopted },
  ];

  return (
    <div className="flex mt-[8px] flex-col px-[8px]">
      <Spin spinning={isGetDataLoading} size="large">
        <div className="w-full">
          <div className="w-full flex ring ring-black ring-offset-4 h-[400px]">
            <div id="videoPlayer" className="prism-player"></div>
          </div>
          <div className="flex rounded-md mt-[30px] px-2 py-5 justify-between flex-wrap items-center border-b-2">
            {baseData.map((item, index) => (
              <BaseInfo
                tagName={item.tagName}
                tagContent={item.tagContent}
                key={index}
              />
            ))}
          </div>
          <div className="flex flex-col w-full mt-[35px] space-y-2">
            {playerSubtitles.length > 0 &&
              playerSubtitles.map((item, index) => (
                <UploadedSubtitle
                  key={index}
                  id={item.id}
                  cid={item.cid}
                  reputation={item.reputation}
                  fingerprint={item.fingerprint}
                  support={item.support}
                  oppose={item.oppose}
                  maker={item.maker}
                />
              ))}
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default Player;
