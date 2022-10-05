import { BiUserCircle } from "react-icons/bi";
import { UserLogIn, UserLogOut } from "../";
import { Popover } from "antd";
import { useContext } from "react";
import { WalletContext } from "../../context/WalletContext";
const UserLogInfo = (): React.ReactElement => {
  const { accountState, killSessionWalletConnect } = useContext(WalletContext);
  const address: string = accountState.address;
  return (
    <Popover
      placement="bottomRight"
      content={
        address != ""
          ? UserLogIn(accountState, killSessionWalletConnect)
          : UserLogOut
      }
    >
      <li className="mx-4 cursor-pointer log">
        <BiUserCircle />
      </li>
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
