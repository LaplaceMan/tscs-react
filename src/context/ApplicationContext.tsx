import React, { useState, useEffect, useContext } from "react";
import { ApplicationContent, Subtitle, defaultSubtitle } from "../types/baseTypes";
import { Submit, Upload, Audit, ApproveTransaction } from "../types/formTypes";
import { ethers, BigNumber } from "ethers";
import { SUBTITLE_SYSTEM, SUBTITLE_SYSTEM_ABI, ERC20_ABI } from "../utils/contracts"
import { GlobalContext } from "./GlobalContext";
const { ethereum } = window as any;

const getContract = (address: string, abi: any): ethers.Contract => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner()
  const contract = new ethers.Contract(address, abi, signer);
  return contract
}

export const ApplicationContext = React.createContext<ApplicationContent>({
  userDID: { reputation: '0', deposit: '0' },
  defaultUploadSubtitleData: { applyId: '0', language: 1 },
  updateDefaultUploadSubtitleData: () => { },
  defaultAuditSubtitleData: defaultSubtitle,
  updateDefaultAuditSubtitleData: () => { },
  submitApplication: () => { },
  uploadSubtitle: () => { },
  auditSubtitle: () => { },
  tokenApprove: () => { },
});

export const ApplicationProvider = ({ children }: any) => {
  const { setLoadingState } = useContext(GlobalContext)
  const [userDID, setUserDID] = useState({ reputation: '0', deposit: '0' });
  const [defaultUploadSubtitleData, setDefaultUploadSubtitleData] = useState({
    applyId: '0',
    language: 1,
  });
  const [defaultAuditSubtitleData, setDefaultAuditSubtitleData] = useState(defaultSubtitle);

  const updateDefaultAuditSubtitleData = (subtitle: Subtitle) => {
    setDefaultAuditSubtitleData(subtitle);
  }

  const updateDefaultUploadSubtitleData = (
    applyId: string,
    language: number
  ) => {
    setDefaultUploadSubtitleData({
      applyId: applyId,
      language: language,
    });
  };

  const getUserDID = async () => {
    if (!ethereum) return alert("Please install wallet.");
    const networkId = ethereum.chainId
    const tscs = getContract(SUBTITLE_SYSTEM[networkId], SUBTITLE_SYSTEM_ABI);
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    const address = accounts[0];
    if (address) {
      let result = await tscs.getUserBaseInfo(address);
      setUserDID({ reputation: BigNumber.from(result[0]).div(10).toString(), deposit: BigNumber.from(result[1]).toString() })
    }
  }

  const submitApplication = async (params: Submit) => {
    if (!ethereum) return alert("Please install wallet.");
    const networkId = ethereum.chainId
    const tscs = getContract(SUBTITLE_SYSTEM[networkId], SUBTITLE_SYSTEM_ABI);
    let transaction = await tscs.submitApplication(params.platform, params.videoId, params.strategy, params.amount, params.language, params.deadline, params.source);
    setLoadingState(true);
    await transaction.wait()
    console.log('Success:', transaction.hash);
    setLoadingState(false);
  }

  const uploadSubtitle = async (params: Upload) => {
    if (!ethereum) return alert("Please install wallet.");
    const networkId = ethereum.chainId
    const tscs = getContract(SUBTITLE_SYSTEM[networkId], SUBTITLE_SYSTEM_ABI);
    let transaction = await tscs.uploadSubtitle(params.applyId, params.cid, params.language, params.fingerprint);
    setLoadingState(true);
    await transaction.wait()
    console.log('Success:', transaction.hash);
    setLoadingState(false);
  }

  const auditSubtitle = async (params: Audit) => {
    if (!ethereum) return alert("Please install wallet.");
    const networkId = ethereum.chainId
    const tscs = getContract(SUBTITLE_SYSTEM[networkId], SUBTITLE_SYSTEM_ABI);
    let transaction = await tscs.evaluateSubtitle(params.subtitleId, params.attitude)
    setLoadingState(true);
    await transaction.wait()
    console.log('Success:', transaction.hash);
    setLoadingState(false);
  }

  const tokenApprove = async (params: ApproveTransaction) => {
    if (!ethereum) return alert("Please install wallet.");
    let token;
    let transaction;
    if (params.type == 'ERC20') {
      token = getContract(params.address, ERC20_ABI);
      transaction = await token.approve(params.to, params.number);
      await transaction.wait()
      console.log('Success:', transaction.hash);
    }
  }

  useEffect(() => {
    getUserDID()
  }, []);

  return (
    <ApplicationContext.Provider
      value={{
        userDID,
        defaultUploadSubtitleData,
        updateDefaultUploadSubtitleData,
        defaultAuditSubtitleData,
        updateDefaultAuditSubtitleData,
        submitApplication,
        uploadSubtitle,
        auditSubtitle,
        tokenApprove,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};
