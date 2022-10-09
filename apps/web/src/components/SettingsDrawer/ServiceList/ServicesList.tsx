import { VStack } from "@chakra-ui/react";
import { useGetServicesQuery } from "@dashboardarr/graphql";
import { FunctionComponent } from "react";
import { ServiceListItem } from "./ServiceListItem";

interface ServicesListProps {}

export const ServicesList: FunctionComponent<ServicesListProps> = () => {
  const { data } = useGetServicesQuery();

  return (
    <VStack>
      {data?.services.map((service) => (
        <ServiceListItem key={service.id} service={service} />
      ))}
    </VStack>
  );
};
