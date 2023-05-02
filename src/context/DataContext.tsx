import React, { useState, useContext } from "react";
import {
  ListTask,
  ListItem,
  ListUser,
  User,
  defaultUser,
  UserOwn,
  OwnApplication,
  OwnSubtitle,
  OwnAudit,
  defaultUserOwn,
  ListPlatform,
} from "../types/baseTypes";
import { DataContent } from "../types/contextTypes";
import { Task, Item, Dashboard, defaultDashboard } from "../types/baseTypes";
import { MURMES_PROTOCOL } from "../utils/contracts";
import {
  QueryHome,
  QueryTasks,
  QueryTaskWithLanguage,
  QueryItems,
  QuerySubtitleWithLanguage,
  QueryUsers,
  QueryUserOwn,
  QueryLockedToken,
  QueryLanguages,
  QueryPlatforms,
  QuerySpecialApplication,
} from "../utils/graphql/graphqls";
import { getAccount } from "@wagmi/core";
import { SUPPORT_NETWORK } from "../utils/constants";
import { gql } from "@apollo/client";
import { Client } from "../client/apollo";
import { GlobalContext } from "./GlobalContext";
import { message } from "antd";

export const DataContext = React.createContext<DataContent>({} as DataContent);

export const DataProvider = ({ children }: any) => {
  const { chainId } = useContext(GlobalContext);
  const account = getAccount();
  const [isGetDataLoading, setIsGetDataLoading] = useState<boolean>(false);

  const [dashboard, setDashboard] = useState<Dashboard | null>(
    defaultDashboard
  );
  const [tasks, setTasks] = useState<ListTask[] | null>([]);
  const [items, setItems] = useState<ListItem[] | null>([]);
  const [users, setUsers] = useState<ListUser[] | null>([]);
  const [regiserLanguages, setRegiserLanguages] = useState<
    { id: string; notes: string }[]
  >([]);
  const [platforms, setPlatforms] = useState<ListPlatform[] | null>([]);
  const [defaultAuditSubtitleMaker, setDefaultAuditSubtitleMaker] =
    useState<User>(defaultUser);
  const [userOwnData, setUserOwnData] = useState<UserOwn>(defaultUserOwn);
  const [userDayLocakedToken, setUserDayLocakedToken] = useState("*");

  const clearData = () => {
    setItems(null);
    setTasks(null);
    setDashboard(null);
    setUserOwnData(defaultUserOwn);
  };

  const queryDashboard = async () => {
    if (SUPPORT_NETWORK.includes(chainId)) {
      try {
        const data = await Client(chainId).query({
          query: gql(QueryHome),
          variables: {
            id: MURMES_PROTOCOL[chainId],
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
      } catch (err) {
        console.log("Error fetching data: ", err);
        message.error("Error: " + err);
      }
    }
  };

  const queryTaskData = async (
    first: number,
    skip: number,
    require: string
  ) => {
    if (SUPPORT_NETWORK.includes(chainId)) {
      setIsGetDataLoading(true);
      try {
        const data = await Client(chainId).query({
          query: gql(require == "0" ? QueryTasks : QueryTaskWithLanguage),
          variables: {
            first: first,
            skip: skip,
            requireId: require,
          },
        });
        if (data && data.data) {
          const getTasks =
            require == "0" ? data.data.tasks : data.data.require.tasks;
          const taskArray = new Array<ListTask>();
          getTasks.map((item: any) => {
            taskArray.push({
              key: item.id,
              id: item.id,
              require: item.requires.notes,
              payment: item.strategy,
              currency: item.currency.symbol,
              amount: item.amount,
              audit: item.auditModule,
              detection: item.detectionModule,
              state: item.state,
            });
          });
          setTasks(taskArray);
        }
        setIsGetDataLoading(false);
      } catch (err) {
        console.log("Error fetching data: ", err);
        setIsGetDataLoading(false);
        message.error("Error: " + err);
      }
    }
  };

  const queryItemData = async (
    first: number,
    skip: number,
    require: string
  ) => {
    if (SUPPORT_NETWORK.includes(chainId)) {
      setIsGetDataLoading(true);
      try {
        const data = await Client(chainId).query({
          query: gql(require == "0" ? QueryItems : QuerySubtitleWithLanguage),
          variables: {
            first: first,
            skip: skip,
            requireId: require,
          },
        });
        if (data && data.data) {
          const getItems =
            require == "0" ? data.data.items : data.data.require.items;
          const itemArray = new Array<ListItem>();
          getItems.map((item: any) => {
            itemArray.push({
              key: item.id,
              id: item.id,
              task: item.task.id,
              require: item.requires.notes,
              support: item.supporterCount,
              oppose: item.opponentCount,
              state: item.state,
              source: item.cid,
              fingerprint: item.fingerprint,
            });
          });
          setItems(itemArray);
        }
        setIsGetDataLoading(false);
      } catch (err) {
        console.log("Error fetching data: ", err);
        setIsGetDataLoading(false);
        message.error("Error: " + err);
      }
    } else {
      clearData();
      message.error("3 Not support network!", chainId);
    }
  };

  const queryPlatforms = async () => {
    if (SUPPORT_NETWORK.includes(chainId)) {
      try {
        const data = await Client(chainId).query({
          query: gql(QueryPlatforms),
        });
        const getPlatforms = data.data.platforms;
        if (platforms) {
          const platformArray = new Array<ListPlatform>();
          getPlatforms.map((item: any) => {
            platformArray.push({
              key: item.platformId,
              id: item.platformId,
              name: item.name,
              owner: item.id,
              authority: item.authorityModule,
              rate1: item.rateCountsToProfit,
              rate2: item.rateAuditorDivide,
              boxes: item.boxCount,
            });
          });
          setPlatforms(platformArray);
        }
      } catch (err) {
        console.log("Error fetching data: ", err);
        message.error("Error: " + err);
      }
    }
  };

  const queryUserData = async (first: number, skip: number) => {
    try {
      const data = await Client(chainId).query({
        query: gql(QueryUsers),
        variables: {
          first: first,
          skip: skip,
        },
      });
      if (data && data.data) {
        console.log(data.data);
        const getUsers = data.data.users;
        const userArray = new Array<ListUser>();
        getUsers.map((item: any) => {
          userArray.push({
            key: item.userId,
            id: item.userId,
            address: item.id,
            reputation: item.reputation,
            deposit: item.deposit,
            tasks: item.taskCount,
            items: item.makeItemCount,
            audits: item.auditCount,
            guard: item.guard ? item.guard : "None",
          });
        });
        setUsers(userArray);
      }
    } catch (err) {
      console.log("Error fetching data: ", err);
      message.error("Error: " + err);
    }
  };

  const queryUserOwnData = async (address: string) => {
    if (SUPPORT_NETWORK.includes(chainId)) {
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
      message.error("4 Not support network!", chainId);
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
    if (SUPPORT_NETWORK.includes(chainId)) {
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

  const querySpecialApplication = async (id: string) => {
    if (SUPPORT_NETWORK.includes(chainId)) {
      setIsGetDataLoading(true);
      try {
        const data: any = await Client(chainId).query({
          query: gql(QuerySpecialApplication),
          variables: {
            id,
          },
        });
        if (data && data.data && data.data.application) {
          if (
            data.data.application.subtitles &&
            data.data.application.subtitles.length > 0
          ) {
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
        dashboard,
        queryDashboard,
        tasks,
        queryTaskData,
        items,
        queryItemData,
        defaultAuditSubtitleMaker,
        userOwnData,
        users,
        queryUserData,
        queryUserOwnData,
        queryUserLockedToken,
        querySpecialApplication,
        userDayLocakedToken,
        regiserLanguages,
        platforms,
        isGetDataLoading,
        clearData,
        queryRegiserLanugages,
        queryPlatforms,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
