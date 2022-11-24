import { Pagination, Select } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { application_Illustration } from "../assets/index";
import { FiArrowUpRight } from "react-icons/fi";
import { ApplicationItems } from "../utils/testData";
import { ApplyCard } from "../components";
import { GlobalContext } from "../context/GlobalContext";
import { DataContext } from "../context/DataContext";
import { DEFAULT_PAGE_SIZE } from "../utils/constants";
import { countryLanguageMap } from "../utils/constants";
const { Option } = Select;
const ApplicationPage = (): React.ReactElement => {
  const { applications, queryApplicationData, dashboard, regiserLanguages } =
    useContext(DataContext);
  const { showApplicationModal } = useContext(GlobalContext);
  const [currentPage, setCurrentPage] = useState({ page: 1, language: "0" });
  useEffect(() => {
    queryApplicationData(DEFAULT_PAGE_SIZE, 0, "0");
  }, []);

  const pageChangeHandle = (page: number, pageSize: number) => {
    let skip = page == 1 ? 0 : (page - 1) * pageSize;
    queryApplicationData(pageSize, skip, currentPage.language);
  };

  const languageChangeHandle = (language: string) => {
    setCurrentPage({ page: 1, language: language });
    queryApplicationData(DEFAULT_PAGE_SIZE, 0, language);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row w-full items-center md:justify-between sm:-mr-10 sm:justify-center">
        <div className="flex flex-col items-start md:w-[40rem] sm:w-[20rem] md:mr-14 min-w-[320px] sm:mr-[-14px]">
          <div className="flex md:text-5xl font-bold sm:text-2xl">
            Simple and fast application for subtitle service
          </div>
          <div className="flex md:text-base my-5 w-5/6 font-medium sm:text-xs">
            Reduce your risk and burden with multi-payment strategies and
            decentralized audit.
          </div>
          <div
            className="flex md:px-12 py-2 text-white font-semibold md:text-lg  text-center rounded-full items-center justify-center bg-gradient-to-r from-purple-400 to-blue-400 mt-2 sm:text-base sm:px-10 cursor-pointer hover:brightness-110"
            onClick={showApplicationModal}
          >
            Submit <FiArrowUpRight className="ml-3" />
          </div>
        </div>
        <div className="flex items-center justify-center w-1/3 min-w-[320px]">
          <img src={application_Illustration} />
        </div>
      </div>
      <div className="flex flex-wrap w-full items-center justify-around md:justify-between">
        {applications.map(
          (item, index) => item.applyId != "" && ApplyCard(item, index)
        )}
        {ApplicationItems.map((item, index) => ApplyCard(item, index))}
      </div>
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

export default ApplicationPage;
