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
import { shortenAddress, bignumberConvert } from "../utils/tools";
import {
  DECIMALS_6,
  DECIMALS_18,
  RANDOM_AVATAR_API,
  SUPPORT_NETWORK,
} from "../utils/constants";
import { OwnAssetCard, OwnOtherCard, NoItems } from "../components";
import { TEST_TOKEN, PLATFORM_TOKEN } from "../utils/contracts";
import { getNetwork } from "@wagmi/core";
import { personal_default } from "../assets";
import { useParams, useNavigate } from "react-router-dom";
import { OwnTaskCard, User } from "../types/baseTypes";

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
  const { isGetDataLoading, querySpecialUser } = useContext(DataContext);
  const {} = useContext(ApplicationContext);
  const { showDepositAssetModal, showUpdateTaskModal, showGuardManageModal } =
    useContext(GlobalContext);
  const [user, setUser] = useState<User | null>(null);
  const [ownTasks, setOwnTasks] = useState<OwnTaskCard[] | null>([]);
  const { chain } = getNetwork();
  const param = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const feachData = async (id: string) => {
      const data = await querySpecialUser(id);
      if (data && data.item != undefined) {
        setUser(data.item);
      }
      if (data && data.tasks != undefined) {
        setOwnTasks(data.tasks);
      }
    };
    param.id != undefined && feachData(param.id.toLocaleLowerCase());
    // param.id && queryUserOwnData(param.id as `0x${string}`);
    // getPersonalPageData(user);
  }, [chain?.id]);

  const Tokens = () => {
    return (
      <div className="flex items-center justify-center">
        <div className="grid md:grid-cols-3 grid-cols-1 md:w-[1200px] gap-y-5">
          <OwnAssetCard
            token={{
              name: "Zimu",
              balance: "20",
              type: "ERC-20",
              issuser: "Murmes",
              address:
                chain && SUPPORT_NETWORK.includes(chain.id)
                  ? TEST_TOKEN[chain.id]
                  : "",
              symbol: "Zimu",
              tokenId: "0",
              decimals: 18,
              icon: <SiEthereum />,
            }}
          />
          <OwnAssetCard
            token={{
              name: "VideoToken-0",
              balance: "",
              type: "ERC-1155",
              issuser: "Murmes",
              address:
                chain && SUPPORT_NETWORK.includes(chain.id)
                  ? PLATFORM_TOKEN[chain.id]
                  : "",
              symbol: "VT",
              tokenId: "0",
              decimals: 6,
              icon: <SiEthereum />,
            }}
          />
          <OwnAssetCard
            token={{
              name: "VideoToken-1",
              balance: "",
              type: "ERC-1155",
              issuser: "Lens",
              address:
                chain && SUPPORT_NETWORK.includes(chain.id)
                  ? PLATFORM_TOKEN[chain.id]
                  : "",
              symbol: "VT",
              tokenId: "1",
              decimals: 6,
              icon: <SiEthereum />,
            }}
          />
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
          {ownTasks &&
            ownTasks.map((item, index) => (
              <OwnOtherCard
                other={{
                  title: item.platform,
                  detail: item.source,
                  label1: "Box ID",
                  value1: item.boxId,
                  label2: "Task ID",
                  value2: item.taskId,
                  label3: "State",
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
          {(!ownTasks || ownTasks.length == 0) && <NoItems />}
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
          {/* {userOwnData.subtitles[0] &&
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
                  label3: "State",
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
              userOwnData.subtitles[0].subtitleId == "0")) && <NoItems />} */}
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
          {/* {userOwnData.audits[0] &&
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
                  label3: "State",
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
              userOwnData.audits[0].subtitleId == "0")) && <NoItems />} */}
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
              src={RANDOM_AVATAR_API}
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
          value={bignumberConvert(user?.reputation, 10, 1)}
          icon={<BiAward />}
          fn={{ label: "Submit", fn: () => navigate("/Submit") }}
        />
        <PersonalItem
          label="DEPOSIT"
          value={bignumberConvert(user?.deposit, DECIMALS_18, 2)}
          icon={<BiBitcoin />}
          fn={{ label: "Update", fn: showDepositAssetModal }}
        />
        <PersonalItem
          label="GUARD"
          value={shortenAddress(user?.guard)}
          icon={<BiCheckShield />}
          fn={{ label: "Set", fn: showGuardManageModal }}
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
