import { discord, github, telegram, twitter } from "../../assets";
const DefaultFooter = () => {
  return (
    <div className="flex flex-col w-full md:px-[60px] sm:px-[20px]">
      <div className="flex flex-row">
        {[discord, github, telegram, twitter].map((item, index) => (
          <img src={item} key={index} className="mr-3 w-6" />
        ))}
      </div>
      <div className="flex text-sm mt-3">
        Copyright © 2022 LaplasMan. All rights reserved.
      </div>
    </div>
  );
};

export default DefaultFooter;
