import React, { useContext, useEffect, useState } from "react";
import { Table } from "antd";
import { PropsContainer, PrimaryButton, PropItem } from "../components";
import { BsListUl } from "react-icons/bs";
import { columns, data } from "../utils/table/columns";
import { Link, useParams } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import { GlobalContext } from "../context/GlobalContext";
import { Item } from "../types/baseTypes";

const ItemDetails = () => {
  const param = useParams();
  const { showAuditModal } = useContext(GlobalContext);
  const { querySpecialItem } = useContext(DataContext);
  const [itemDetail, setItemDetail] = useState<Item | null>();

  useEffect(() => {
    const feachData = async (id: string) => {
      const data = await querySpecialItem(id);
      if (data && data != undefined) {
        setItemDetail(data);
      }
    };
    param.id != undefined && feachData(param.id);
  }, []);

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
                    { label: "Item ID", value: param.id, type: "id" },
                    { label: "Task ID", value: itemDetail?.taskId, type: "id" },
                    {
                      label: "Maker",
                      value: itemDetail?.maker,
                      type: "address",
                    },
                    { label: "Support", value: itemDetail?.support, type: "" },
                    {
                      label: "Opponent",
                      value: itemDetail?.opponent,
                      type: "",
                    },
                    {
                      label: "Source",
                      value: itemDetail?.source,
                      type: "",
                    },
                    {
                      label: "Fingerprint",
                      value: itemDetail?.fingerprint,
                      type: "",
                    },
                    { label: "Time", value: itemDetail?.time, type: "time" },
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
              title={<div className="font-semibold">Task Details</div>}
              content={
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Require", value: itemDetail?.require, type: "" },
                    {
                      label: "Source",
                      value: itemDetail?.taskSource,
                      type: "",
                    },
                    {
                      label: "Audit Module",
                      value: itemDetail?.audit,
                      type: "address",
                    },
                    {
                      label: "Detection Module",
                      value: itemDetail?.detection,
                      type: "address",
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
                      label: "Latest Version",
                      value: itemDetail?.versions,
                      type: "",
                    },
                    { label: "state", value: itemDetail?.state, type: "" },
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
              <Link to="/Submit">
                <PrimaryButton
                  label="Submit"
                  bgColor="#edebdc"
                  textColor="#000"
                  fn={() => []}
                />
              </Link>
              <PrimaryButton
                label="Audit"
                bgColor="#00BEA1"
                textColor="#fff"
                fn={() => showAuditModal()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
