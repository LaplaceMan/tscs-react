import React from "react";
import { NavbarItem } from "../../types/baseTypes";
import { Link } from "react-router-dom";
import { ReactElement } from "react";
import { useContext } from "react";
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import { BiUserCircle } from "react-icons/bi";
import { BsCollection, BsGem, BsFileText, BsPerson } from "react-icons/bs";
import { GlobalContext } from "../../context/GlobalContext";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useEnsAvatar } from "wagmi";
import { RANDOM_AVATAR_API } from "../../utils/constants";
const NavbarItems = [
  {
    title: "Application",
    link: "/Application",
    icon: <BsCollection fontSize="1rem" />,
  },
  { title: "Government", link: "/Government", icon: <BsGem fontSize="1rem" /> },
];

const HeaderNavbar = () => {
  const { toggleMenu, setToggleMenu } = useContext(GlobalContext);
  const { address, isConnected } = useAccount();
  const { data: ensAvatar } = useEnsAvatar({ address });
  const HeaderNavbarItems = (
    item: NavbarItem,
    key: React.Key
  ): ReactElement => {
    return (
      <Link to={item.link} key={key}>
        <li
          className={`mx-4 cursor-pointer text-lg font-medium flex items-center justify-center ${
            toggleMenu ? "my-3" : ""
          }`}
        >
          <div className={`${toggleMenu ? "mr-5" : "hidden"}`}>{item.icon}</div>
          {item.title}
        </li>
      </Link>
    );
  };

  const DocumentationItem = (): ReactElement => {
    return (
      <a
        href="https://murmes.gitbook.io/murmes-protocol/"
        target="_blank"
        rel="noreferrer noopener"
      >
        <li
          className={`mx-4 cursor-pointer text-lg font-medium flex items-center justify-center ${
            toggleMenu ? "my-3" : ""
          }`}
        >
          <div className={`${toggleMenu ? "mr-5" : "hidden"}`}>
            <BsFileText fontSize="1rem" />
          </div>
          Documentation
        </li>
      </a>
    );
  };

  const PersonalItem = (): ReactElement => {
    return (
      <Link to={`/Personal/${address}`}>
        <li className="mx-4 cursor-pointer text-lg font-medium flex items-center justify-center my-3">
          <div className="mr-5">
            <BsPerson fontSize="1rem" />
          </div>
          Personal
        </li>
      </Link>
    );
  };

  const AvatarItem = () => {
    return (
      <Link to={`/Personal/${address}`}>
        <li className="mx-4 cursor-pointer log">
          {isConnected ? (
            <img
              src={ensAvatar ? ensAvatar : RANDOM_AVATAR_API}
              className="flex rounded-full w-[2rem]"
              alt="ENS Avatar"
            />
          ) : (
            <BiUserCircle />
          )}
        </li>
      </Link>
    );
  };
  return (
    <div className="flex flex-row">
      <ul className="md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {NavbarItems.map((item, index) => HeaderNavbarItems(item, index))}
        <DocumentationItem />
        <ConnectButton accountStatus="address" />
        {isConnected && <AvatarItem />}
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
            <DocumentationItem />
            <PersonalItem />
          </ul>
        )}
      </div>
    </div>
  );
};

export default HeaderNavbar;
