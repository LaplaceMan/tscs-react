import React, { useState } from "react";
import { GlobalContent } from "../types/contextTypes";
export const GlobalContext = React.createContext<GlobalContent>(
  {} as GlobalContent
);

export const GlobalProvider = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [isAuditModalOpen, setAuditIsModalOpen] = useState(false);
  const [isTokenTransactionModalOpen, setIsTokenTransactionModalOpen] =
    useState(false);
  const [isUpdateTaskModalOpen, setIsUpdateTaskModalOpen] = useState(false);
  const [isDepositAssetModalOpen, setIsDepositAssetModalOpen] = useState(false);
  const [isGuardManageModalOpen, setIsGuardManageModalOpen] = useState(false);

  const showDepositAssetModal = () => {
    setIsDepositAssetModalOpen(true);
  };

  const hideDepositAssetModal = () => {
    setIsDepositAssetModalOpen(false);
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
