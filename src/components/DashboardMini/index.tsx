import React from "react";
import { BiTrendingDown, BiTrendingUp } from "react-icons/bi";
import { DashboardMiniItem } from "../../types/baseTypes";

const DashboardMini = (item: DashboardMiniItem, key: React.Key) => {
  return (
    <div
      className="flex flex-rows items-center rounded-md px-5 py-3 min-w-[257px] my-3 sm:mx-3 md:mx-0"
      key={key}
      style={{ background: item.bg }}
    >
      <div className="flex flex-col items-start justify-center">
        <div className="text-[#696969] text-sm font-medium">{item.label}</div>
        <div className="text-2xl font-bold my-1">{item.number}</div>
        <div className="flex flex-row items-center justify-center text-sm">
          {item.change > 0 ? (
            <BiTrendingUp color="green" className="mr-2" />
          ) : (
            <BiTrendingDown color="red" className="mr-2" />
          )}
          {item.change > 0
            ? `Increase by ${item.change} today`
            : `Reduced by ${item.change} today`}
        </div>
      </div>
      <div
        className="flex rounded-md items-center justify-center w-10 h-10 ml-5 shadow-sm"
        style={{ background: item.iconBg }}
      >
        {item.icon}
      </div>
    </div>
  );
};

export default DashboardMini;
