import { Select, Table, Input } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { GlobalContext } from "../context/GlobalContext";
import { DataContext } from "../context/DataContext";
import { columns, data } from "../utils/table/columns";

const ApplicationPage = (): React.ReactElement => {
  const {
    applications,
    queryApplicationData,
    dashboard,
    regiserLanguages,
    isGetDataLoading,
  } = useContext(DataContext);

  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full border-y border-[#322d3a] items-center justify-center h-[80px] space-x-5">
        <div
          className="flex item-center border border-[#322d3a] rounded-3xl items-center justify-between px-1"
          style={{ height: "40px", width: "380px" }}
        >
          <div className="flex items-center">
            <Select
              defaultValue="Task ID"
              options={[
                { value: "taskId", label: "Task ID" },
                { value: "requireId", label: "Require ID" },
              ]}
            />
            <div
              style={{
                width: "2px",
                height: "20px",
                backgroundColor: "#322d3a",
                borderRadius: "10px",
              }}
            />
          </div>
          <Input className="search" placeholder="Search the Task" />
          <div className="flex mx-2">
            <BiSearchAlt color="#bfbfbf" fontSize="25px" />
          </div>
        </div>
      </div>
      <div className="flex px-5">
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
    </div>
  );
};

export default ApplicationPage;
