import React, { useEffect, useState } from "react";
import { GlobalContent } from "../types/baseTypes";
import { getScrollTop } from "../utils/tools";
export const GlobalContext = React.createContext<GlobalContent>({
  isLoading: false,
  isUploadModalOpen: false,
  isApplicationModalOpen: false,
  isAuditModalOpen: false,
  isConnectWalletModalOpen: false,
  showUploadModal: () => {},
  hideUploadModal: () => {},
  showApplicationModal: () => {},
  hideApplicationModal: () => {},
  showAuditModal: () => {},
  hideAuditModal: () => {},
  toggleMenu: false,
  setToggleMenu: () => {},
  scrollHeight: 0,
  setLoadingState: () => {},
  showConnectWalletModal: () => {},
  hideConnectWalletModal: () => {},
  isTokenTransactionModalOpen: false,
  showTokenTransactionModal: () => {},
  hideTokenTransactionModal: () => {},
  showUpdateApplicationModal: () => {},
  hideUpdateApplicationModal: () => {},
  isUpdateApplicationModalOpen: false,
  showWithdrawRewardModal: () => {},
  hideWithdrawRewardModal: () => {},
  isWithdrawRewardModalOpen: false,
});

export const GlobalProvider = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadModalOpen, setUploadIsModalOpen] = useState(false);
  const [isApplicationModalOpen, setApplicationIsModalOpen] = useState(false);
  const [isAuditModalOpen, setAuditIsModalOpen] = useState(false);
  const [isConnectWalletModalOpen, setIsConnectWalletModalOpen] =
    useState(false);
  const [isTokenTransactionModalOpen, setIsTokenTransactionModalOpen] =
    useState(false);
  const [isUpdateApplicationModalOpen, setIsUpdateApplicationModalOpen] =
    useState(false);
  const [isWithdrawRewardModalOpen, setIsWithdrawRewardModalOpen] =
    useState(false);

  const [toggleMenu, setToggleMenu] = useState(false);
  const [scrollHeight, setScrollHeight] = useState(0);

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

  const showUploadModal = () => {
    setUploadIsModalOpen(true);
  };

  const hideUploadModal = () => {
    setUploadIsModalOpen(false);
  };

  const showTokenTransactionModal = () => {
    setIsTokenTransactionModalOpen(true);
  };

  const hideTokenTransactionModal = () => {
    setIsTokenTransactionModalOpen(false);
  };

  const showApplicationModal = () => {
    setApplicationIsModalOpen(true);
  };

  const hideApplicationModal = () => {
    setApplicationIsModalOpen(false);
  };

  const showAuditModal = () => {
    setAuditIsModalOpen(true);
  };

  const hideAuditModal = () => {
    setAuditIsModalOpen(false);
  };

  const showConnectWalletModal = () => {
    setIsConnectWalletModalOpen(true);
  };

  const hideConnectWalletModal = () => {
    setIsConnectWalletModalOpen(false);
  };

  const setLoadingState = (state: boolean) => {
    setIsLoading(state);
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      var height: number = getScrollTop();
      setScrollHeight(height);
    });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        toggleMenu,
        setToggleMenu,
        scrollHeight,
        isLoading,
        isUploadModalOpen,
        isApplicationModalOpen,
        isAuditModalOpen,
        showUploadModal,
        hideUploadModal,
        showApplicationModal,
        hideApplicationModal,
        showAuditModal,
        hideAuditModal,
        setLoadingState,
        isConnectWalletModalOpen,
        showConnectWalletModal,
        hideConnectWalletModal,
        isTokenTransactionModalOpen,
        showTokenTransactionModal,
        hideTokenTransactionModal,
        showUpdateApplicationModal,
        hideUpdateApplicationModal,
        isUpdateApplicationModalOpen,
        showWithdrawRewardModal,
        hideWithdrawRewardModal,
        isWithdrawRewardModalOpen,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
