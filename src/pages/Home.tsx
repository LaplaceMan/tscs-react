import { ApplyCard, DashboardMini, SubtitleCard } from "../components";
import { DashboardMiniItem } from "../types/baseTypes";
import {
  MdOutlineLanguage,
  MdAllInbox,
  MdOutlineSubtitles,
  MdOutlineVideoLibrary,
} from "react-icons/md";
import { ApplicationItems, SubtitleItems } from "../utils/testData";
import { Link } from "react-router-dom";
const DashboardMiniItems: DashboardMiniItem[] = [
  {
    label: "All Applications",
    number: 6666,
    change: 50,
    bg: "#ecf8ef",
    iconBg: "#00CD00",
    icon: <MdAllInbox color="#fff" fontSize={25} />,
  },
  {
    label: "All Languages",
    number: 56,
    change: 2,
    bg: "#FDF5E6",
    iconBg: "#FF8C00",
    icon: <MdOutlineLanguage color="#fff" fontSize={25} />,
  },
  {
    label: "All Subtitles",
    number: 9999,
    change: 666,
    bg: "#B0EFFF",
    iconBg: "#1E90FF",
    icon: <MdOutlineSubtitles color="#fff" fontSize={25} />,
  },
  {
    label: "All Videos",
    number: 3333,
    change: 111,
    bg: "#E6E6FA",
    iconBg: "#9932CC",
    icon: <MdOutlineVideoLibrary color="#fff" fontSize={25} />,
  },
];
const Home = (): React.ReactElement => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center">
        <div className="text-3xl md:text-5xl font-bold text-center">
          Culture Without Boundaries
        </div>
        <div className="flex md:text-base text-sm w-2/3 text-center mt-5 font-medium">
          Connect video creators, subtitle producers, viewers and artists in an
          interesting ecosystem.
        </div>
      </div>
      <div className="flex w-full flex-wrap items-center justify-center px-5 mt-10">
        {DashboardMiniItems.map((item, index) => DashboardMini(item, index))}
      </div>
      <div className="flex flex-col mt-10">
        <Link to="./Application">
          <div className="flex items-center justify-center mt-3 mb-2 text-lg font-semibold text-[#696969] hover:text-[#48a8ff] cursor-pointer">
            <MdAllInbox className="mt-1 mr-3" /> Applications
          </div>
        </Link>
        <div className="w-full h-0.5 bg-gray-50 rounded-md mb-3" />
        <div className="flex flex-wrap w-full items-center justify-around">
          {ApplicationItems.map((item, index) => ApplyCard(item, index))}
        </div>
        <Link to="./Government">
          <div className="flex items-center justify-center mt-6 mb-2 text-lg font-semibold text-[#696969] hover:text-[#48a8ff] cursor-pointer">
            <MdAllInbox className="mt-1 mr-3" /> Subtitles
          </div>
        </Link>
        <div className="w-full h-0.5 bg-gray-50 rounded-md mb-3" />
        <div className="flex flex-wrap w-full items-center justify-around">
          {SubtitleItems.map((item, index) => SubtitleCard(item, index))}
        </div>
      </div>
    </div>
  );
};

export default Home;