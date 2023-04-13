import React from "react";

const PropsContainer = ({
  icon,
  title,
  content,
}: {
  icon: React.ReactElement;
  title: React.ReactElement;
  content: React.ReactElement;
}) => {
  return (
    <div className="flex flex-col rounded-xl border border-[#322d3a]">
      <div className="flex items-center bg-[#322d3a] text-white space-x-2 p-2 rounded-t-xl">
        {icon}
        {title}
      </div>
      <div className="px-2 py-5">{content}</div>
    </div>
  );
};

export default PropsContainer;
