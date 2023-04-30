import React, { useEffect, useState } from "react";
import { GlobalContent } from "../types/baseTypes";
import { watchNetwork } from "@wagmi/core";
export const GlobalContext = React.createContext<GlobalContent>(
  {} as GlobalContent
);

export const GlobalProvider = ({ children }: any) => {
  const [chainId, setChainId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [isAuditModalOpen, setAuditIsModalOpen] = useState(false);
  const [isTokenTransactionModalOpen, setIsTokenTransactionModalOpen] =
    useState(false);
  const [isUpdateTaskModalOpen, setIsUpdateTaskModalOpen] = useState(false);
  const [isWithdrawRewardModalOpen, setIsWithdrawRewardModalOpen] =
    useState(false);
  const [isDepositAssetModalOpen, setIsDepositAssetModalOpen] = useState(false);
  const [isGuardManageModalOpen, setIsGuardManageModalOpen] = useState(false);

  const unwatch = watchNetwork((network) => {
    network.chain && setChainId(network.chain.id);
  });

  useEffect(() => {
    unwatch;
  }, [unwatch]);

  const showDepositAssetModal = () => {
    setIsDepositAssetModalOpen(true);
  };

  const hideDepositAssetModal = () => {
    setIsDepositAssetModalOpen(false);
  };

  const showWithdrawRewardModal = () => {
    setIsWithdrawRewardModalOpen(true);
  };

  const hideWithdrawRewardModal = () => {
    setIsWithdrawRewardModalOpen(false);
  };

  const showUpdateTaskModal = () => {
    setIsUpdateTaskModalOpen(true);
  };

  const hideUpdateTaskModal = () => {
    setIsUpdateTaskModalOpen(false);
  };

  const showTokenTransactionModal = () => {
    setIsTokenTransactionModalOpen(true);
  };

  const hideTokenTransactionModal = () => {
    setIsTokenTransactionModalOpen(false);
  };

  const showAuditModal = () => {
    setAuditIsModalOpen(true);
  };

  const hideAuditModal = () => {
    setAuditIsModalOpen(false);
  };

  const showGuardManageModal = () => {
    setIsGuardManageModalOpen(true);
  };

  const hideGuardManageModal = () => {
    setIsGuardManageModalOpen(false);
  };

  const setLoadingState = (state: boolean) => {
    setIsLoading(state);
  };

  return (
    <GlobalContext.Provider
      value={{
        chainId,
        toggleMenu,
        setToggleMenu,
        isLoading,
        isAuditModalOpen,
        showAuditModal,
        hideAuditModal,
        setLoadingState,
        isTokenTransactionModalOpen,
        showTokenTransactionModal,
        hideTokenTransactionModal,
        showUpdateTaskModal,
        hideUpdateTaskModal,
        isUpdateTaskModalOpen,
        showWithdrawRewardModal,
        hideWithdrawRewardModal,
        isWithdrawRewardModalOpen,
        showDepositAssetModal,
        hideDepositAssetModal,
        isDepositAssetModalOpen,
        showGuardManageModal,
        hideGuardManageModal,
        isGuardManageModalOpen,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
