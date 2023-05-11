import { Select, Table, Input } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { DataContext } from "../context/DataContext";
import { columns, data } from "../utils/table/columns";
import { Link, useNavigate } from "react-router-dom";
import { getNetwork } from "@wagmi/core";
import { ListTask } from "../types/baseTypes";

const TasksPage = (): React.ReactElement => {
  const { queryTasks, isGetDataLoading } = useContext(DataContext);
  const [tasks, setListTasks] = useState<ListTask[] | null>([]);
  const navigate = useNavigate();
  const { chain } = getNetwork();
  useEffect(() => {
    const fetchData = async () => {
      const data = await queryTasks(10, 0, "0");
      if (data && data != undefined) {
        setListTasks(data);
      }
    };
    fetchData();
  }, [chain?.id]);

  return (
    <div className="flex flex-col items-center styled">
      <div className="flex w-full border-y border-[#322d3a] items-center justify-center h-[80px] space-x-10">
        <div
          className="flex item-center border border-[#322d3a] rounded-3xl items-center justify-between"
          style={{ height: "40px", width: "450px" }}
        >
          <div className="flex items-center ml-1 search">
            <Select
              defaultValue="taskId"
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
          <Input
            className="search"
            placeholder="Search the Task"
            style={{ border: "none" }}
          />
          <div className="flex rounded-3xl bg-[#00BEA1] h-full items-center justify-center px-5 text-white font-medium cursor-pointer">
            Search
          </div>
        </div>
        <Link to="/Post">
          <div className="flex w-[40px] h-[40px] rounded-full bg-[#edebdc] hover:bg-[#00BEA1] hover:text-white cursor-pointer items-center justify-center text-[#322d3a]">
            <BsPlus fontSize={35} />
          </div>
        </Link>
      </div>
      <div className="flex px-5">
        <Table
          columns={columns["Tasks"]}
          dataSource={tasks!}
          pagination={false}
          loading={isGetDataLoading}
          scroll={{
            x: 1200,
            y: document.body.clientHeight - 320,
          }}
          style={{
            width: document.body.clientWidth - 40,
            height: document.body.clientHeight - 260,
          }}
          onRow={(record) => {
            return {
              onClick: () => navigate(`/Task/${record.id}`),
            };
          }}
        />
      </div>
    </div>
  );
};

export default TasksPage;
