import { ApolloClient, InMemoryCache, split } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { Kind, OperationTypeNode } from "graphql";

const wsLink = new GraphQLWsLink(
  createClient({
    url: `${window.location.protocol.includes('https') ? 'wss' : 'ws'}://${window.location.host}/graphql`,
  })
);

const httpLink = createUploadLink({
  uri: "graphql",
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);

    return (
      definition.kind === Kind.OPERATION_DEFINITION &&
      definition.operation === OperationTypeNode.SUBSCRIPTION
    );
  },
  wsLink,
  httpLink
);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});
