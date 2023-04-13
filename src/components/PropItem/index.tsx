import React from "react";

const PropItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex flex-col bg-[#322d3a] rounded-xl min-w-[150px] p-1.5">
      <div className="text-[#00BEA1] font-semibold">{label}</div>
      <div className="text-white">{value}</div>
    </div>
  );
};

export default PropItem;
