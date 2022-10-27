import React, { useState } from "react";
import { ApplicationContent } from "../types/baseTypes";
export const ApplicationContext = React.createContext<ApplicationContent>({
  isUploadModalOpen: false,
  isApplicationModalOpen: false,
  isAuditModalOpen: false,
  showUploadModal: () => {},
  hideUploadModal: () => {},
  showApplicationModal: () => {},
  hideApplicationModal: () => {},
  showAuditModal: () => {},
  hideAuditModal: () => {},
  defaultUploadSubtitleData: { applyId: 0, language: "" },
  updateDefaultUploadSubtitleData: () => {},
});

export const ApplicationProvider = ({ children }: any) => {
  const [isUploadModalOpen, setUploadIsModalOpen] = useState(false);
  const [isApplicationModalOpen, setApplicationIsModalOpen] = useState(false);
  const [isAuditModalOpen, setAuditIsModalOpen] = useState(false);

  const [defaultUploadSubtitleData, setDefaultUploadSubtitleData] = useState({
    applyId: 0,
    language: "",
  });

  const updateDefaultUploadSubtitleData = (
    applyId: number,
    language: string
  ) => {
    setDefaultUploadSubtitleData({
      applyId: applyId,
      language: language,
    });
  };
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

  return (
    <ApplicationContext.Provider
      value={{
        isUploadModalOpen,
        isApplicationModalOpen,
        isAuditModalOpen,
        showUploadModal,
        hideUploadModal,
        showApplicationModal,
        hideApplicationModal,
        showAuditModal,
        hideAuditModal,
        defaultUploadSubtitleData,
        updateDefaultUploadSubtitleData,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};
