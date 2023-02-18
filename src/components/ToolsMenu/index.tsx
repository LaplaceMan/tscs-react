import React, { useState } from "react";
import ToolForLens from "./ToolForLens";
import ToolForMurmes from "./ToolForMurmes";
import ToolForPersonal from "./ToolForPersonal";

const ToolsMenu = () => {
  const [toolPage, setToolPage] = useState("Lens");

  const ToolsButton = ({ label }: { label: string }) => {
    return (
      <div
        className={`text-lg font-medium hover:text-[#32b1f1] cursor-pointer ${
          toolPage == label ? "text-[#32b1f1]" : ""
        }`}
        key={label}
        onClick={() => setToolPage(label)}
      >
        {label}
      </div>
    );
  };

  return (
    <div className="flex rounded-3xl p-5 flex-col shadow-xl border items-center justify-center w-[450px]">
      <div className="flex w-full flex-row">
        <div className="flex space-x-5 mb-1">
          {["Lens", "Murmes", "Personal"].map((item, index) => (
            <ToolsButton label={item} key={index} />
          ))}
        </div>
      </div>
      <div className="flex w-full items-center justify-center mt-3">
        {toolPage == "Lens" && <ToolForLens />}
        {toolPage == "Murmes" && <ToolForMurmes />}
        {toolPage == "Personal" && <ToolForPersonal />}
      </div>
    </div>
  );
};
export default ToolsMenu;
