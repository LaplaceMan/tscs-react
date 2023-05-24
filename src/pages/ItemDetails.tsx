import React, { useContext, useEffect, useState } from "react";
import { Table, Modal } from "antd";
import {
  PropsContainer,
  PrimaryButton,
  PropItem,
  AuditModal,
} from "../components";
import { BsListUl } from "react-icons/bs";
import { columns, data } from "../utils/table/columns";
import { Link, useParams } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import { GlobalContext } from "../context/GlobalContext";
import { Item, ListAudit } from "../types/baseTypes";
import { getNetwork } from "@wagmi/core";

const ItemDetails = () => {
  const { showAuditModal, isAuditModalOpen } = useContext(GlobalContext);
  const { querySpecialItem, isGetDataLoading } = useContext(DataContext);
  const [itemDetail, setItemDetail] = useState<Item | null>();
  const [itemAudits, setItemAudits] = useState<ListAudit[] | null>([]);
  const param = useParams();
  const { chain } = getNetwork();

  useEffect(() => {
    const feachData = async (id: string) => {
      const data = await querySpecialItem(id);
      if (data && data.item != undefined) {
        setItemDetail(data.item);
      }
      if (data && data.audits != undefined) {
        setItemAudits(data.audits);
      }
    };
    param.id != undefined && feachData(param.id);
  }, [chain?.id]);

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
                      type: "module",
                    },
                    {
                      label: "Detection Module",
                      value: itemDetail?.detection,
                      type: "module",
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
                columns={columns["Audits"]}
                dataSource={itemAudits!}
                pagination={false}
                loading={isGetDataLoading}
                scroll={{ x: 1100, y: 522 }}
                style={{
                  width: document.body.clientWidth - 40,
                  maxHeight: "522px",
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
      <Modal
        getContainer={false}
        open={isAuditModalOpen}
        destroyOnClose={true}
        forceRender
        footer={null}
        closable={false}
        centered
      >
        <AuditModal />
      </Modal>
    </div>
  );
};

export default ItemDetails;
