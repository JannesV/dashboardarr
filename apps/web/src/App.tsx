import { ApolloProvider } from "@apollo/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";
import { MainPage } from "./components/MainPage/MainPage";
import { client } from "./utils/client";

import {} from "@chakra-ui/theme-tools";
const theme = extendTheme({
  styles: {
    global: () => ({
      ".grid-stack-placeholder .placeholder-content": {
        borderRadius: 15,
      },
    }),
  },
});

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <MainPage />
      </ChakraProvider>
    </ApolloProvider>
  );
};
