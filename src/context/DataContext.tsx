import React, { useState, useContext } from "react";
import {
  DataContent,
  User,
  defaultUser,
  UserOwn,
  OwnApplication,
  OwnSubtitle,
  OwnAudit,
  defaultUserOwn,
  PlayerBaseInfo,
  defaultPlayerBaseInfo,
  PlayerSubtitle,
} from "../types/baseTypes";
import {
  Application,
  Subtitle,
  Dashboard,
  defaultDashboard,
} from "../types/baseTypes";
import { MURMES_PROTOCOL } from "../utils/contracts";
import {
  QueryHome,
  QueryTasks,
  QueryTaskWithLanguage,
  QuerySubtitle,
  QuerySubtitleWithLanguage,
  QueryUser,
  QueryUserOwn,
  QueryLockedToken,
  QueryLanguages,
  QueryPlatforms,
  QuerySpecialApplication,
} from "../utils/graphql/graphqls";
import { getNetwork, getAccount } from "@wagmi/core";
import { SUPPORT_NETWORK } from "../utils/constants";
import { gql } from "@apollo/client";
import { Client } from "../client/apollo";
import { GlobalContext } from "./GlobalContext";
import { message } from "antd";

export const DataContext = React.createContext<DataContent>({} as DataContent);

export const DataProvider = ({ children }: any) => {
  const { chainId } = useContext(GlobalContext);
  const [isGetDataLoading, setIsGetDataLoading] = useState<boolean>(false);
  const [dashboard, setDashboard] = useState<Dashboard | null>(
    defaultDashboard
  );
  const [applications, setApplications] = useState<Application[] | null>([]);
  const [subtitles, setSubtitles] = useState<Subtitle[] | null>([]);
  const [defaultAuditSubtitleMaker, setDefaultAuditSubtitleMaker] =
    useState<User>(defaultUser);
  const [userOwnData, setUserOwnData] = useState<UserOwn>(defaultUserOwn);
  const [userDayLocakedToken, setUserDayLocakedToken] = useState("*");
  const [regiserLanguages, setRegiserLanguages] = useState<
    { id: string; notes: string }[]
  >([]);
  const [regiserPlatforms, setRegiserPlatforms] = useState<
    { id: string; name: string }[]
  >([]);
  const [playerBaseInfo, setPlayerBaseInfo] = useState<PlayerBaseInfo>(
    defaultPlayerBaseInfo
  );
  const [playerSubtitles, setPlayerSubtitles] = useState<PlayerSubtitle[]>([]);

  const { chain } = getNetwork();
  const account = getAccount();

  const clearData = () => {
    setSubtitles(null);
    setApplications(null);
    setDashboard(null);
    setUserOwnData(defaultUserOwn);
  };

  const queryHomeData = async () => {
    if (chain && SUPPORT_NETWORK.includes(chainId)) {
      setIsGetDataLoading(true);
      try {
        const data = await Client(chainId).query({
          query: gql(QueryHome),
          variables: {
            id: MURMES_PROTOCOL[chain.id],
          },
        });
        if (data && data.data) {
          const dashboard = data.data.dashboard;
          setDashboard({
            taskCount: dashboard.taskCount,
            userCount: dashboard.userCount,
            itemCount: dashboard.itemCount,
            platformCount: dashboard.platformCount,
          });
        }
        setIsGetDataLoading(false);
      } catch (err) {
        console.log("Error fetching data: ", err);
        message.error("Error: " + err);
        setIsGetDataLoading(false);
      }
    } else {
      clearData();
      console.log("Not support network!", chainId);
    }
  };

  const QueryTaskData = async (
    first: number,
    skip: number,
    language: string
  ) => {
    if (chain && SUPPORT_NETWORK.includes(chainId)) {
      setIsGetDataLoading(true);
      try {
        const data = await Client(chainId).query({
          query: gql(language == "0" ? QueryTasks : QueryTaskWithLanguage),
          variables: {
            first: first,
            skip: skip,
            languageId: language,
          },
        });
        if (data && data.data) {
          const getApplications =
            language == "0"
              ? data.data.applications
              : data.data.language.applications;
          const applicationArray = new Array<Application>();
          getApplications.map((item: any) => {
            applicationArray.push({
              applicant: item.applicant.id,
              vidoId: item.video.orderId
                ? item.video.orderId
                : item.video.realId,
              platformName: item.video.platform.name,
              applyId: item.id,
              language: item.language.notes,
              amount: item.amount,
              payType: item.strategy.notes,
              uploads: item.subtitleCount,
              start: item.start,
              deadline: Number(item.deadline),
              source: item.source,
            });
          });
          setApplications(applicationArray);
        }
        setIsGetDataLoading(false);
      } catch (err) {
        console.log("Error fetching data: ", err);
        message.error("Error: " + err);
        setIsGetDataLoading(false);
      }
    } else {
      clearData();
      console.log("Not support network!", chainId);
    }
  };

  const querySubtitleData = async (
    first: number,
    skip: number,
    language: string
  ) => {
    if (chain && SUPPORT_NETWORK.includes(chainId)) {
      setIsGetDataLoading(true);
      try {
        const data = await Client(chainId).query({
          query: gql(
            language == "0" ? QuerySubtitle : QuerySubtitleWithLanguage
          ),
          variables: {
            first: first,
            skip: skip,
            languageId: language,
          },
        });
        if (data && data.data) {
          const getSubtitles =
            language == "0"
              ? data.data.subtitles
              : data.data.language.subtitles;
          const subtitleArray = new Array<Subtitle>();
          getSubtitles.map((item: any) => {
            subtitleArray.push({
              applyId: item.application.id,
              applySource: item.application.source,
              payType: item.application.strategy.notes,
              platformName: item.application.video.platform.name,
              subtitleId: item.id,
              language: item.language.notes,
              support: item.supporterCount,
              oppose: item.dissenterCount,
              maker: item.maker.id,
              start: item.application.start,
              deadline: Number(item.application.deadline),
              fingerprint: item.fingerprint,
              cid: item.cid,
            });
          });
          setSubtitles(subtitleArray);
        }
        setIsGetDataLoading(false);
      } catch (err) {
        console.log("Error fetching data: ", err);
        message.error("Error: " + err);
        setIsGetDataLoading(false);
      }
    } else {
      clearData();
      console.log("Not support network!", chainId);
    }
  };

  const queryUserData = async (userId: string) => {
    try {
      const data = await Client(chainId).query({
        query: gql(QueryUser),
        variables: {
          id: userId,
        },
      });
      if (data && data.data) {
        const user = data.data.user;
        setDefaultAuditSubtitleMaker({
          id: user.id,
          reputation: user.reputation,
          deposit: user.deposit,
          adopted: user.adoptedCount,
          join: user.time,
        });
      }
    } catch (err) {
      console.log("Error fetching data: ", err);
      message.error("Error: " + err);
    }
  };

  const queryUserOwnData = async (address: string) => {
    if (chain && SUPPORT_NETWORK.includes(chainId)) {
      setIsGetDataLoading(true);
      try {
        const data = await Client(chainId).query({
          query: gql(QueryUserOwn),
          variables: {
            id: address.toLocaleLowerCase(),
          },
        });
        if (data && data.data && data.data.user) {
          const userData = data.data.user;
          const applicationArray = new Array<OwnApplication>();
          const subtitleArray = new Array<OwnSubtitle>();
          const auditArray = new Array<OwnAudit>();
          userData.applications &&
            userData.applications.map((item: any) => {
              applicationArray.push({
                name: item.video.platform.name,
                type: item.strategy.notes,
                price: item.amount,
                state: item.adopted ? item.adopted.id : "0",
                source: item.source,
                videoId: item.video.id,
                applyId: item.id,
                language: item.language.notes,
                deadline: item.deadline,
              });
            });
          userData.subtitlesOwner &&
            userData.subtitlesOwner.map((item: any) => {
              subtitleArray.push({
                subtitleId: item.id,
                cid: item.cid,
                support: item.supporterCount,
                oppose: item.dissenterCount,
                state: item.state,
                applyId: item.application.id,
                language: item.language.notes,
                type: item.application.strategy.notes,
                platform: item.application.video.platform.id,
                videoId: item.application.video.orderId,
              });
            });
          userData.audits &&
            userData.audits.map((item: any) => {
              auditArray.push({
                cid: item.subtitle.cid,
                state: item.subtitle.state,
                applyId: item.subtitle.application.id,
                language: item.subtitle.language.notes,
                attitude: item.attitude,
                subtitleId: item.subtitle.id,
                type: item.subtitle.application.strategy.notes,
                platform: item.subtitle.application.video.platform.id,
                videoId: item.subtitle.application.video.orderId,
              });
            });
          setUserOwnData({
            applications: applicationArray,
            subtitles: subtitleArray,
            audits: auditArray,
          });
        }
        setIsGetDataLoading(false);
      } catch (err) {
        console.log("Error fetching data: ", err);
        message.error("Error: " + err);
        setIsGetDataLoading(false);
      }
    } else {
      clearData();
      console.log("Not support network!", chainId);
    }
  };

  const queryUserLockedToken = async (platform: string, day: number) => {
    try {
      const data = await Client(chainId).query({
        query: gql(QueryLockedToken),
        variables: {
          id:
            account.address!.toLocaleLowerCase() +
            "-" +
            platform +
            "-" +
            day.toString(),
        },
      });
      if (data && data.data && data.data.reward && data.data.reward.locked) {
        const locked = data.data.reward.locked;
        setUserDayLocakedToken(locked);
      } else {
        setUserDayLocakedToken("0");
      }
    } catch (err) {
      console.log("Error fetching data: ", err);
      message.error("Error: " + err);
    }
  };

  const queryRegiserLanugages = async () => {
    if (chain && SUPPORT_NETWORK.includes(chainId)) {
      try {
        const data = await Client(chainId).query({
          query: gql(QueryLanguages),
        });
        const languages = data.data.languages;
        if (languages) {
          const languageArray = new Array<{ id: string; notes: string }>();
          languages.map((item: any) => {
            languageArray.push({
              id: item.id,
              notes: item.notes,
            });
          });
          setRegiserLanguages(languageArray);
        }
      } catch (err) {
        console.log("Error fetching data: ", err);
        message.error("Error: " + err);
      }
    }
  };

  const queryRegiserPlatforms = async () => {
    if (chain && SUPPORT_NETWORK.includes(chainId)) {
      try {
        const data = await Client(chainId).query({
          query: gql(QueryPlatforms),
        });
        const platforms = data.data.platforms;
        if (platforms) {
          const platformArray = new Array<{ id: string; name: string }>();
          platforms.map((item: any) => {
            platformArray.push({
              id: item.id,
              name: item.name.replace(/["]/g, ""),
            });
          });
          setRegiserPlatforms(platformArray);
        }
      } catch (err) {
        console.log("Error fetching data: ", err);
        message.error("Error: " + err);
      }
    }
  };

  const querySpecialApplication = async (id: string) => {
    if (chain && SUPPORT_NETWORK.includes(chainId)) {
      setIsGetDataLoading(true);
      try {
        const data: any = await Client(chainId).query({
          query: gql(QuerySpecialApplication),
          variables: {
            id,
          },
        });
        if (data && data.data && data.data.application) {
          setPlayerBaseInfo({
            applicant: data.data.application.applicant.id,
            platform: data.data.application.video.platform.name,
            deadline: data.data.application.deadline,
            language: data.data.application.language.notes,
            source: data.data.application.source,
            uploads: data.data.application.subtitleCount,
            adopted: data.data.application.adopted
              ? data.data.application.adopted.id
              : "None",
            payType: data.data.application.strategy.notes,
            start: data.data.application.start,
          });
          if (
            data.data.application.subtitles &&
            data.data.application.subtitles.length > 0
          ) {
            const palyerSubtitleArray = new Array<PlayerSubtitle>();
            data.data.application.subtitles.map((item: any) => {
              palyerSubtitleArray.push({
                id: item.id,
                maker: item.maker.id,
                reputation: item.maker.reputation,
                deposit: item.maker.deposit,
                support: item.supporterCount,
                oppose: item.dissenterCount,
                cid: item.cid,
                fingerprint: item.fingerprint,
              });
            });
            setPlayerSubtitles(palyerSubtitleArray);
          }
        }
        setIsGetDataLoading(false);
      } catch (err) {
        console.log("Error fetching data: ", err);
        message.error("Error: " + err);
        setIsGetDataLoading(false);
      }
    }
  };

  return (
    <DataContext.Provider
      value={{
        playerSubtitles,
        playerBaseInfo,
        dashboard,
        queryHomeData,
        applications,
        QueryTaskData,
        subtitles,
        querySubtitleData,
        defaultAuditSubtitleMaker,
        userOwnData,
        queryUserData,
        queryUserOwnData,
        queryUserLockedToken,
        querySpecialApplication,
        userDayLocakedToken,
        regiserLanguages,
        regiserPlatforms,
        isGetDataLoading,
        clearData,
        queryRegiserLanugages,
        queryRegiserPlatforms,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
