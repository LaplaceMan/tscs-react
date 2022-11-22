import React, { useState, useContext, useEffect } from "react";
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
  QueryUserOwnApplication,
  QueryUserOwnSubtitle,
  QueryUserOwnAudit,
  QueryUserOwn,
  QueryLockedToken,
  QueryLanguages,
  QueryPlatforms,
} from "../utils/graphql/graphqls";
import { GRAPHQL_API } from "../utils/constants";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { WalletContext } from "../context/WalletContext";
const { ethereum } = window as any;
export const DataContext = React.createContext<DataContent>({
  applications: [],
  subtitles: [],
  queryApplicationData: () => {},
  dashboard: defaultDashboard,
  queryHomeData: () => {},
  querySubtitleData: () => {},
  defaultAuditSubtitleMaker: defaultUser,
  userOwnData: defaultUserOwn,
  // queryUserOwnApplicationData: () => { },
  // queryUserOwnSubtitleData: () => { },
  // queryUserOwnAuditData: () => { },
  queryUserData: () => {},
  queryUserOwnData: () => {},
  queryUserLockedToken: () => {},
  userDayLocakedToken: "*",
  regiserLanguages: [],
  regiserPlatforms: [],
});

export const DataProvider = ({ children }: any) => {
  const { accountState } = useContext(WalletContext);
  const [dashboard, setDashboard] = useState<Dashboard>(defaultDashboard);
  const [applications, setApplications] = useState<Application[]>([]);
  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);
  const [defaultAuditSubtitleMaker, setDefaultAuditSubtitleMaker] =
    useState<User>(defaultUser);
  const [userOwnData, setUserOwnData] = useState<UserOwn>(defaultUserOwn);
  const [userDayLocakedToken, setUserDayLocakedToken] = useState("*");
  const [regiserLanguages, setRegiserLanguages] = useState([
    { id: "0", notes: "" },
  ]);
  const [regiserPlatforms, setRegiserPlatforms] = useState([
    { id: "", name: "" },
  ]);

  const queryHomeData = () => {
    const day = parseInt(
      (new Date().valueOf() / 86400000).toString()
    ).toString();
    const client = new ApolloClient({
      uri: GRAPHQL_API,
      cache: new InMemoryCache(),
    });
    client
      .query({
        query: gql(QueryHome),
        variables: {
          id: SUBTITLE_SYSTEM[ethereum.chainId],
          first: 8,
          date: day,
        },
      })
      .then((data) => {
        let dashboard = data.data.dashboard;
        let dayData = data.data.dayData;
        let getApplications = data.data.applications;
        let getSubtitles = data.data.subtitles;
        let applicationArray = new Array<Application>();
        let subtitleArray = new Array<Subtitle>();
        getApplications.map((item: any) => {
          applicationArray.push({
            applicant: item.applicant.id,
            vidoId: item.video.orderId ? item.video.orderId : item.video.realId,
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
          applicationInc: dayData.applicationCount,
          userInc: dayData.userCount,
          platformInc: dayData.platformCount,
          subtitleInc: dayData.subtitleCount,
        });
      })
      .catch((err) => {
        console.log("Error fetching data: ", err);
      });
  };

  const queryApplicationData = (
    first: number,
    skip: number,
    language: string
  ) => {
    const client = new ApolloClient({
      uri: GRAPHQL_API,
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
        let getApplications = data.data.applications;
        let applicationArray = new Array<Application>();
        getApplications.map((item: any) => {
          applicationArray.push({
            applicant: item.applicant.id,
            vidoId: item.video.orderId ? item.video.orderId : item.video.realId,
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
      })
      .catch((err) => {
        console.log("Error fetching data: ", err);
      });
  };

  const querySubtitleData = (first: number, skip: number, language: string) => {
    const client = new ApolloClient({
      uri: GRAPHQL_API,
      cache: new InMemoryCache(),
    });
    client
      .query({
        query: gql(
          language == "0" ? QuerySubtitle : QueryApplicationWithLanguage
        ),
        variables: {
          first: first,
          skip: skip,
          languageId: language,
        },
      })
      .then((data) => {
        let getSubtitles = data.data.subtitles;
        let subtitleArray = new Array<Subtitle>();
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
      })
      .catch((err) => {
        console.log("Error fetching data: ", err);
      });
  };

  const queryUserData = (userId: string) => {
    const client = new ApolloClient({
      uri: GRAPHQL_API,
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
        let user = data.data.user;
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
    const client = new ApolloClient({
      uri: GRAPHQL_API,
      cache: new InMemoryCache(),
    });
    client
      .query({
        query: gql(QueryUserOwn),
        variables: {
          id: address,
        },
      })
      .then((data) => {
        let getApplications = data.data.user.applications;
        let getSubtitles = data.data.user.subtitlesOwner;
        let getAudits = data.data.user.audits;
        let applicationArray = new Array<OwnApplication>();
        let subtitleArray = new Array<OwnSubtitle>();
        let auditArray = new Array<OwnAudit>();
        getApplications.map((item: any) => {
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
        getSubtitles.map((item: any) => {
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
        getAudits.map((item: any) => {
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
      })
      .catch((err) => {
        console.log("Error fetching data: ", err);
      });
  };

  const queryUserOwnApplicationData = (user: string) => {
    const client = new ApolloClient({
      uri: GRAPHQL_API,
      cache: new InMemoryCache(),
    });
    user &&
      client
        .query({
          query: gql(QueryUserOwnApplication),
          variables: {
            id: user,
          },
        })
        .then((data) => {
          let getApplications = data.data.user.applications;
          let applicationArray = new Array<OwnApplication>();
          getApplications.map((item: any) => {
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
          setUserOwnData({ ...userOwnData, applications: applicationArray });
        })
        .catch((err) => {
          console.log("Error fetching data: ", err);
        });
  };

  const queryUserOwnSubtitleData = (user: string) => {
    const client = new ApolloClient({
      uri: GRAPHQL_API,
      cache: new InMemoryCache(),
    });
    user &&
      client
        .query({
          query: gql(QueryUserOwnSubtitle),
          variables: {
            id: user,
          },
        })
        .then((data) => {
          let getSubtitles = data.data.user.subtitlesOwner;
          let subtitleArray = new Array<OwnSubtitle>();
          getSubtitles.map((item: any) => {
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

          setUserOwnData({ ...userOwnData, subtitles: subtitleArray });
        })
        .catch((err) => {
          console.log("Error fetching data: ", err);
        });
  };

  const queryUserOwnAuditData = (user: string) => {
    const client = new ApolloClient({
      uri: GRAPHQL_API,
      cache: new InMemoryCache(),
    });
    user &&
      client
        .query({
          query: gql(QueryUserOwnAudit),
          variables: {
            id: user,
          },
        })
        .then((data) => {
          let getAudits = data.data.user.audits;
          let auditArray = new Array<OwnAudit>();
          getAudits.map((item: any) => {
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
          setUserOwnData({ ...userOwnData, audits: auditArray });
        })
        .catch((err) => {
          console.log("Error fetching data: ", err);
        });
  };

  const queryUserLockedToken = (platform: string, day: number) => {
    const client = new ApolloClient({
      uri: GRAPHQL_API,
      cache: new InMemoryCache(),
    });
    client
      .query({
        query: gql(QueryLockedToken),
        variables: {
          id: accountState.address + "-" + platform + "-" + day.toString(),
        },
      })
      .then((data) => {
        let locked = data.data.reward.locked;
        if (locked) {
          setUserDayLocakedToken(locked);
        }
      })
      .catch((err) => {
        console.log("Error fetching data: ", err);
      });
  };

  const queryRegiserLanugages = () => {
    const client = new ApolloClient({
      uri: GRAPHQL_API,
      cache: new InMemoryCache(),
    });
    client
      .query({
        query: gql(QueryLanguages),
      })
      .then((data) => {
        let languages = data.data.languages;
        if (languages) {
          let languageArray = new Array<{ id: string; notes: string }>();
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
  };

  const queryRegiserPlatforms = () => {
    const client = new ApolloClient({
      uri: GRAPHQL_API,
      cache: new InMemoryCache(),
    });
    client
      .query({
        query: gql(QueryPlatforms),
      })
      .then((data) => {
        let platforms = data.data.platforms;
        if (platforms) {
          let platformArray = new Array<{ id: string; name: string }>();
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
  };

  useEffect(() => {
    queryHomeData();
    queryRegiserLanugages();
    queryRegiserPlatforms();
    let timer = setInterval(() => {
      queryRegiserLanugages();
      queryRegiserPlatforms();
      queryHomeData();
    }, 600000);
    return () => clearInterval(timer);
  }, []);

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
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
