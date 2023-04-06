import React from "react";
const PrimaryButton = ({
  label,
  bgColor,
  textColor,
  fn,
}: {
  label: string;
  bgColor: string;
  textColor: string;
  fn: () => void;
}): React.ReactElement => {
  return (
    <div
      className="text-center py-1.5 rounded-full font-medium text-lg cursor-pointer hover:brightness-110"
      style={{ background: bgColor, color: textColor, width: "130px" }}
      onClick={fn}
    >
      {label}
    </div>
  );
};

export default PrimaryButton;
