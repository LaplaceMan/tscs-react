import React, { useEffect, useState } from "react";
import { WalletContent } from "../types/baseTypes";
const { ethereum } = window as any;

export const WalletContext = React.createContext<WalletContent>({
  accountState: {
    address: "",
    network: "",
    type: "",
  },
  connectWalletMetaMask: () => {},
  killSessionWalletConnect: () => {},
});
export const WalletProvider = ({ children }: any) => {
  const [accountState, setAccountState] = useState({
    address: "",
    network: "",
    type: "",
  });
  const connectWalletMetaMask = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const address = accounts[0];
      const networkId = ethereum.networkVersion;
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
          const networkId = ethereum.networkVersion;
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
      if (!ethereum) return alert("Please install metamask.");
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        const address = accounts[0];
        const networkId = ethereum.networkVersion;
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
  }, []);
  return (
    <WalletContext.Provider
      value={{ accountState, connectWalletMetaMask, killSessionWalletConnect }}
    >
      {children}
    </WalletContext.Provider>
  );
};
