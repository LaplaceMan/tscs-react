import React, { useEffect, useState } from "react";
import { WalletContent } from "../types/baseTypes";
import { ethers } from "ethers";
import { message } from "antd";
const { ethereum } = window as any;
const provider = new ethers.providers.Web3Provider(ethereum);

export const WalletContext = React.createContext<WalletContent>({} as any);
export const WalletProvider = ({ children }: any) => {
  const [accountState, setAccountState] = useState({
    address: "",
    network: "",
    type: "",
  });
  const [gasPrice, setGasPrice] = useState("");

  const updateGasPrice = async () => {
    const gasUnit = await provider.getGasPrice();
    const format = ethers.utils.formatUnits(gasUnit, "gwei");
    setGasPrice(Number(format).toFixed(2).toString());
  };

  const connectWalletMetaMask = async () => {
    try {
      if (!ethereum) return message.warning("Please install wallet.");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const address = accounts[0];
      const networkId = ethereum.chainId;
      setAccountState({
        address: address,
        network: networkId,
        type: "Metamask",
      });
    } catch (error) {
      console.log(error);
      throw new Error("No Ethereum Object.");
    }
  };

  const addWalletListener = () => {
    if (ethereum) {
      ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          const address = accounts[0];
          const networkId = ethereum.chainId;
          setAccountState({
            address: address,
            network: networkId,
            type: "Metamask",
          });
          // console.log(accountState);
        }
      });
    }
  };

  const killSessionWalletConnect = async () => {
    if (accountState.type == "Metamask") {
      try {
        await ethereum.request({
          method: "eth_requestAccounts",
          params: [{ eth_accounts: {} }],
        });
      } catch (error) {
        console.log(error);
      }
    }
    setAccountState(() => ({ address: "", network: "", type: "" }));
  };
  const checkIfWalletsIsConnected = async () => {
    try {
      if (!ethereum) return message.warning("Please install wallet.");
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        const address = accounts[0];
        const networkId = ethereum.chainId;
        setAccountState({
          address: address,
          network: networkId,
          type: "Metamask",
        });
        // console.log(accountState);
      } else {
        console.log("No account found.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    addWalletListener();
    checkIfWalletsIsConnected();
    const timer = setInterval(() => updateGasPrice(), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <WalletContext.Provider
      value={{
        accountState,
        connectWalletMetaMask,
        killSessionWalletConnect,
        gasPrice,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
