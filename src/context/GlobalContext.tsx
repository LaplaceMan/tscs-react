import React, { useEffect, useState } from "react";
import { GlobalContent } from "../types/baseTypes";
import { getScrollTop } from "../utils/tools";
export const GlobalContext = React.createContext<GlobalContent>({
  isLoading: false,
  isUploadModalOpen: false,
  isApplicationModalOpen: false,
  isAuditModalOpen: false,
  isConnectWalletModalOpen: false,
  showUploadModal: () => { },
  hideUploadModal: () => { },
  showApplicationModal: () => { },
  hideApplicationModal: () => { },
  showAuditModal: () => { },
  hideAuditModal: () => { },
  toggleMenu: false,
  setToggleMenu: () => { },
  scrollHeight: 0,
  setLoadingState: () => { },
  showConnectWalletModal: () => { },
  hideConnectWalletModal: () => { }
});

export const GlobalProvider = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadModalOpen, setUploadIsModalOpen] = useState(false);
  const [isApplicationModalOpen, setApplicationIsModalOpen] = useState(false);
  const [isAuditModalOpen, setAuditIsModalOpen] = useState(false);
  const [isConnectWalletModalOpen, setIsConnectWalletModalOpen] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [scrollHeight, setScrollHeight] = useState(0);

  const showUploadModal = () => {
    setUploadIsModalOpen(true);
  };

  const hideUploadModal = () => {
    setUploadIsModalOpen(false);
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
    setIsLoading(state)
  }

  useEffect(() => {
    window.addEventListener("scroll", () => {
      var height: number = getScrollTop();
      setScrollHeight(height);
    });
  }, []);

  return (
    <GlobalContext.Provider value={{
      toggleMenu, setToggleMenu, scrollHeight, isLoading,
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
      hideConnectWalletModal
    }}>
      {children}
    </GlobalContext.Provider>
  );
};
