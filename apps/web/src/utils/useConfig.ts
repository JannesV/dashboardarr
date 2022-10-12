import { useGetConfigQuery } from "@dashboardarr/graphql";

export const useConfig = () => {
  const { data } = useGetConfigQuery({ variables: { configName: "default" } });

  if (!data) {
    throw new Error("useConfig was used before the config was loaded.");
  }

  return data.config;
};
