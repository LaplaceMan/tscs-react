import { BsAwardFill } from "react-icons/bs";

const IDCard = (): React.ReactElement => {
  return (
    <div className="flex p-3 justify-end items-start flex-col rounded-md eth-card white-glassmorpism w-full">
      <div className="flex justify-between flex-col">
        <div className="flex justify-center items-center mr-32">
          <BsAwardFill fontSize={22} color="#fff" />
        </div>
        <div className="text-white font-semibold text-sm mt-12">TSCS</div>
      </div>
    </div>
  );
};

export default IDCard;
