import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import {
  GRAPHQL_SUBGRAPH_GOERLI_ABI,
  MUMBAI_SUBGRAPH_GOERLI_ABI,
} from "../utils/constants";

export const GoerliClient = new ApolloClient({
  uri: GRAPHQL_SUBGRAPH_GOERLI_ABI,
  cache: new InMemoryCache(),
});

export const MumbaiClient = new ApolloClient({
  uri: MUMBAI_SUBGRAPH_GOERLI_ABI,
  cache: new InMemoryCache(),
});

export const Client = (
  chainId: number
): ApolloClient<NormalizedCacheObject> => {
  let client;
  switch (chainId) {
    case 5:
      client = GoerliClient;
      break;
    case 80001:
      client = MumbaiClient;
      break;
    default:
      client = MumbaiClient;
  }
  return client;
};
