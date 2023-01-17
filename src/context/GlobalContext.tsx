import React, { useEffect, useState } from "react";
import { GlobalContent } from "../types/baseTypes";
import { getScrollTop } from "../utils/tools";
export const GlobalContext = React.createContext<GlobalContent>({} as any);

export const GlobalProvider = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadModalOpen, setUploadIsModalOpen] = useState(false);
  const [isApplicationModalOpen, setApplicationIsModalOpen] = useState(false);
  const [isAuditModalOpen, setAuditIsModalOpen] = useState(false);
  const [isTokenTransactionModalOpen, setIsTokenTransactionModalOpen] =
    useState(false);
  const [isUpdateApplicationModalOpen, setIsUpdateApplicationModalOpen] =
    useState(false);
  const [isWithdrawRewardModalOpen, setIsWithdrawRewardModalOpen] =
    useState(false);
  const [isDespoitAssetModalOpen, setIsDespoitAssetModalOpen] = useState(false);

  const [toggleMenu, setToggleMenu] = useState(false);
  const [scrollHeight, setScrollHeight] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const height: number = getScrollTop();
      setScrollHeight(height);
    });
  }, []);

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

  const setLoadingState = (state: boolean) => {
    setIsLoading(state);
  };

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
