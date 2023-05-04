import React, { useState } from "react";
import {
  ListTask,
  ListItem,
  ListUser,
  User,
  ListPlatform,
  ListAudit,
  OwnTaskCard,
} from "../types/baseTypes";
import { DataContent } from "../types/contextTypes";
import { Task, Item, Dashboard } from "../types/baseTypes";
import { MURMES_PROTOCOL } from "../utils/contracts";
import {
  QueryHome,
  QueryTasks,
  QueryItems,
  QueryUsers,
  QueryLockedToken,
  QueryLanguages,
  QueryPlatforms,
  QuerySpecialTask,
  QuerySpecialItem,
  QuerySpecialUser,
} from "../utils/graphql/graphqls";
import { getAccount, getNetwork } from "@wagmi/core";
import { SUPPORT_NETWORK } from "../utils/constants";
import { gql } from "@apollo/client";
import { Client } from "../client/apollo";
import { message } from "antd";

export const DataContext = React.createContext<DataContent>({} as DataContent);
export const DataProvider = ({ children }: any) => {
  const account = getAccount();
  const [isGetDataLoading, setIsGetDataLoading] = useState<boolean>(false);
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [tasks, setTasks] = useState<ListTask[] | null>([]);
  const [items, setItems] = useState<ListItem[] | null>([]);
  const [users, setUsers] = useState<ListUser[] | null>([]);
  const [regiserLanguages, setRegiserLanguages] = useState<
    { id: string; notes: string }[]
  >([]);
  const [platforms, setPlatforms] = useState<ListPlatform[] | null>([]);
  const [userDayLocakedToken, setUserDayLocakedToken] = useState("*");
  const { chain } = getNetwork();

  const clearData = () => {
    setItems(null);
    setTasks(null);
    setDashboard(null);
  };

  const queryDashboard = async () => {
    if (chain && SUPPORT_NETWORK.includes(chain.id)) {
      try {
        const data = await Client(chain.id).query({
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
      } catch (err) {
        console.log("Error fetching data: ", err);
        message.error("Error: " + err);
      }
    }
  };

  const queryTasks = async (first: number, skip: number, require: string) => {
    if (chain && SUPPORT_NETWORK.includes(chain.id)) {
      setIsGetDataLoading(true);
      try {
        const data = await Client(chain.id).query({
          query: gql(require == "0" ? QueryTasks : ""),
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

  const queryItems = async (first: number, skip: number, require: string) => {
    if (chain && SUPPORT_NETWORK.includes(chain.id)) {
      setIsGetDataLoading(true);
      try {
        const data = await Client(chain.id).query({
          query: gql(require == "0" ? QueryItems : ""),
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
    }
  };

  const queryPlatforms = async () => {
    if (chain && SUPPORT_NETWORK.includes(chain.id)) {
      try {
        const data = await Client(chain.id).query({
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

  const queryUsers = async (first: number, skip: number) => {
    if (chain && SUPPORT_NETWORK.includes(chain.id)) {
      try {
        const data = await Client(chain.id).query({
          query: gql(QueryUsers),
          variables: {
            first: first,
            skip: skip,
          },
        });
        if (data && data.data) {
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
    }
  };

  const querySpecialTask = async (
    id: string
  ): Promise<{ task: Task; items: ListItem[] | null } | null | undefined> => {
    if (chain && SUPPORT_NETWORK.includes(chain.id)) {
      setIsGetDataLoading(true);
      try {
        const data: any = await Client(chain.id).query({
          query: gql(QuerySpecialTask),
          variables: {
            id,
          },
        });
        if (data && data.data && data.data.task) {
          const getTask = data.data.task;
          const task: Task = {
            applicant: getTask.applicant.id,
            platform: getTask.box.platform.name,
            boxId: getTask.box.orderId,
            require: getTask.requires.notes,
            payment: getTask.strategy,
            currency: getTask.currency.symbol,
            amount: getTask.amount,
            start: getTask.start,
            deadline: getTask.deadline,
            source: getTask.source,
            audit: getTask.auditModule,
            detection: getTask.detectionModule,
            state: getTask.state,
            uploads: getTask.itemCount,
            adopted: getTask.adopted ? getTask.adopted : "None",
          };
          /***********************/
          const getItems = data.data.task.items;
          const itemArray = new Array<ListItem>();
          getItems.map((item: any) => {
            itemArray.push({
              key: item.id,
              id: item.id,
              task: id,
              require: item.requires.notes,
              support: item.supporterCount,
              oppose: item.opponentCount,
              state: item.state,
              source: item.cid,
              fingerprint: item.fingerprint,
            });
          });
          setIsGetDataLoading(false);
          return { task: task, items: itemArray };
        } else {
          setIsGetDataLoading(false);
          return null;
        }
      } catch (err) {
        console.log("Error fetching data: ", err);
        message.error("Error: " + err);
        setIsGetDataLoading(false);
      }
    }
  };

  const querySpecialItem = async (
    id: string
  ): Promise<{ item: Item; audits: ListAudit[] | null } | null | undefined> => {
    if (chain && SUPPORT_NETWORK.includes(chain.id)) {
      setIsGetDataLoading(true);
      try {
        const data: any = await Client(chain.id).query({
          query: gql(QuerySpecialItem),
          variables: {
            id,
          },
        });
        if (data && data.data && data.data.item) {
          const getItem = data.data.item;
          const item: Item = {
            taskId: getItem.task.id,
            maker: getItem.maker.id,
            support: getItem.supporterCount,
            opponent: getItem.opponentCount,
            source: getItem.cid,
            fingerprint: getItem.fingerprint,
            time: getItem.time,
            require: getItem.requires.notes,
            taskSource: getItem.task.source,
            audit: getItem.task.auditModule,
            detection: getItem.task.detectionModule,
            versions: getItem.versionCount,
            state: getItem.state,
          };
          /***********************/
          const getAudits = data.data.item.audits;
          const auditArray = new Array<ListAudit>();
          getAudits.map((item: any) => {
            auditArray.push({
              key: item.auditor.userId,
              id: item.auditor.userId,
              auditor: item.auditor.id,
              reputation: item.auditor.reputation,
              result: item.attitude,
              time: item.time,
            });
          });
          setIsGetDataLoading(false);
          return { item: item, audits: auditArray };
        } else {
          setIsGetDataLoading(false);
          return null;
        }
      } catch (err) {
        console.log("Error fetching data: ", err);
        message.error("Error: " + err);
        setIsGetDataLoading(false);
      }
    }
  };

  const querySpecialUser = async (
    id: string
  ): Promise<
    { item: User; tasks: OwnTaskCard[] | null } | null | undefined
  > => {
    if (chain && SUPPORT_NETWORK.includes(chain.id)) {
      setIsGetDataLoading(true);
      try {
        const data: any = await Client(chain.id).query({
          query: gql(QuerySpecialUser),
          variables: {
            id,
          },
        });
        if (data && data.data && data.data.user) {
          const getUser = data.data.user;
          const user: User = {
            id: getUser.id,
            reputation: getUser.reputation,
            deposit: getUser.deposit,
            guard: getUser.guard ? getUser.guard : "None",
            join: getUser.time,
            userId: getUser.userId,
          };
          /***********************/
          const getTasks = data.data.user.tasks;
          const taskArray = new Array<OwnTaskCard>();
          getTasks.map((item: any) => {
            taskArray.push({
              platform: item.box.platform.name,
              source: item.source,
              taskId: item.id,
              boxId: item.box.orderId,
              state: item.state,
            });
          });
          setIsGetDataLoading(false);
          return { item: user, tasks: taskArray };
        }
        setIsGetDataLoading(false);
        return null;
      } catch (err) {
        console.log("Error fetching data: ", err);
        message.error("Error: " + err);
        setIsGetDataLoading(false);
      }
    }
  };

  const queryUserLockedToken = async (platform: string, day: number) => {
    if (chain && SUPPORT_NETWORK.includes(chain.id)) {
      try {
        const data = await Client(chain.id).query({
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
    }
  };

  const queryRegiserLanugages = async () => {
    if (chain && SUPPORT_NETWORK.includes(chain.id)) {
      try {
        const data = await Client(chain.id).query({
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

  return (
    <DataContext.Provider
      value={{
        dashboard,
        queryDashboard,
        tasks,
        queryTasks,
        items,
        queryItems,
        users,
        queryUsers,
        queryUserLockedToken,
        querySpecialTask,
        userDayLocakedToken,
        regiserLanguages,
        platforms,
        isGetDataLoading,
        clearData,
        queryRegiserLanugages,
        queryPlatforms,
        querySpecialItem,
        querySpecialUser,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
