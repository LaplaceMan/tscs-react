import React from "react";
import { Table } from "antd";
import { PropsContainer, PrimaryButton, PropItem } from "../components";
import { BsListUl } from "react-icons/bs";
import { columns, data } from "../utils/table/columns";
import { useParams } from "react-router-dom";

const TaskDetails = () => {
  const param = useParams();

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
                    { label: "Task ID", value: `#${param.id}` },
                    { label: "Applicant", value: "0x..." },
                    { label: "Platform", value: "0x..." },
                    { label: "Box ID", value: "#10" },
                    { label: "Require", value: "..." },
                    { label: "Payment", value: "OT0" },
                    { label: "Currency", value: "USDT" },
                    { label: "Amount", value: "10.0" },
                    { label: "Start", value: "2023-4-10" },
                    { label: "Deadline", value: "2023-5-1" },
                    { label: "Source", value: "..." },
                    { label: "Audit Module", value: "0x..." },
                    { label: "Detection Module", value: "0x..." },
                    { label: "Status", value: "NORMAL" },
                  ].map((item, index) => (
                    <PropItem
                      label={item.label}
                      value={item.value}
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
                    { label: "Item Count", value: "10" },
                    { label: "Adopted Item", value: "#10" },
                  ].map((item, index) => (
                    <PropItem
                      label={item.label}
                      value={item.value}
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
              <PrimaryButton
                label="Post"
                bgColor="#edebdc"
                textColor="#000"
                fn={() => []}
              />
              <PrimaryButton
                label="Submit"
                bgColor="#00BEA1"
                textColor="#fff"
                fn={() => []}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;