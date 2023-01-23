import React, { useState, useEffect, useContext } from "react";
import {
  DataContent,
  User,
  defaultUser,
  UserOwn,
  OwnApplication,
  OwnSubtitle,
  OwnAudit,
  defaultUserOwn,
} from "../types/baseTypes";
import {
  Application,
  Subtitle,
  Dashboard,
  defaultDashboard,
} from "../types/baseTypes";
import { SUBTITLE_SYSTEM } from "../utils/contracts";
import {
  QueryHome,
  QueryApplication,
  QueryApplicationWithLanguage,
  QuerySubtitle,
  QuerySubtitleWithLanguage,
  QueryUser,
  QueryUserOwn,
  QueryLockedToken,
  QueryLanguages,
  QueryPlatforms,
} from "../utils/graphql/graphqls";
import { getNetwork, getAccount } from "@wagmi/core";
import {
  GRAPHQL_SUBGRAPH_GOERLI_ABI,
  SUPPORT_NETWORK,
} from "../utils/constants";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { GlobalContext } from "./GlobalContext";

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
  const { chain } = getNetwork();
  const account = getAccount();

  useEffect(() => {
    queryRegiserLanugages();
    queryRegiserPlatforms();
  }, []);

  const clearData = () => {
    setSubtitles(null);
    setApplications(null);
    setDashboard(null);
    setUserOwnData(defaultUserOwn);
  };

  const queryHomeData = async () => {
    if (chain && SUPPORT_NETWORK.includes(chainId)) {
      setIsGetDataLoading(true);
      const day = parseInt(
        (new Date().valueOf() / 86400000).toString()
      ).toString();
      const client = new ApolloClient({
        uri: GRAPHQL_SUBGRAPH_GOERLI_ABI,
        cache: new InMemoryCache(),
      });
      client
        .query({
          query: gql(QueryHome),
          variables: {
            id: SUBTITLE_SYSTEM[chain.id],
            first: 8,
            date: day,
          },
        })
        .then((data) => {
          const dashboard = data.data.dashboard;
          const dayData = data.data.dayData;
          const getApplications = data.data.applications;
          const getSubtitles = data.data.subtitles;
          const applicationArray = new Array<Application>();
          const subtitleArray = new Array<Subtitle>();
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
          setApplications(applicationArray);
          setDashboard({
            applicationCount: dashboard.applicationCount,
            userCount: dashboard.userCount.toString(),
            subtitleCount: dashboard.subtitleCount,
            platformCount: dashboard.platformCount,
            applicationInc: dayData ? dayData.applicationCount : "0",
            userInc: dayData ? dayData.userCount : "0",
            platformInc: dayData ? dayData.platformCount : "0",
            subtitleInc: dayData ? dayData.subtitleCount : "0",
          });
          setIsGetDataLoading(false);
        })
        .catch((err) => {
          console.log("Error fetching data: ", err);
          setIsGetDataLoading(false);
        });
    } else {
      clearData();
      console.log("Not support network!", chainId);
    }
  };

  const queryApplicationData = (
    first: number,
    skip: number,
    language: string
  ) => {
    if (chain && SUPPORT_NETWORK.includes(chainId)) {
      setIsGetDataLoading(true);
      const client = new ApolloClient({
        uri: GRAPHQL_SUBGRAPH_GOERLI_ABI,
        cache: new InMemoryCache(),
      });
      client
        .query({
          query: gql(
            language == "0" ? QueryApplication : QueryApplicationWithLanguage
          ),
          variables: {
            first: first,
            skip: skip,
            languageId: language,
          },
        })
        .then((data) => {
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
          setIsGetDataLoading(false);
        })
        .catch((err) => {
          console.log("Error fetching data: ", err);
          setIsGetDataLoading(false);
        });
    } else {
      clearData();
      console.log("Not support network!", chainId);
    }
  };

  const querySubtitleData = (first: number, skip: number, language: string) => {
    if (chain && SUPPORT_NETWORK.includes(chainId)) {
      setIsGetDataLoading(true);
      const client = new ApolloClient({
        uri: GRAPHQL_SUBGRAPH_GOERLI_ABI,
        cache: new InMemoryCache(),
      });
      client
        .query({
          query: gql(
            language == "0" ? QuerySubtitle : QuerySubtitleWithLanguage
          ),
          variables: {
            first: first,
            skip: skip,
            languageId: language,
          },
        })
        .then((data) => {
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
          setIsGetDataLoading(false);
        })
        .catch((err) => {
          console.log("Error fetching data: ", err);
          setIsGetDataLoading(false);
        });
    } else {
      clearData();
      console.log("Not support network!", chainId);
    }
  };

  const queryUserData = (userId: string) => {
    const client = new ApolloClient({
      uri: GRAPHQL_SUBGRAPH_GOERLI_ABI,
      cache: new InMemoryCache(),
    });
    client
      .query({
        query: gql(QueryUser),
        variables: {
          id: userId,
        },
      })
      .then((data) => {
        const user = data.data.user;
        setDefaultAuditSubtitleMaker({
          id: user.id,
          reputation: user.reputation,
          deposit: user.deposit,
          adopted: user.adoptedCount,
          join: user.time,
        });
      })
      .catch((err) => {
        console.log("Error fetching data: ", err);
      });
  };

  const queryUserOwnData = (address: string) => {
    if (chain && SUPPORT_NETWORK.includes(chainId)) {
      setIsGetDataLoading(true);
      const client = new ApolloClient({
        uri: GRAPHQL_SUBGRAPH_GOERLI_ABI,
        cache: new InMemoryCache(),
      });
      client
        .query({
          query: gql(QueryUserOwn),
          variables: {
            id: address.toLocaleLowerCase(),
          },
        })
        .then((data) => {
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
              });
            });
          setUserOwnData({
            applications: applicationArray,
            subtitles: subtitleArray,
            audits: auditArray,
          });
          setIsGetDataLoading(false);
        })
        .catch((err) => {
          console.log("Error fetching data: ", err);
          setIsGetDataLoading(false);
        });
    } else {
      clearData();
      console.log("Not support network!", chainId);
    }
  };

  const queryUserLockedToken = (platform: string, day: number) => {
    const client = new ApolloClient({
      uri: GRAPHQL_SUBGRAPH_GOERLI_ABI,
      cache: new InMemoryCache(),
    });
    client
      .query({
        query: gql(QueryLockedToken),
        variables: {
          id:
            account.address!.toLocaleLowerCase() +
            "-" +
            platform +
            "-" +
            day.toString(),
        },
      })
      .then((data) => {
        const locked = data.data.reward.locked;
        if (locked) {
          setUserDayLocakedToken(locked);
        }
      })
      .catch((err) => {
        console.log("Error fetching data: ", err);
      });
  };

  const queryRegiserLanugages = () => {
    if (chain && SUPPORT_NETWORK.includes(chainId)) {
      const client = new ApolloClient({
        uri: GRAPHQL_SUBGRAPH_GOERLI_ABI,
        cache: new InMemoryCache(),
      });
      client
        .query({
          query: gql(QueryLanguages),
        })
        .then((data) => {
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
        })
        .catch((err) => {
          console.log("Error fetching data: ", err);
        });
    }
  };

  const queryRegiserPlatforms = () => {
    if (chain && SUPPORT_NETWORK.includes(chainId)) {
      const client = new ApolloClient({
        uri: GRAPHQL_SUBGRAPH_GOERLI_ABI,
        cache: new InMemoryCache(),
      });
      client
        .query({
          query: gql(QueryPlatforms),
        })
        .then((data) => {
          const platforms = data.data.platforms;
          if (platforms) {
            const platformArray = new Array<{ id: string; name: string }>();
            platforms.map((item: any) => {
              platformArray.push({
                id: item.id,
                name: item.name,
              });
            });
            setRegiserPlatforms(platformArray);
          }
        })
        .catch((err) => {
          console.log("Error fetching data: ", err);
        });
    }
  };

  return (
    <DataContext.Provider
      value={{
        dashboard,
        queryHomeData,
        applications,
        queryApplicationData,
        subtitles,
        querySubtitleData,
        defaultAuditSubtitleMaker,
        userOwnData,
        queryUserData,
        queryUserOwnData,
        queryUserLockedToken,
        userDayLocakedToken,
        regiserLanguages,
        regiserPlatforms,
        isGetDataLoading,
        clearData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
