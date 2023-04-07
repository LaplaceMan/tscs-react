import React from "react";
import { dots } from "../../assets";

const DotsContainer = ({
  title,
  content,
}: {
  title: React.ReactElement;
  content: React.ReactElement;
}): React.ReactElement => {
  return (
    <div className="flex flex-col w-full items-center justify-center border-2 border-[#1b1524] overflow-hidden rounded-3xl">
      <div className="flex w-full border-b-4 border-[#1b1524]">
        <div
          className="flex w-full items-center justify-center"
          style={{
            backgroundImage: `url(${dots})`,
          }}
        >
          <div className="bg-[#0f0a19] h-full px-5 py-3 items-center flex">
            {title}
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-center">{content}</div>
    </div>
  );
};

export default DotsContainer;
