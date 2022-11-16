import { OwnToken } from "../../types/baseTypes";
import { shortenAddress } from "../../utils/tools";
import { ApplicationContext } from "../../context/ApplicationContext";
import { GlobalContext } from "../../context/GlobalContext";
import { WalletContext } from "../../context/WalletContext";
import { useContext } from "react";
const tokenCardItem = (label: string, info: string) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-sm text-[#696969]">{label}</div>
      <div className="text-base font-semibold text-black">{info}</div>
    </div>
  );
};

const TokenCard = (token: OwnToken) => {
  const { updateDefaultTokenTransaction } = useContext(ApplicationContext);
  const { showTokenTransactionModal } = useContext(GlobalContext);
  const { accountState } = useContext(WalletContext);

  const tokenTransactionHandle = (
    name: string,
    symbol: string,
    decimals: number,
    type: string,
    address: string,
    tokenId: string,
    operation: string
  ) => {
    updateDefaultTokenTransaction({
      name: name,
      symbol: symbol,
      decimals: decimals,
      type: type,
      address: address,
      tokenId: tokenId,
      from: accountState.address,
      amount: "",
      operation: operation,
    });
    showTokenTransactionModal();
  };

  return (
    <div className="flex flex-col p-3 items-center justify-center rounded-md shadow-md w-[300px] h-[180px] bg-gray-50 mt-5 mx-5">
      <div className="absolute bottom-[50px] blur-[50px] w-[100px] h-[50px] bg-gradient-to-r from-purple-400 to-blue-400 rounded-full " />
      <div className="flex flex-row items-center justify-center">
        <img
          src="http://api.btstu.cn/sjtx/api.php?lx=c1&format=images"
          className="flex rounded-full w-[50px] shadow"
        />
        <div className="flex flex-col items-start ml-3">
          <div className="text-lg font-medium text-black">{token.name}</div>
          <div className="flex test-sm bg-gray-100 px-2 rounded-md text-[#696969]">
            {token.address ? shortenAddress(token.address) : "0x0000...0000"}
          </div>
        </div>
      </div>
      <div className="flex w-full flex-row justify-between items-center my-3">
        {tokenCardItem("Balance", token.balance)}
        <div className="w-[2px] rounded-lg bg-gray-100 h-[30px]" />
        {tokenCardItem("Type", token.type)}
        <div className="w-[2px] rounded-lg bg-gray-100 h-[30px]" />
        {tokenCardItem("Issuer", token.issuser)}
      </div>
      <div className="flex w-full justify-between text-white font-semibold text-base">
        <div
          className="flex w-1/2 py-1.5 rounded-lg bg-gradient-to-r cursor-pointer from-purple-400 to-purple-200 hover:brightness-110 mr-1 items-center justify-center"
          onClick={() =>
            tokenTransactionHandle(
              token.name,
              token.symbol,
              token.decimals,
              token.type,
              token.address,
              token.tokenId,
              "TRANSFER"
            )
          }
        >
          Transfer
        </div>
        <div
          className="flex w-1/2 py-1.5 rounded-lg ml-1 items-center justify-center bg-gradient-to-r cursor-pointer from-blue-200 to-blue-400 hover:brightness-110"
          onClick={() =>
            tokenTransactionHandle(
              token.name,
              token.symbol,
              token.decimals,
              token.type,
              token.address,
              token.tokenId,
              "APPROVE"
            )
          }
        >
          Approve
        </div>
      </div>
    </div>
  );
};

export default TokenCard;
