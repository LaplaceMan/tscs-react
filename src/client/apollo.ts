import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import {
  GRAPHQL_SUBGRAPH_GOERLI_ABI,
  MUMBAI_SUBGRAPH_GOERLI_ABI,
  TEST_SUBGRAPH_API,
} from "../utils/constants";

export const GoerliClient = new ApolloClient({
  uri: GRAPHQL_SUBGRAPH_GOERLI_ABI,
  cache: new InMemoryCache(),
});

export const MumbaiClient = new ApolloClient({
  uri: MUMBAI_SUBGRAPH_GOERLI_ABI,
  cache: new InMemoryCache(),
});

export const TestClient = new ApolloClient({
  uri: TEST_SUBGRAPH_API,
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        merge: true,
      },
      Require: {
        merge: true,
      },
    },
  }),
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
    case 1337:
      client = TestClient;
    default:
      client = TestClient;
  }
  return client;
};
