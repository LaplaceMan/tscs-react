import HeaderNavbar from "./HeaderNavbar";
import { logo } from "../../assets/index";

const HeaderTop = (): React.ReactElement => {
  return (
    <div className="flex w-full items-center justify-between px-10">
      <div className="flex-initial md:flex-[0.5] items-center justify-center">
        <img src={logo} alt="logo" className="w-32 cursor-pointer" />
      </div>
      <div className="flex flex-row items-center justify-center">
        <HeaderNavbar />
      </div>
    </div>
  );
};

export default HeaderTop;
