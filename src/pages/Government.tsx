import { Pagination, Select, Spin } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { government_Illustration } from "../assets/index";
import { SubtitleCard } from "../components";
import { SubtitleItems } from "../utils/testData";
import { DataContext } from "../context/DataContext";
import { GlobalContext } from "../context/GlobalContext";
import { DEFAULT_PAGE_SIZE } from "../utils/constants";
import { countryLanguageMap } from "../utils/constants";
const { Option } = Select;
const Government = (): React.ReactElement => {
  const { showUploadModal } = useContext(GlobalContext);
  const {
    subtitles,
    querySubtitleData,
    dashboard,
    regiserLanguages,
    isGetDataLoading,
  } = useContext(DataContext);
  const [currentPage, setCurrentPage] = useState({ page: 1, language: "0" });

  useEffect(() => {
    querySubtitleData(DEFAULT_PAGE_SIZE, 0, "0");
  }, []);

  const pageChangeHandle = (page: number, pageSize: number) => {
    const skip = page == 1 ? 0 : (page - 1) * pageSize;
    querySubtitleData(pageSize, skip, currentPage.language);
  };

  const languageChangeHandle = (language: string) => {
    setCurrentPage({ page: 1, language: language });
    querySubtitleData(DEFAULT_PAGE_SIZE, 0, language);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row w-full items-center md:justify-between justify-center -mr-10">
        <div className="flex flex-col items-start md:w-[40rem] w-[20rem] md:mr-14 min-w-[320px] mr-[-14px]">
          <div className="flex md:text-5xl font-bold text-2xl">
            Make favorite videos known to the world
          </div>
          <div className="flex md:text-base my-5 w-5/6 font-medium text-xs">
            Not only &quot; Power Generation For Love &quot;, you will get
            rewards from Web3. Join this new and interesting community!
          </div>
          <div
            className="flex md:px-12 py-2 text-white font-semibold md:text-lg  text-center rounded-full items-center justify-center bg-gradient-to-r from-purple-400 to-blue-400 mt-2 text-base px-10 cursor-pointer hover:brightness-110"
            onClick={showUploadModal}
          >
            Upload <FiArrowUpRight className="ml-3" />
          </div>
        </div>
        <div className="flex items-center justify-center w-1/3 min-w-[320px]">
          <img src={government_Illustration} />
        </div>
      </div>
      {isGetDataLoading ? (
        <div className="flex w-full items-center justify-center h-32">
          <Spin />
        </div>
      ) : (
        <div className="flex flex-wrap w-full items-center justify-around md:justify-between">
          {subtitles.map(
            (item, index) => item.applyId != "0" && SubtitleCard(item, index)
          )}
          {SubtitleItems.map((item, index) => SubtitleCard(item, index))}
        </div>
      )}

      <div className="flex my-5 items-center justify-center">
        <Pagination
          current={currentPage.page}
          defaultPageSize={DEFAULT_PAGE_SIZE}
          total={Number(dashboard.applicationCount)}
          responsive={true}
          onChange={(page, pageSize) => pageChangeHandle(page, pageSize)}
        />
        <Select
          placement="topLeft"
          placeholder="Language"
          onChange={(value) => languageChangeHandle(value)}
        >
          <Option value="0">All</Option>
          {regiserLanguages.length > 0 &&
            regiserLanguages.map((item, index) => (
              <Option value={item.id} key={item + index.toString()}>
                {countryLanguageMap[item.notes]
                  ? countryLanguageMap[item.notes]
                  : item.notes}
              </Option>
            ))}
        </Select>
      </div>
    </div>
  );
};

export default Government;
