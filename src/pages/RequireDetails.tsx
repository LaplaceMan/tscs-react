import React, { useContext, useEffect, useState } from "react";
import { Table } from "antd";
import { PropsContainer, PrimaryButton, PropItem } from "../components";
import { BsListUl } from "react-icons/bs";
import { columns } from "../utils/table/columns";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import { ListItem, ListRequire, ListTask } from "../types/baseTypes";
import { getNetwork } from "@wagmi/core";

const RequireDetails = () => {
  const { querySpecialRequire, isGetDataLoading } = useContext(DataContext);
  const [requireDetail, setRequireDetail] = useState<ListRequire | null>();
  const [entities, setEntities] = useState<(ListItem | ListTask)[] | null>([]);
  const param = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { chain } = getNetwork();

  useEffect(() => {
    const feachData = async (filter: string, id: string) => {
      const data = await querySpecialRequire(filter, id);
      if (data && data.details != undefined) {
        setRequireDetail(data.details);
        if (data.entities && data.entities != undefined) {
          setEntities(data.entities);
        }
      }
    };
    const filter = searchParams.get("filter");
    filter && param.id != undefined && feachData(filter, param.id);
  }, [chain?.id]);

  return (
    <div className="flex items-center justify-center">
      <div className="flex md:w-[1200px] flex-col">
        <div className="text-center title mb-10 text-white font-bold text-5xl">
          Require: #{param.id}
        </div>
        <div className="flex w-full md:flex-row flex-col justify-between">
          <div className="flex flex-col space-y-3">
            <PropsContainer
              icon={<BsListUl />}
              title={<div className="font-semibold">Require Details</div>}
              content={
                <div className="grid grid-cols-2 gap-2">
                  {[
                    {
                      label: "Require ID",
                      value: param.id,
                      type: "id",
                    },
                    {
                      label: "Require Name",
                      value: requireDetail?.name,
                      type: "",
                    },
                    {
                      label: "Registrant",
                      value: requireDetail?.registrant,
                      type: "address",
                    },
                    {
                      label: "Time",
                      value: requireDetail?.time,
                      type: "time",
                    },
                    {
                      label: "Task Count",
                      value: requireDetail?.taskCount,
                      type: "",
                    },
                    {
                      label: "Item Count",
                      value: requireDetail?.itemCount,
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
                columns={columns[searchParams.get("filter")!]}
                dataSource={entities!}
                pagination={false}
                loading={isGetDataLoading}
                scroll={{ x: 1100, y: 522 }}
                style={{
                  width: document.body.clientWidth - 40,
                  maxHeight: "522px",
                }}
                onRow={(record) => {
                  return {
                    onClick: () =>
                      navigate(
                        `/${searchParams.get("filter")?.slice(0, 4)}/${
                          record.id
                        }`
                      ),
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

export default RequireDetails;
