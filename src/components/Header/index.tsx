import HeaderNavbar from "./HeaderNavbar";
import { logo } from "../../assets/index";
import { Link } from "react-router-dom";
const HeaderTop = (): React.ReactElement => {
  return (
    <div className="flex w-full items-center justify-between px-10">
      <div className="flex-initial md:flex-[0.5] items-center justify-center">
        <Link to="/">
          <img src={logo} alt="logo" className="w-32 cursor-pointer" />
        </Link>
      </div>
      <div className="flex flex-row items-center justify-center">
        <HeaderNavbar />
      </div>
    </div>
  );
};

export default HeaderTop;
