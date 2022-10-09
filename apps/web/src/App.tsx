import { ApolloProvider } from "@apollo/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";
import { MainPage } from "./components/MainPage/MainPage";
import { ServiceModal } from "./components/ServiceModal/ServiceModal";
import { SettingsDrawer } from "./components/SettingsDrawer/SettingsDrawer";
import { client } from "./utils/client";

const theme = extendTheme({
  styles: {
    global: () => ({}),
  },
});

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <>
          <ServiceModal />
          <SettingsDrawer />
          <MainPage />
        </>
      </ChakraProvider>
    </ApolloProvider>
  );
};
