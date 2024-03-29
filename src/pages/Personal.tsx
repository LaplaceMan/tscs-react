import React, { useContext, useEffect, useState } from "react";
import { Tabs, Spin, Modal } from "antd";
import { BiWalletAlt, BiAward, BiBitcoin, BiCheckShield } from "react-icons/bi";
import { SiEthereum } from "react-icons/si";
import {
  RiTodoFill,
  RiUploadCloud2Fill,
  RiShieldCheckFill,
} from "react-icons/ri";
import { DataContext } from "../context/DataContext";
import { GlobalContext } from "../context/GlobalContext";
import { ApplicationContext } from "../context/ApplicationContext";
import { shortenAddress, bignumberConvert } from "../utils/tools";
import {
  DECIMALS_18,
  RANDOM_AVATAR_API,
  SUPPORT_NETWORK,
} from "../utils/constants";
import {
  OwnAssetCard,
  OwnOtherCard,
  NoItems,
  UpdateTaskModal,
  TokenTransactionModal,
  DepositManageModal,
  GuardManageModal,
} from "../components";
import { PLATFORM_TOKEN } from "../utils/contracts";
import { getNetwork } from "@wagmi/core";
import { personal_default } from "../assets";
import { useParams, useNavigate } from "react-router-dom";
import {
  OwnTaskCard,
  OwnItemCard,
  OwnAuditCard,
  User,
} from "../types/baseTypes";
import { ethers } from "ethers";

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
  const { chain } = getNetwork();
  const param = useParams();
  const navigate = useNavigate();
  const {
    isGetDataLoading,
    querySpecialUser,
    querySpecialUserOwnItems,
    querySpecialUserOwnTasks,
    querySpecialUserOwnAudits,
  } = useContext(DataContext);
  const {
    showDepositAssetModal,
    showUpdateTaskModal,
    showGuardManageModal,
    isUpdateTaskModalOpen,
    isDepositAssetModalOpen,
    isTokenTransactionModalOpen,
    isGuardManageModalOpen,
  } = useContext(GlobalContext);
  const { getPTBalance, preExtract } = useContext(ApplicationContext);
  const { cancelTask, updateDefaultUpdateTask } = useContext(ApplicationContext);
  const [user, setUser] = useState<User | null>(null);
  const [ownTasks, setOwnTasks] = useState<OwnTaskCard[] | null>([]);
  const [ownItems, setOwnItems] = useState<OwnItemCard[] | null>([]);
  const [ownAudits, setOwnAudits] = useState<OwnAuditCard[] | null>();
  const [userBalaces, setUserBalances] = useState<ethers.BigNumber[] | null>(
    []
  );
  useEffect(() => {
    const feachData = async (id: string) => {
      const data = await querySpecialUser(id);
      if (data && data.item != undefined) {
        setUser(data.item);
      }
      if (data && data.tasks != undefined) {
        setOwnTasks(data.tasks);
      }
      const balances = await getPTBalance(id);
      if (balances) {
        setUserBalances(balances);
      }
    };
    param.id != undefined && feachData(param.id.toLocaleLowerCase());
  }, [chain?.id]);

  const queryItems = async (id: string) => {
    const data = await querySpecialUserOwnItems(id.toLocaleLowerCase());
    if (data && data != undefined) {
      setOwnItems(data);
    }
  };

  const queryTasks = async (id: string) => {
    const data = await querySpecialUserOwnTasks(id.toLocaleLowerCase());
    if (data && data != undefined) {
      setOwnTasks(data);
    }
  };

  const queryAudits = async (id: string) => {
    const data = await querySpecialUserOwnAudits(id.toLocaleLowerCase());
    if (data && data != undefined) {
      setOwnAudits(data);
    }
  };

  const tabsHandle = (id: string) => {
    if (param.id != undefined) {
      switch (id) {
        case "1":
          queryTasks(param.id);
        case "2":
          queryItems(param.id);
        case "3":
          queryAudits(param.id);
      }
    }
  };

  const Tokens = () => {
    return (
      <div className="flex items-center justify-center">
        <div className="grid md:grid-cols-3 grid-cols-1 md:w-[1200px] gap-y-5">
          <OwnAssetCard
            token={{
              name: "PlatformToken-0",
              balance: userBalaces && userBalaces[0] ? userBalaces[0] : "None",
              type: "ERC-1155",
              issuser: "Murmes",
              address:
                chain && SUPPORT_NETWORK.includes(chain.id)
                  ? PLATFORM_TOKEN[chain.id]
                  : "",
              symbol: "PT",
              tokenId: "0",
              decimals: "6",
              icon: <SiEthereum />,
            }}
          />
          <OwnAssetCard
            token={{
              name: "PlatformToken-1",
              balance: userBalaces && userBalaces[1] ? userBalaces[1] : "None",
              type: "ERC-1155",
              issuser: "Lens",
              address:
                chain && SUPPORT_NETWORK.includes(chain.id)
                  ? PLATFORM_TOKEN[chain.id]
                  : "",
              symbol: "PT",
              tokenId: "1",
              decimals: "6",
              icon: <SiEthereum />,
            }}
          />
        </div>
      </div>
    );
  };

  const updateTaskHandle = (taskId: string) => {
    updateDefaultUpdateTask(taskId);
    showUpdateTaskModal();
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
                  fn1: () => updateTaskHandle(item.taskId),
                  fn2Name: "Cancel",
                  fn2: () => cancelTask(item.taskId),
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
          {ownItems &&
            ownItems.map((item, index) => (
              <OwnOtherCard
                other={{
                  title: "#" + item.id,
                  detail: item.source,
                  label1: "Task ID",
                  value1: item.taskId,
                  label2: "Box ID",
                  value2: item.boxId,
                  label3: "State",
                  value3: item.state,
                  icon: <RiUploadCloud2Fill />,
                  fn1Name: "Pre Extract",
                  fn1: () => preExtract({payment: item.payment, taskId: item.taskId, boxId: item.boxId}),
                  fn2Name: "Extract",
                  fn2: () => navigate("/Tools"),
                }}
                key={index}
              />
            ))}
          {(!ownItems || ownItems.length == 0) && <NoItems />}
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
          {ownAudits &&
            ownAudits.map((item, index) => (
              <OwnOtherCard
                other={{
                  title: "#" + item.itemId,
                  detail: item.source,
                  label1: "Task ID",
                  value1: item.taskId,
                  label2: "Result",
                  value2: item.result,
                  label3: "State",
                  value3: item.state,
                  icon: <RiShieldCheckFill />,
                  fn1Name: "Pre Extract",
                  fn1: () => item.boxId && preExtract({payment: item.payment, taskId: item.taskId, boxId: item.boxId}),
                  fn2Name: "Extract",
                  fn2: () => navigate("/Tools"),
                }}
                key={index}
              />
            ))}
          {(!ownAudits || ownAudits.length == 0) && <NoItems />}
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
        onChange={(activeKey) => tabsHandle(activeKey)}
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
      <Modal
        getContainer={false}
        open={isTokenTransactionModalOpen}
        destroyOnClose={true}
        forceRender
        closable={false}
        footer={null}
        centered
      >
        <TokenTransactionModal />
      </Modal>
      <Modal
        getContainer={false}
        open={isUpdateTaskModalOpen}
        destroyOnClose={true}
        forceRender={true}
        closable={false}
        footer={null}
        centered
      >
        <UpdateTaskModal />
      </Modal>
      <Modal
        getContainer={false}
        open={isDepositAssetModalOpen}
        destroyOnClose={true}
        forceRender
        closable={false}
        footer={null}
        centered
      >
        <DepositManageModal />
      </Modal>
      <Modal
        getContainer={false}
        open={isGuardManageModalOpen}
        destroyOnClose={true}
        forceRender
        closable={false}
        footer={null}
        centered
      >
        <GuardManageModal current={user?.guard} />
      </Modal>
    </div>
  );
};
export default Personal;
