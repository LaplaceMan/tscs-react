import React, { useEffect, useContext } from "react";
import { ApplyCard, DashboardMini, SubtitleCard } from "../components";
import { Application, DashboardMiniItem, Subtitle } from "../types/baseTypes";
import {
  MdPeopleAlt,
  MdAllInbox,
  MdOutlineSubtitles,
  MdOutlineVideoLibrary,
} from "react-icons/md";
import { ApplicationItems, SubtitleItems } from "../utils/testData";
import { Link } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import { GlobalContext } from "../context/GlobalContext";
import { Spin } from "antd";

const Home = (): React.ReactElement => {
  const {
    dashboard,
    applications,
    subtitles,
    queryHomeData,
    isGetDataLoading,
    queryRegiserLanugages,
    queryRegiserPlatforms,
  } = useContext(DataContext);
  const { chainId } = useContext(GlobalContext);

  useEffect(() => {
    queryHomeData();
    queryRegiserLanugages();
    queryRegiserPlatforms();
    const timer = setInterval(() => {
      queryHomeData();
    }, 60000);
    return () => {
      clearInterval(timer);
    };
  }, [chainId]);

  const DashboardMiniItems: DashboardMiniItem[] = [
    {
      label: "All Applications",
      number: dashboard ? dashboard.applicationCount : "0",
      change: dashboard ? dashboard.applicationInc : "0",
      bg: "#ecf8ef",
      iconBg: "#00CD00",
      icon: <MdAllInbox color="#fff" fontSize={25} />,
    },
    {
      label: "All Users",
      number: dashboard ? dashboard.userCount : "0",
      change: dashboard ? dashboard.userInc : "0",
      bg: "#FDF5E6",
      iconBg: "#FF8C00",
      icon: <MdPeopleAlt color="#fff" fontSize={25} />,
    },
    {
      label: "All Subtitles",
      number: dashboard ? dashboard.subtitleCount : "0",
      change: dashboard ? dashboard.subtitleInc : "0",
      bg: "#B0EFFF",
      iconBg: "#1E90FF",
      icon: <MdOutlineSubtitles color="#fff" fontSize={25} />,
    },
    {
      label: "All Platforms",
      number: dashboard ? dashboard.platformCount : "0",
      change: dashboard ? dashboard.platformInc : "0",
      bg: "#E6E6FA",
      iconBg: "#9932CC",
      icon: <MdOutlineVideoLibrary color="#fff" fontSize={25} />,
    },
  ];

  return (
    <div className="flex flex-col items-center mt-12">
      <div className="flex flex-col items-center">
        <div className="text-4xl md:text-5xl font-bold text-center">
          Culture Without Boundaries
        </div>
        <div className="flex md:text-lg text-base w-2/3 text-center mt-5 font-medium">
          Connect video creators, subtitle makers, viewers, platforms and
          artists in an interesting ecosystem.
        </div>
      </div>
      <div className="flex w-full flex-wrap items-center md:justify-between justify-center mt-10">
        {DashboardMiniItems.map((item, index) => DashboardMini(item, index))}
      </div>
      <div className="flex flex-col mt-10">
        <Link to="./Application">
          <div className="flex items-center justify-center mt-3 mb-2 text-lg font-semibold text-black hover:text-[#696969] cursor-pointer">
            <MdAllInbox className="mt-0.5 mr-3" />
            Applications
          </div>
        </Link>
        {isGetDataLoading ? (
          <div className="flex w-full items-center justify-center h-32">
            <Spin />
          </div>
        ) : (
          <div className="flex flex-wrap w-full items-center justify-around md:justify-between">
            {applications &&
              applications.map(
                (item: Application, index: number) =>
                  item.applyId != "" && ApplyCard(item, index)
              )}
            {ApplicationItems.map((item, index) => ApplyCard(item, index))}
          </div>
        )}
        <Link to="./Government">
          <div className="flex items-center justify-center mt-6 mb-2 text-lg font-semibold text-black hover:text-[#696969] cursor-pointer">
            <MdOutlineSubtitles className="mt-0.5 mr-3" /> Subtitles
          </div>
        </Link>
        {isGetDataLoading ? (
          <div className="flex w-full items-center justify-center h-32">
            <Spin />
          </div>
        ) : (
          <div className="flex flex-wrap w-full items-center justify-around md:justify-between">
            {subtitles &&
              subtitles.map(
                (item: Subtitle, index: number) =>
                  item.applyId != "" && SubtitleCard(item, index)
              )}
            {SubtitleItems.map((item, index) => SubtitleCard(item, index))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
