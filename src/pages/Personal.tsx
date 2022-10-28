import React from "react";
import { Tabs, Empty } from "antd";
import { SiEthereum } from "react-icons/si";
import { MdShare } from "react-icons/md";
const NoItems = () => {
  return (
    <div className="flex flex-col mx-auto my-10">
      <Empty description={false} />
      <div className="flex flex-col max-w-[360px] mx-auto text-center">
        <span className="font-bold text-[26px]">No items to display</span>
        <span className="text-[#696969] text-[18px] mt-1">
          Please refresh the page to try again or submit a new transaction.
        </span>
      </div>
    </div>
  );
};
const Personal = (): React.ReactElement => {
  return (
    <div className="flex flex-col w-full">
      <div
        className="w-screen h-[250px] md:h-[270px] bg-center bg-cover -mx-[60px]"
        style={{
          backgroundImage: `url("https://i.seadn.io/gae/P3RpreFAUcZIt1FeVB-y2o95x3zw7DWBU9dXsihVsgdfElfZcl0_8g601ydvtTaOIIN6Pae0VXmZTuN_xictxe6_DsCmR0pO_dSFZg?auto=format&w=1920")`,
        }}
      >
        <div className="mt-36 flex justify-start mx-[60px] align-bottom">
          <img
            className="shrink-0 w-32 h-32 md:w-40 md:h-40 rounded-xl"
            src={
              "https://lh3.googleusercontent.com/bY6b8qK5NeNeFhxk_BcCBtTOtu0LAzVv2GxSYty9_OlfGh1AcDz9GIJ6m08Szz7jwmdcpsD4aKFM1i07fCp-G5aZscOM0BWKN0dseis=w600"
            }
          />
        </div>
      </div>
      <div className="flex mt-9 mb-3 md:mt-12 justify-between w-full">
        <div className="flex flex-col items-start">
          <div className="text-3xl font-bold">Lulu</div>
          <div className="flex text-base font-medium text-[#696969] items-center">
            <SiEthereum className="mr-1 mt-0.5" />
            0x3f20...9374
          </div>
        </div>
        <div className="flex flex-row">
          <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full hover:bg-black hover:text-white cursor-pointer">
            <MdShare fontSize="25px" />
          </div>
        </div>
      </div>
      <Tabs
        defaultActiveKey="1"
        tabBarGutter={50}
        size="large"
        items={[
          {
            label: <div className="font-semibold text-lg ">Applications</div>,
            key: "1",
            children: <NoItems />,
          },
          {
            label: <div className="font-semibold text-lg">Subtitles</div>,
            key: "2",
            children: `Content of Tab Pane 2`,
          },
          {
            label: <div className="font-semibold text-lg">Assets</div>,
            key: "3",
            children: `Content of Tab Pane 3`,
          },
        ]}
      />
    </div>
  );
};
export default Personal;
