import { NavbarItem } from "../../Types/baseTypes";
import { Link } from "react-router-dom";
import { ReactElement } from "react";
import HeaderLogItems from "./HeaderLog";
import { useState } from "react";
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import { BsCollection, BsGem } from "react-icons/bs";
const NavbarItems = [
  { title: "Application", link: "/Applications", icon: <BsCollection /> },
  { title: "Government", link: "/Government", icon: <BsGem /> },
];

const HeaderNavbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const HeaderNavbarItems = (
    item: NavbarItem,
    key: React.Key
  ): ReactElement => {
    return (
      <Link to={item.link} key={key}>
        <li
          className={`mx-4 cursor-pointer text-lg font-medium flex items-center justify-center ${
            toggleMenu ? "my-3 mx-1" : ""
          }`}
        >
          <div className={`${toggleMenu ? "mr-8" : "hidden"}`}>{item.icon}</div>
          {item.title}
        </li>
      </Link>
    );
  };
  return (
    <div className="flex flex-row">
      <ul className="md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {NavbarItems.map((item, index) => HeaderNavbarItems(item, index))}
        <HeaderLogItems />
      </ul>
      <div className="flex relative">
        {!toggleMenu && (
          <IoMenuOutline
            fontSize={35}
            className="text-black md:hidden cursor-pointer hover:text-white"
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-5 w-[35vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-start rounded-md white-deep-glassmorphism"
          >
            <li className="text-xl w-full mb-3 text-black">
              <IoCloseOutline onClick={() => setToggleMenu(false)} />
            </li>
            {NavbarItems.map((item, index) => HeaderNavbarItems(item, index))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HeaderNavbar;