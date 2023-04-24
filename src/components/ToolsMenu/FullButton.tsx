import React from "react";

const FullButton = ({ label, fn }: { label: string; fn: () => void }) => {
  return (
    <div
      className="flex items-center justify-center rounded-full text-[#0f0a19] font-semibold text-lg w-full py-1.5 cursor-pointer bg-gradient-to-r from-[#edebdc] to-[#00BEA1] hover:brightness-110"
      onClick={fn}
    >
      {label}
    </div>
  );
};

export default FullButton;
