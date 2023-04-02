import React, { useEffect, useContext } from "react";
import { DashboardMini, PrimaryButton } from "../components";
import { DashboardMiniItem } from "../types/baseTypes";
import {
  MdPeopleAlt,
  MdAllInbox,
  MdOutlineSubtitles,
  MdOutlineVideoLibrary,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import { GlobalContext } from "../context/GlobalContext";
import { star_background, coins } from "../assets";
import { Table } from "antd";
import { columns, data } from "../utils/table/columns";

const Home = (): React.ReactElement => {
  const {
    dashboard,
    applications,
    subtitles,
    queryHomeData,
    isGetDataLoading,
  } = useContext(DataContext);
  const { chainId } = useContext(GlobalContext);

  useEffect(() => {
    queryHomeData();
    const timer = setInterval(() => {
      queryHomeData();
    }, 60000);
    return () => {
      clearInterval(timer);
    };
  }, [chainId]);

  const DashboardMiniItems: DashboardMiniItem[] = [
    {
      label: "All Tasks",
      number: "0",
      icon: <MdAllInbox color="#00BEA1" fontSize={25} />,
    },
    {
      label: "All Users",
      number: "0",
      icon: <MdPeopleAlt color="#00BEA1" fontSize={25} />,
    },
    {
      label: "All Items",
      number: "0",
      icon: <MdOutlineSubtitles color="#00BEA1" fontSize={25} />,
    },
    {
      label: "All Platforms",
      number: "0",
      icon: <MdOutlineVideoLibrary color="#00BEA1" fontSize={25} />,
    },
  ];

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
            <div className="md:text-4xl text-3xl font-bold">
              <div>Transparent, Fair, and Efficient</div>
              <div>Crowdsourcing Experience</div>
            </div>
            <div className="md:text-xl text-lg font-medium text-slate-300 mt-5 ">
              <div>Explore a modular, customizable, and</div>
              <div>highly compatible crowdsourcing protocol</div>
            </div>
          </div>
          <div className="flex mt-10 space-x-5">
            <PrimaryButton label="Post" bgColor="#00BEA1" textColor="#fff" />
            <PrimaryButton
              label="Learn"
              bgColor="#edebdc"
              textColor="#000000"
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
        <div className="flex flex-col mx-3 md:w-full mt-5">
          <div className="flex flex-col px-2">
            <div className="flex justify-center items-center py-2 text-[#00BEA1] text-base border-b border-[#0f0a19] bg-[#1b1524] rounded-t-3xl">
              Latest Tasks
            </div>
            <Table
              columns={columns}
              dataSource={data}
              pagination={false}
              scroll={{ scrollToFirstRowOnChange: true, x: true }}
            />
            <div className="flex justify-center py-2 text-[#00BEA1] cursor-pointer text-base bg-[#1b1524] rounded-b-3xl">
              See More
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
