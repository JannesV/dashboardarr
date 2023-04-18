import { ApolloProvider } from "@apollo/client";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Center,
  ChakraProvider,
  Code,
  extendTheme,
  Spinner,
} from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { useGetConfigQuery } from "@dashboardarr/graphql";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { StepsStyleConfig as Steps } from "chakra-ui-steps";
import { FunctionComponent, ReactNode } from "react";
import { MainPage } from "./components/MainPage/MainPage";
import { client } from "./utils/client";

const theme = extendTheme({
  styles: {
    global: (props: any) => ({
      ".grid-stack-placeholder .placeholder-content": {
        borderRadius: 10,
      },
      body: {
        bg: mode("white", "gray.900")(props),
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
  const { loading, error } = useGetConfigQuery({
    variables: { configName: "default" },
  });

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center height="100vh">
        <Alert
          status="error"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          m={6}
          borderRadius="xl"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            An error occurred while fetching queue.
          </AlertTitle>
          <AlertDescription mt={4}>
            <Code>{error.message}</Code>
          </AlertDescription>
        </Alert>
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
