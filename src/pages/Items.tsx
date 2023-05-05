import { Select, Table, Input } from "antd";
import { BsPlus } from "react-icons/bs";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { columns, data } from "../utils/table/columns";
import { DataContext } from "../context/DataContext";
import { getNetwork } from "@wagmi/core";
import { ListItem } from "../types/baseTypes";

const Items = (): React.ReactElement => {
  const { queryItems, isGetDataLoading } = useContext(DataContext);
  const [items, setListItems] = useState<ListItem[] | null>([]);
  const navigate = useNavigate();
  const { chain } = getNetwork();
  useEffect(() => {
    const fetchData = async () => {
      const data = await queryItems(10, 0, "0");
      if (data && data != undefined) {
        setListItems(data);
      }
    };
    fetchData();
  }, [chain?.id]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full border-y border-[#322d3a] items-center justify-center h-[80px] space-x-10">
        <div
          className="flex item-center border border-[#322d3a] rounded-3xl items-center justify-between"
          style={{ height: "40px", width: "450px" }}
        >
          <div className="flex items-center ml-1 search">
            <Select
              defaultValue="itemId"
              options={[
                { value: "itemId", label: "Item ID" },
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
          <Input className="search" placeholder="Search the Item" />
          <div className="flex rounded-3xl bg-[#00BEA1] h-full items-center justify-center px-5 text-white font-medium cursor-pointer">
            Search
          </div>
        </div>
        <Link to="/Submit">
          <div className="flex w-[40px] h-[40px] rounded-full bg-[#edebdc] hover:bg-[#00BEA1] hover:text-white cursor-pointer items-center justify-center text-[#322d3a]">
            <BsPlus fontSize={35} />
          </div>
        </Link>
      </div>
      <div className="flex px-5">
        <Table
          columns={columns["Items"]}
          dataSource={items!}
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
              onClick: () => navigate(`/Item/${record.id}`),
            };
          }}
        />
      </div>
    </div>
  );
};

export default Items;
