import React from "react";
import { BiTrendingDown, BiTrendingUp } from "react-icons/bi";
import { DashboardMiniItem } from "../../types/baseTypes";

const DashboardMini = ({
  item,
  key,
}: {
  item: DashboardMiniItem;
  key: React.Key;
}) => {
  return (
    <div
      className="flex flex-rows items-center justify-between rounded-3xl px-5 py-3 md:w-[250px] md:h-[100px] w-[200px] h-[85px] bg-[#1b1524] m-2"
      key={key}
    >
      <div className="flex flex-col items-start justify-center text-slate-300">
        <div className="md:text-base text-sm font-medium">{item.label}</div>
        <div className="md:text-3xl text-2xl font-bold my-1">{item.number}</div>
      </div>
      <div
        className="flex rounded-xl items-center justify-center w-[50px] h-[50px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, #00BEA1 0%, rgba(255, 255, 255, 0.1) 70%)",
        }}
      >
        {item.icon}
      </div>
    </div>
  );
};

export default DashboardMini;
