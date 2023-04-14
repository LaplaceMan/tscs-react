import React, { useEffect, useState } from "react";
import { GlobalContent } from "../types/baseTypes";
import { watchNetwork } from "@wagmi/core";
export const GlobalContext = React.createContext<GlobalContent>(
  {} as GlobalContent
);

export const GlobalProvider = ({ children }: any) => {
  const [chainId, setChainId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [isAuditModalOpen, setAuditIsModalOpen] = useState(false);
  const [isTokenTransactionModalOpen, setIsTokenTransactionModalOpen] =
    useState(false);
  const [isUpdateApplicationModalOpen, setIsUpdateApplicationModalOpen] =
    useState(false);
  const [isWithdrawRewardModalOpen, setIsWithdrawRewardModalOpen] =
    useState(false);
  const [isDespoitAssetModalOpen, setIsDespoitAssetModalOpen] = useState(false);

  const [toggleMenu, setToggleMenu] = useState(false);

  const unwatch = watchNetwork((network) => {
    network.chain && setChainId(network.chain.id);
  });

  useEffect(() => {
    unwatch;
  }, [unwatch]);

  const showDespoitAssetModal = () => {
    setIsDespoitAssetModalOpen(true);
  };

  const hideDespoitAssetModal = () => {
    setIsDespoitAssetModalOpen(false);
  };

  const showWithdrawRewardModal = () => {
    setIsWithdrawRewardModalOpen(true);
  };

  const hideWithdrawRewardModal = () => {
    setIsWithdrawRewardModalOpen(false);
  };

  const showUpdateApplicationModal = () => {
    setIsUpdateApplicationModalOpen(true);
  };

  const hideUpdateApplicationModal = () => {
    setIsUpdateApplicationModalOpen(false);
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
        showUpdateApplicationModal,
        hideUpdateApplicationModal,
        isUpdateApplicationModalOpen,
        showWithdrawRewardModal,
        hideWithdrawRewardModal,
        isWithdrawRewardModalOpen,
        showDespoitAssetModal,
        hideDespoitAssetModal,
        isDespoitAssetModalOpen,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
