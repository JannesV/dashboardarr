import { ApolloProvider } from "@apollo/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";
import { MainPage } from "./components/MainPage/MainPage";
import { ServiceModal } from "./components/ServiceModal/ServiceModal";
import { client } from "./utils/client";

const theme = extendTheme({
  styles: {
    global: () => ({}),
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <>
          <ServiceModal />
          <MainPage />
        </>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
