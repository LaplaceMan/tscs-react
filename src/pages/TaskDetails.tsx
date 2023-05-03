import React, { useEffect, useContext, useState } from "react";
import { Table } from "antd";
import { PropsContainer, PrimaryButton, PropItem } from "../components";
import { BsListUl } from "react-icons/bs";
import { columns, data } from "../utils/table/columns";
import { Link, useParams } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import { Task } from "../types/baseTypes";

const TaskDetails = () => {
  const param = useParams();
  const { querySpecialTask } = useContext(DataContext);
  const [taskDetail, setTaskDetail] = useState<Task | null>();
  useEffect(() => {
    const feachData = async (id: string) => {
      const data = await querySpecialTask(id);
      if (data && data != undefined) {
        setTaskDetail(data);
      }
    };
    param.id != undefined && feachData(param.id);
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div className="flex md:w-[1200px] flex-col">
        <div className="text-center title mb-10 text-white font-bold text-5xl">
          TASK: #{param.id}
        </div>
        <div className="flex w-full md:flex-row flex-col justify-between">
          <div className="flex flex-col space-y-3">
            <PropsContainer
              icon={<BsListUl />}
              title={<div className="font-semibold">Details</div>}
              content={
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Task ID", value: param.id, type: "id" },
                    {
                      label: "Applicant",
                      value: taskDetail?.applicant,
                      type: "address",
                    },
                    {
                      label: "Platform",
                      value: taskDetail?.platform,
                      type: "",
                    },
                    {
                      label: "Box ID",
                      value: taskDetail?.boxId,
                      type: "id",
                    },
                    {
                      label: "Require",
                      value: taskDetail?.require,
                      type: "",
                    },
                    {
                      label: "Payment",
                      value: taskDetail?.payment,
                      type: "",
                    },
                    {
                      label: "Currency",
                      value: taskDetail?.currency,
                      type: "",
                    },
                    {
                      label: "Amount",
                      value: taskDetail?.amount,
                      type: "amount" + '-' + taskDetail?.payment,
                    },
                    {
                      label: "Start",
                      value: taskDetail?.start,
                      type: "time",
                    },
                    {
                      label: "Deadline",
                      value: taskDetail?.deadline,
                      type: "time",
                    },
                    {
                      label: "Source",
                      value: taskDetail?.source,
                      type: "",
                    },
                    {
                      label: "Audit Module",
                      value: taskDetail?.audit,
                      type: "address",
                    },
                    {
                      label: "Detection Module",
                      value: taskDetail?.detection,
                      type: "address",
                    },
                    {
                      label: "State",
                      value: taskDetail?.state,
                      type: "",
                    },
                  ].map((item, index) => (
                    <PropItem
                      label={item.label}
                      value={item.value}
                      type={item.type}
                      key={index}
                    />
                  ))}
                </div>
              }
            />
            <PropsContainer
              icon={<BsListUl />}
              title={<div className="font-semibold">Result</div>}
              content={
                <div className="grid grid-cols-2 gap-2">
                  {[
                    {
                      label: "Item Count",
                      value: taskDetail && taskDetail.uploads,
                      type: "",
                    },
                    {
                      label: "Adopted Item",
                      value: taskDetail && taskDetail.adopted,
                      type: "",
                    },
                  ].map((item, index) => (
                    <PropItem
                      label={item.label}
                      value={item.value}
                      type={item.type}
                      key={index}
                    />
                  ))}
                </div>
              }
            />
          </div>
          <div className="flex flex-col items-center justify-between mt-5 md:mt-0">
            <div className="flex w-full md:w-[800px] border border-[#322d3a] rounded-xl p-1">
              <Table
                columns={columns["Tasks"]}
                dataSource={data}
                pagination={false}
                scroll={{ x: 1100 }}
                style={{
                  width: document.body.clientWidth - 40,
                }}
                onRow={(record) => {
                  return {
                    onClick: () => console.log(record),
                  };
                }}
              />
            </div>
            <div className="flex w-full justify-center md:justify-end space-x-5 mt-5 md:mt-0">
              <Link to="/Post">
                <PrimaryButton
                  label="Post"
                  bgColor="#edebdc"
                  textColor="#000"
                  fn={() => []}
                />
              </Link>
              <Link to="/Submit">
                <PrimaryButton
                  label="Submit"
                  bgColor="#00BEA1"
                  textColor="#fff"
                  fn={() => []}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
