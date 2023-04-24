import React, { useState, useContext } from "react";
import { Spin } from "antd";
import { ApplicationContext } from "../../context/ApplicationContext";
import { useAccount } from "wagmi";
import { DataContext } from "../../context/DataContext";
import { GlobalContext } from "../../context/GlobalContext";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";

import { Audit } from "../../types/formTypes";
import PrimaryButton from "../PrimaryButton";

const AuditModal = () => {
  const { address, isConnected } = useAccount();
  const { hideAuditModal, isLoading } = useContext(GlobalContext);
  const [auditResult, setAuditResult] = useState("");

  return (
    <Spin spinning={isLoading} size="large">
      <div className="flex flex-col w-full">
        <div className="text-xl font-semibold">Audit Item</div>
        <div>Increase Your Reputation and Revenue by Engaging Honestly.</div>
        <div className="flex font-medium border-gray-200 text-lg my-6 cursor-pointer space-x-1">
          <div
            className={`flex items-center justify-center w-1/2 py-2 hover:bg-[#00BEA1] hover:text-white rounded-l-xl border space-x-3 ${
              auditResult === "support" && "border-[#00BEA1]"
            }`}
            onClick={() => setAuditResult("support")}
          >
            <AiOutlineLike />
            <div>Support</div>
          </div>
          <div
            className={`flex items-center justify-center w-1/2 py-2  hover:bg-[#FF6347] hover:text-white rounded-r-xl border space-x-3 ${
              auditResult === "oppose" && "border-[#FF6347]"
            }`}
            onClick={() => setAuditResult("oppose")}
          >
            <AiOutlineDislike />
            <div>Oppose</div>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-3">
          <PrimaryButton
            label="Submit"
            bgColor="#00BEA1"
            textColor="#fff"
            fn={() => []}
          />
          <PrimaryButton
            label="Cancel"
            bgColor="#1C1C1C"
            textColor="#fff"
            fn={hideAuditModal}
          />
        </div>
      </div>
    </Spin>
  );
};

export default AuditModal;