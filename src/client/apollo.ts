import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { GRAPHQL_SUBGRAPH_GOERLI_ABI } from "../utils/constants";

export const GoerliClient = new ApolloClient({
  uri: GRAPHQL_SUBGRAPH_GOERLI_ABI,
  cache: new InMemoryCache(),
});
