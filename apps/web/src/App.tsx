import { ApolloProvider } from "@apollo/client";
import { Center, ChakraProvider, extendTheme, Spinner } from "@chakra-ui/react";
import React, { FunctionComponent, ReactNode } from "react";
import { MainPage } from "./components/MainPage/MainPage";
import { client } from "./utils/client";
import { StepsStyleConfig as Steps } from "chakra-ui-steps";

import {} from "@chakra-ui/theme-tools";
import { useGetConfigQuery } from "@dashboardarr/graphql";
const theme = extendTheme({
  styles: {
    global: () => ({
      ".grid-stack-placeholder .placeholder-content": {
        borderRadius: 10,
      },
    }),
  },
  components: {
    Steps,
  },
});

// TODO CLEANUP
export const LoadWrapper: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const { data: configData, loading } = useGetConfigQuery({
    variables: { configName: "default" },
  });

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return <>{children}</>;
};

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <LoadWrapper>
          <MainPage />
        </LoadWrapper>
      </ChakraProvider>
    </ApolloProvider>
  );
};
