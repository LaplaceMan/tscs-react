import React from "react";

const DotsContainer = ({
  title,
  content,
}: {
  title: string;
  content: React.ReactElement;
}): React.ReactElement => {
  return (
    <div className="flex flex-col w-full items-center justify-center">
      <div className="flex w-full text-2xl title h-[60px] p-1">
        <div className="flex w-full items-center justify-center">
          <div className="h-full px-5 items-center flex">{title}</div>
        </div>
      </div>
      <div className="flex w-full items-center justify-center mt-3">
        {content}
      </div>
    </div>
  );
};

export default DotsContainer;
