import React, { useEffect, useContext, useState } from "react";
import { PrimaryButton } from "../components";
import {
  DashboardMiniItem,
  ListItem,
  ListPlatform,
  ListTask,
  ListUser,
} from "../types/baseTypes";
import {
  MdPeopleAlt,
  MdAllInbox,
  MdOutlineSubtitles,
  MdOutlineVideoLibrary,
} from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import { GlobalContext } from "../context/GlobalContext";
import { star_background, coins, ethereum, polygon } from "../assets";
import { Table, Spin } from "antd";
import { columns, data } from "../utils/table/columns";

const ChainContainer = ({ url, name }: { url: string; name: string }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl">
      <div className="flex w-[140px] h-[140px] items-center justify-center chain-container">
        <img
          src={url}
          style={{ height: "100px", maxWidth: "100px", borderRadius: "100%" }}
        />
      </div>
      <div className="mb-4 text-lg text-slate-300">{name}</div>
    </div>
  );
};

const Home = (): React.ReactElement => {
  const {
    dashboard,
    tasks,
    items,
    users,
    platforms,
    queryDashboard,
    queryTaskData,
    queryItemData,
    queryUserData,
    queryPlatforms,
    isGetDataLoading,
  } = useContext(DataContext);
  const { chainId } = useContext(GlobalContext);
  const [tableDataType, setTableDataType] = useState("Tasks");
  const navigate = useNavigate();

  useEffect(() => {
    queryDashboard();
    queryTaskData(8, 0, "0");
  }, [chainId]);

  const DashboardMiniItems: DashboardMiniItem[] = [
    {
      label: "All Tasks",
      tag: "Tasks",
      number: dashboard?.taskCount ? dashboard.taskCount : "0",
      icon: <MdAllInbox color="#00BEA1" fontSize={25} />,
    },
    {
      label: "All Users",
      tag: "Users",
      number: dashboard?.userCount ? dashboard.userCount : "0",
      icon: <MdPeopleAlt color="#00BEA1" fontSize={25} />,
    },
    {
      label: "All Items",
      tag: "Items",
      number: dashboard?.itemCount ? dashboard.itemCount : "0",
      icon: <MdOutlineSubtitles color="#00BEA1" fontSize={25} />,
    },
    {
      label: "All Platforms",
      tag: "Platforms",
      number: dashboard?.platformCount ? dashboard.platformCount : "0",
      icon: <MdOutlineVideoLibrary color="#00BEA1" fontSize={25} />,
    },
  ];

  const dashboardMiniHandle = (item: DashboardMiniItem) => {
    setTableDataType(item.tag);
    switch (item.tag) {
      case "Tasks": {
        queryTaskData(8, 0, "0");
      }
      case "Items": {
        queryItemData(8, 0, "0");
      }
      case "Users": {
        queryUserData(8, 0);
      }
      case "Platforms": {
        queryPlatforms();
      }
    }
  };

  const seeMoreLink = () => {
    switch (tableDataType) {
      case "Tasks":
        navigate("/Tasks");
      case "Items":
        navigate("Items");
    }
  };

  const tableData = ():
    | ListItem[]
    | ListTask[]
    | ListUser[]
    | ListPlatform[]
    | null => {
    switch (tableDataType) {
      case "Tasks":
        return tasks;
      case "Items":
        return items;
      case "Users":
        return users;
      case "Platforms":
        return platforms;
      default:
        return null;
    }
  };

  const DashboardMini = ({ item }: { item: DashboardMiniItem }) => {
    return (
      <div
        className="flex flex-rows items-center justify-between rounded-3xl px-5 py-3 md:w-[250px] md:h-[100px] w-[200px] h-[85px] bg-[#1b1524] m-2 cursor-pointer"
        onClick={() => dashboardMiniHandle(item)}
      >
        <div className="flex flex-col items-start justify-center text-slate-300">
          <div className="md:text-base text-sm font-medium">{item.label}</div>
          <div className="md:text-3xl text-2xl font-bold my-1">
            {item.number}
          </div>
        </div>
        <div
          className="flex rounded-xl items-center justify-center w-[50px] h-[50px]"
          style={{
            background:
              "radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, #00BEA1 0%, rgba(255, 255, 255, 0.1) 70%)",
          }}
        >
          {item.icon}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center text-white">
      <div
        className="flex w-full"
        style={{
          backgroundImage: `url(${star_background})`,
          backgroundSize: "100% 100%",
        }}
      >
        <div
          className="flex flex-col items-center text-center w-full bg-no-repeat bg-center py-5 bg-contain md:bg-auto"
          style={{
            backgroundImage: `url(${coins})`,
          }}
        >
          <div className="my-10">
            <div className="md:text-4xl text-3xl font-bold title">
              <div>Transparent, Fair, and Efficient</div>
              <div>Crowdsourcing Experience</div>
            </div>
            <div className="md:text-xl text-lg font-medium text-slate-300 mt-5 ">
              <div>Explore a modular, customizable, and</div>
              <div>highly compatible crowdsourcing protocol</div>
            </div>
          </div>
          <div className="flex mt-10 space-x-5">
            <Link to="/Post">
              <PrimaryButton
                label="Post"
                bgColor="#00BEA1"
                textColor="#fff"
                fn={() => []}
              />
            </Link>
            <PrimaryButton
              label="Learn"
              bgColor="#edebdc"
              textColor="#000000"
              fn={() => []}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center md:w-[1200px] mt-12">
        <div className="flex w-full flex-wrap md:justify-between justify-center ">
          {DashboardMiniItems.map((item, index) => (
            <DashboardMini item={item} key={index} />
          ))}
        </div>

        <div className="flex flex-col md:w-full mt-10 px-2">
          <Spin spinning={isGetDataLoading}>
            <div className="flex flex-col bg-[#1b1524] rounded-3xl ">
              <div className="flex justify-center items-center py-2 text-[#00BEA1] text-base border-b border-[#0f0a19] overflow-hidden">
                Latest {tableDataType}
              </div>
              <Table
                columns={columns[tableDataType]}
                dataSource={tableData()!}
                pagination={false}
                scroll={{ x: 1100 }}
                style={{
                  width: document.body.clientWidth - 40,
                }}
              />
              <div
                className="flex justify-center py-2 text-[#00BEA1] cursor-pointer text-base"
                onClick={seeMoreLink}
              >
                See More
              </div>
            </div>
          </Spin>
          <div className="flex flex-col mt-14 items-center">
            <div className="text-2xl">SUPPORT NETWORKS</div>

            <div className="flex mt-5 space-x-10">
              {[
                { url: ethereum, name: "Ethereum" },
                { url: polygon, name: "Polygon" },
              ].map((item, index) => (
                <ChainContainer url={item.url} name={item.name} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
