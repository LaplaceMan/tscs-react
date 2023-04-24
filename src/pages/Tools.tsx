import React from "react";
import { ToolsMenu } from "../components";
const Tools = () => {
  return (
    <div
      className="w-full flex items-center justify-center my-5 md:m-0"
      style={{
        height: document.body.clientHeight - 180,
      }}
    >
      <ToolsMenu />
    </div>
  );
};

export default Tools;
