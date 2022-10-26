import React, { useContext } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { government_Illustration } from "../assets/index";
import { SubtitleCard } from "../components";
import { SubtitleItems } from "../utils/testData";
import { ApplicationContext } from "../context/ApplicationContext";
const Government = (): React.ReactElement => {
  const { showUploadModal, isUploadModalOpen } = useContext(ApplicationContext);

  return (
    <div className="flex flex-col items-center -mt-5">
      <div className="flex flex-row w-full items-center justify-center sm:-mr-10">
        <div className="flex flex-col items-start md:w-[40rem] sm:w-[20rem] md:mr-14 min-w-[320px]">
          <div className="flex md:text-5xl font-bold sm:text-2xl">
            Make favorite videos known to the world
          </div>
          <div className="flex md:text-base my-5 w-5/6 font-medium sm:text-xs">
            Reduce your risk and burden with multi-payment strategies and
            decentralized audit.
          </div>
          <div
            className="flex md:px-12 py-2 text-white font-semibold md:text-lg bg-black text-center rounded-full items-center justify-center hover:bg-[#48a8ff] mt-2 sm:text-base sm:px-10 cursor-pointer"
            onClick={showUploadModal}
          >
            Upload <FiArrowUpRight className="ml-3" />
          </div>
        </div>
        <div className="flex items-center justify-center md:w-1/3 sm:w-1/2 min-w-[320px]">
          <img src={government_Illustration} />
        </div>
      </div>
      <div className="flex flex-wrap w-full items-center justify-around">
        {SubtitleItems.map((item, index) => SubtitleCard(item, index))}
      </div>
    </div>
  );
};

export default Government;
