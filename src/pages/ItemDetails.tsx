import React from "react";
import { Table } from "antd";
import { PropsContainer, PrimaryButton, PropItem } from "../components";
import { BsListUl } from "react-icons/bs";
import { columns, data } from "../utils/table/columns";
import { useParams } from "react-router-dom";

const ItemDetails = () => {
  const param = useParams();

  return (
    <div className="flex items-center justify-center">
      <div className="flex md:w-[1200px] flex-col">
        <div className="text-center title mb-10 text-white font-bold text-5xl">
          Item: #{param.id}
        </div>
        <div className="flex w-full md:flex-row flex-col justify-between">
          <div className="flex flex-col space-y-3">
            <PropsContainer
              icon={<BsListUl />}
              title={<div className="font-semibold">Item Details</div>}
              content={
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Item ID", value: `#${param.id}` },
                    { label: "Task ID", value: `#10` },
                    { label: "Maker", value: "0x..." },
                    { label: "Support", value: "10" },
                    { label: "Opponent", value: "10" },
                    { label: "Source", value: "..." },
                    { label: "Fingerprint", value: "..." },
                    { label: "Time", value: "2023-4-10" },
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
              title={<div className="font-semibold">Task Details</div>}
              content={
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Platform", value: "0x..." },
                    { label: "Require", value: "..." },
                    { label: "Deadline", value: "2023-5-1" },
                    { label: "Source", value: "..." },
                    { label: "Audit Module", value: "0x..." },
                    { label: "Detection Module", value: "0x..." },
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
                    { label: "Latest Version", value: "10" },
                    { label: "Status", value: "Unknown" },
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
                label="Submit"
                bgColor="#edebdc"
                textColor="#000"
                fn={() => []}
              />
              <PrimaryButton
                label="Audit"
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

export default ItemDetails;
