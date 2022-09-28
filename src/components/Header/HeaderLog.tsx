import { BiUserCircle } from "react-icons/bi";
import { UserLogIn, UserLogOut } from "../";
import { Popover } from "antd";
const UserLogInfo = (): React.ReactElement => {
  return (
    <Popover placement="bottomRight" content={UserLogOut}>
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
