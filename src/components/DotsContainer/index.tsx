import React from "react";
import { dots } from "../../assets/index";

const DotsContainer = ({
  title,
  content,
}: {
  title: string;
  content: React.ReactElement;
}): React.ReactElement => {
  return (
    <div className="flex flex-col rounded-3xl w-full items-center justify-center border-4 border-[#1b1524] overflow-hidden">
      <div className="flex w-full  text-2xl title border-b-4 border-[#1b1524] h-[60px] p-1">
        <div
          className="flex w-full items-center justify-center"
          style={{
            backgroundImage: `url(${dots})`,
          }}
        >
          <div className="bg-[#0f0a19] h-full px-5 items-center flex">
            {title}
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-center">{content}</div>
    </div>
  );
};

export default DotsContainer;
