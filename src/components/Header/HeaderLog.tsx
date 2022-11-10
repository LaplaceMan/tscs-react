import { BiUserCircle } from "react-icons/bi";
import { UserLogIn, UserLogOut } from "../";
import { Popover } from "antd";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { WalletContext } from "../../context/WalletContext";
import { ApplicationContext } from "../../context/ApplicationContext";
const UserLogInfo = (): React.ReactElement => {
  const { accountState, killSessionWalletConnect } = useContext(WalletContext);
  const { userDID } = useContext(ApplicationContext);

  const address: string = accountState.address;
  return (
    <Popover
      placement="bottomRight"
      content={
        address != ""
          ? UserLogIn(accountState, userDID, killSessionWalletConnect)
          : UserLogOut
      }
    >
      <Link to="/Personal">
        <li className="mx-4 cursor-pointer log">
          {accountState.address ? (
            <img
              src="http://api.btstu.cn/sjtx/api.php?lx=c1&format=images"
              className="flex rounded-full w-[2rem]"
            />
          ) : (
            <BiUserCircle />
          )}
        </li>
      </Link>
    </Popover>
  );
};

const HeaderLogItems = (): React.ReactElement => {
  return (
    <div className="flex items-center justify-center">
      <UserLogInfo />
    </div>
  );
};

export default HeaderLogItems;
