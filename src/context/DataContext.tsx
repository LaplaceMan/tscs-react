import React, { useState } from "react";
import {
  ListTask,
  ListItem,
  ListUser,
  Require,
  ListToken,
  ListModule,
  User,
  ListPlatform,
  ListAudit,
  OwnTaskCard,
  OwnItemCard,
  OwnAuditCard,
  ListRequire,
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
  QueryRequires,
  QueryPlatforms,
  QuerySpecialTask,
  QuerySpecialItem,
  QuerySpecialUser,
  QueryUserOwnItems,
  QueryUserOwnTasks,
  QueryUserOwnAudits,
  QueryWhitelistedTokens,
  QueryWhitelistedAuditAndDetectionModules,
  QuerySpecialRequireWithTasks,
  QuerySpecialRequireWithItems,
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
  const [requires, setRequires] = useState<Require[] | null>([]);
  const [platforms, setPlatforms] = useState<ListPlatform[] | null>([]);
  const { chain } = getNetwork();

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

  const queryTasks = async (
    first: number,
    skip: number,
    require: string
  ): Promise<ListTask[] | null | undefined> => {
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
              audit: item.auditModule.id,
              detection: item.detectionModule.id,
              state: item.state,
            });
          });
          setIsGetDataLoading(false);
          return taskArray;
        }
        setIsGetDataLoading(false);
        return null;
      } catch (err) {
        console.log("Error fetching data: ", err);
        setIsGetDataLoading(false);
        message.error("Error: " + err);
      }
    }
  };

  const queryItems = async (
    first: number,
    skip: number,
    require: string
  ): Promise<ListItem[] | null | undefined> => {
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
          setIsGetDataLoading(false);
          return itemArray;
        }
        setIsGetDataLoading(false);
        return null;
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

  const queryUsers = async (
    first: number,
    skip: number
  ): Promise<ListUser[] | null | undefined> => {
    if (chain && SUPPORT_NETWORK.includes(chain.id)) {
      setIsGetDataLoading(true);
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
          setIsGetDataLoading(false);
          return userArray;
        }
        setIsGetDataLoading(true);
        return null;
      } catch (err) {
        console.log("Error fetching data: ", err);
        setIsGetDataLoading(false);
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
            requireId: getTask.requires.id,
            payment: getTask.strategy,
            currency: getTask.currency.symbol,
            amount: getTask.amount,
            start: getTask.start,
            deadline: getTask.deadline,
            source: getTask.source,
            audit: getTask.auditModule.id + getTask.auditModule.name,
            detection:
              getTask.detectionModule.id + getTask.detectionModule.name,
            state: getTask.state,
            uploads: getTask.itemCount,
            adopted:
              getTask.adopted || typeof (getTask.adopted != undefined)
                ? getTask.adopted.id
                : "None",
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
            audit: getItem.task.auditModule.id + getItem.task.auditModule.name,
            detection:
              getItem.task.detectionModule.id +
              getItem.task.detectionModule.name,
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

  const querySpecialUserOwnTasks = async (
    id: string
  ): Promise<OwnTaskCard[] | null | undefined> => {
    if (chain && SUPPORT_NETWORK.includes(chain.id)) {
      setIsGetDataLoading(true);
      try {
        const data: any = await Client(chain.id).query({
          query: gql(QueryUserOwnTasks),
          variables: {
            id,
          },
        });
        if (data && data.data && data.data.user && data.data.user.tasks) {
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
          return taskArray;
        }
        setIsGetDataLoading(false);
        return null;
      } catch (error) {}
    }
  };

  const querySpecialUserOwnItems = async (
    id: string
  ): Promise<OwnItemCard[] | null | undefined> => {
    if (chain && SUPPORT_NETWORK.includes(chain.id)) {
      setIsGetDataLoading(true);
      try {
        const data: any = await Client(chain.id).query({
          query: gql(QueryUserOwnItems),
          variables: {
            id,
          },
        });
        if (data && data.data && data.data.user && data.data.user.itemsOwner) {
          const getItems = data.data.user.itemsOwner;
          const itemArray = new Array<OwnItemCard>();
          getItems.map((item: any) => {
            itemArray.push({
              id: item.id,
              source: item.cid,
              taskId: item.task.id,
              boxId: item.task.box.orderId,
              state: item.state,
            });
          });
          setIsGetDataLoading(false);
          return itemArray;
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

  const querySpecialUserOwnAudits = async (
    id: string
  ): Promise<OwnAuditCard[] | null | undefined> => {
    if (chain && SUPPORT_NETWORK.includes(chain.id)) {
      setIsGetDataLoading(true);
      try {
        const data: any = await Client(chain.id).query({
          query: gql(QueryUserOwnAudits),
          variables: {
            id,
          },
        });
        if (data && data.data && data.data.user && data.data.user.audits) {
          const getAudits = data.data.user.audits;
          const auditArray = new Array<OwnAuditCard>();
          getAudits.map((item: any) => {
            auditArray.push({
              itemId: item.item.id,
              taskId: item.item.task.id,
              source: item.item.cid,
              result: item.attitude,
              state: item.item.state,
            });
          });
          setIsGetDataLoading(false);
          return auditArray;
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
        } else {
        }
      } catch (err) {
        console.log("Error fetching data: ", err);
        message.error("Error: " + err);
      }
    }
  };

  const queryRequires = async () => {
    if (chain && SUPPORT_NETWORK.includes(chain.id)) {
      try {
        const data = await Client(chain.id).query({
          query: gql(QueryRequires),
        });
        if (data && data.data && data.data.requires) {
          const getReuires = data.data.requires;
          const requireArray = new Array<Require>();
          getReuires.map((item: any) => {
            requireArray.push({
              id: item.id,
              name: item.notes,
            });
          });
          setRequires(requireArray);
        }
      } catch (err) {
        console.log("Error fetching data: ", err);
        message.error("Error: " + err);
      }
    }
  };

  const queryWhitelistedTokens = async (): Promise<
    ListToken[] | null | undefined
  > => {
    if (chain && SUPPORT_NETWORK.includes(chain.id)) {
      try {
        const data = await Client(chain.id).query({
          query: gql(QueryWhitelistedTokens),
        });
        if (data && data.data && data.data.whitelistedTokens) {
          const getTokens = data.data.whitelistedTokens;
          const tokenArray = new Array<ListToken>();
          getTokens.map((item: any) => {
            tokenArray.push({
              key: item.id,
              symbol: item.symbol,
              decimal: item.decimal,
            });
          });
          return tokenArray;
        }
        return null;
      } catch (err) {
        console.log("Error fetching data: ", err);
        message.error("Error: " + err);
      }
    }
  };

  const queryWhitelistedAuditAndDetectionModules = async (): Promise<
    | { audit: null | ListModule[]; detection: null | ListModule[] }
    | null
    | undefined
  > => {
    if (chain && SUPPORT_NETWORK.includes(chain.id)) {
      try {
        const data = await Client(chain.id).query({
          query: gql(QueryWhitelistedAuditAndDetectionModules),
        });
        if (data && data.data) {
          const moduleArray: {
            audit: null | ListModule[];
            detection: null | ListModule[];
          } = { audit: null, detection: null };
          if (data.data.whitelistedAuditModules) {
            const getAuditModules = data.data.whitelistedAuditModules;
            const aduitModuleArray = new Array<ListModule>();
            getAuditModules.map((item: any) => {
              aduitModuleArray.push({
                key: item.id,
                name: item.name,
              });
            });
            moduleArray.audit = aduitModuleArray;
          }
          if (data.data.whitelistedDetectionModules) {
            const getDetectionModules = data.data.whitelistedDetectionModules;
            const detectionModuleArray = new Array<ListModule>();
            getDetectionModules.map((item: any) => {
              detectionModuleArray.push({
                key: item.id,
                name: item.name,
              });
            });
            moduleArray.detection = detectionModuleArray;
          }
          return moduleArray;
        }
        return null;
      } catch (err) {
        console.log("Error fetching data: ", err);
        message.error("Error: " + err);
      }
    }
  };

  const querySpecialRequire = async (
    filter: string,
    id: string
  ): Promise<
    | { details: ListRequire; entities: (ListTask | ListItem)[] }
    | null
    | undefined
  > => {
    if (chain && SUPPORT_NETWORK.includes(chain.id)) {
      try {
        const data = await Client(chain.id).query({
          query: gql(
            filter == "Tasks"
              ? QuerySpecialRequireWithTasks
              : QuerySpecialRequireWithItems
          ),
          variables: {
            id,
          },
        });
        if (data && data.data && data.data.require) {
          const require = data.data.require;
          const details: ListRequire = {
            key: require.id,
            id: require.id,
            name: require.notes,
            time: require.time,
            registrant: require.registrant,
            taskCount: require.taskCount,
            itemCount: require.itemCount,
          };
          const dataArray = new Array<ListItem | ListTask>();
          if (filter == "Tasks" && require.tasks) {
            const data = require.tasks;
            data.map((item: any) => {
              dataArray.push({
                key: item.id,
                id: item.id,
                require: item.requires.notes,
                payment: item.strategy,
                currency: item.currency.symbol,
                amount: item.amount,
                audit: item.auditModule.id,
                detection: item.detectionModule.id,
                state: item.state,
              });
            });
          } else if (require.items) {
            const data = require.items;
            data.map((item: any) => {
              dataArray.push({
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
          }
          return { details: details, entities: dataArray };
        }
        return null;
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
        queryTasks,
        queryItems,
        queryUsers,
        queryUserLockedToken,
        querySpecialTask,
        requires,
        platforms,
        isGetDataLoading,
        queryRequires,
        queryPlatforms,
        querySpecialItem,
        querySpecialUser,
        querySpecialUserOwnItems,
        querySpecialUserOwnTasks,
        querySpecialUserOwnAudits,
        querySpecialRequire,
        queryWhitelistedTokens,
        queryWhitelistedAuditAndDetectionModules,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
