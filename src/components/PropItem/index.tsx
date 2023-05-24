import React from "react";
import { Tooltip } from "antd";
import {
  shortenAddress,
  timestampToDate,
  shortenText,
  bignumberConvert,
} from "../../utils/tools";

const dataFormat = (value: string, type: string) => {
  switch (type) {
    case "id":
      return `#${value}`;
    case "address":
      return shortenAddress(value);
    case "time":
      return timestampToDate(parseInt(value));
    case "amount-D1":
      return bignumberConvert(value, "10000", 2) + "%";
    case "module":
      return value.slice(42);
    default:
      return shortenText(value, 6);
  }
};

const tipFormat = (value: string | undefined | null, type: string) => {
  if (!value || value === undefined) {
    return "";
  }
  switch (type) {
    case "module":
      return value.slice(0, 42);
    default:
      return shortenText(value, 6);
  }
};

const PropItem = ({
  label,
  value,
  type,
}: {
  label: string;
  value: string | null | undefined;
  type: string;
}) => {
  return (
    <Tooltip title={tipFormat(value, type)}>
      <div className="flex flex-col bg-[#322d3a] rounded-xl min-w-[150px] p-1.5">
        <div className="text-[#00BEA1] font-semibold">{label}</div>
        <div className="text-white">
          {value && value != undefined && dataFormat(value, type)}
          {(!value || value == undefined) && "*"}
        </div>
      </div>
    </Tooltip>
  );
};

export default PropItem;
