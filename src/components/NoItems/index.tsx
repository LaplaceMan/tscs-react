import React from "react";
import { Empty } from "antd";

const NoItems = () => {
  return (
    <div className="flex flex-col mx-auto my-10">
      <Empty description={false} />
      <div className="flex flex-col max-w-[360px] mx-auto text-center">
        <span className="font-bold text-2xl">No Items to Display</span>
        <span className="text-[#696969] text-base mt-1">
          Please refresh the page to try again or execute the first transaction.
        </span>
      </div>
    </div>
  );
};

export default NoItems;
