import React from "react";
import HeaderNavbar from "./HeaderNavbar";
import { logo } from "../../assets/index";
import { Link } from "react-router-dom";
const HeaderTop = (): React.ReactElement => {
  return (
    <div className="flex w-full items-center justify-between px-[20px] md:px-[60px]">
      <div className="flex items-center justify-center cursor-pointer w-40">
        <Link to="/">
          <img src={logo} alt="logo" className="" />
        </Link>
      </div>
      <div className="flex flex-row items-center justify-center">
        <HeaderNavbar />
      </div>
    </div>
  );
};

export default HeaderTop;
