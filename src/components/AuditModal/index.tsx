import React, { useState, useContext } from "react";
import { Spin } from "antd";
import { ApplicationContext } from "../../context/ApplicationContext";
import { GlobalContext } from "../../context/GlobalContext";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import PrimaryButton from "../PrimaryButton";
import { useParams } from "react-router-dom";

const AuditModal = () => {
  const { hideAuditModal, isLoading } = useContext(GlobalContext);
  const { auditItem } = useContext(ApplicationContext);
  const [auditResult, setAuditResult] = useState("");
  const param = useParams();

  const auditItemHandle = () => {
    const result = auditResult == "support" ? "0" : "1";
    const itemId = param.id;
    if(itemId && itemId != undefined) {
      auditItem({itemId: itemId, attitude: result});
    }
  }

  return (
    <Spin spinning={isLoading} size="large">
      <div className="flex flex-col w-full">
        <div className="flex flex-col p-2 bg-gray-200 rounded-xl text-center">
          <div className="text-xl font-semibold">Audit Item</div>
          <div>Increase Your Revenue by Engaging Honestly</div>
        </div>
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
            fn={auditItemHandle}
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
