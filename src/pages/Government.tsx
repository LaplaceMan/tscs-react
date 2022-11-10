import React, { useContext } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { government_Illustration } from "../assets/index";
import { SubtitleCard } from "../components";
import { SubtitleItems } from "../utils/testData";
import { ApplicationContext } from "../context/ApplicationContext";
const Government = (): React.ReactElement => {
  const { showUploadModal, updateDefaultUploadSubtitleData } =
    useContext(ApplicationContext);
  const uploadSubtitleHandle = () => {
    updateDefaultUploadSubtitleData('0', 1);
    showUploadModal();
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row w-full items-center md:justify-between sm:justify-center sm:-mr-10">
        <div className="flex flex-col items-start md:w-[40rem] sm:w-[20rem] md:mr-14 min-w-[320px] sm:mr-[-14px]">
          <div className="flex md:text-5xl font-bold sm:text-2xl">
            Make favorite videos known to the world
          </div>
          <div className="flex md:text-base my-5 w-5/6 font-medium sm:text-xs">
            Not only "Power Generation For Love", you will get rewards from
            Web3. Join this new and interesting community!
          </div>
          <div
            className="flex md:px-12 py-2 text-white font-semibold md:text-lg  text-center rounded-full items-center justify-center bg-gradient-to-r from-purple-400 to-blue-400 mt-2 sm:text-base sm:px-10 cursor-pointer hover:brightness-110"
            onClick={uploadSubtitleHandle}
          >
            Upload <FiArrowUpRight className="ml-3" />
          </div>
        </div>
        <div className="flex items-center justify-center w-1/3 min-w-[320px]">
          <img src={government_Illustration} />
        </div>
      </div>
      <div className="flex flex-wrap w-full items-center justify-around md:justify-between">
        {SubtitleItems.map((item, index) => SubtitleCard(item, index))}
      </div>
    </div>
  );
};

export default Government;
