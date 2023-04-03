import { Select, Spin, Table } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { ApplyCard, NoItems } from "../components";
import { GlobalContext } from "../context/GlobalContext";
import { DataContext } from "../context/DataContext";
import { DEFAULT_PAGE_SIZE } from "../utils/constants";
import { columns, data } from "../utils/table/columns";
const { Option } = Select;
const ApplicationPage = (): React.ReactElement => {
  const {
    applications,
    queryApplicationData,
    dashboard,
    regiserLanguages,
    isGetDataLoading,
  } = useContext(DataContext);

  return (
    <div className="flex flex-col items-center px-5">
      <Table
        columns={columns["Tasks"]}
        dataSource={data}
        pagination={false}
        scroll={{
          x: 1200,
          y: document.body.clientHeight - 240,
        }}
        style={{
          width: document.body.clientWidth - 40,
          height: document.body.clientHeight - 179,
        }}
      />
    </div>
  );
};

export default ApplicationPage;
