import { VStack } from "@chakra-ui/react";
import {
  Service,
  ServiceType,
  useGetServicesQuery,
} from "@dashboardarr/graphql";
import { FunctionComponent, ReactNode } from "react";
import { ServiceListItem } from "./ServiceListItem";

interface ServicesListProps {
  onItemClick?(item: Service): void;
  addon?(item: Service): ReactNode;
  filterByType?: ServiceType;
}

export const ServicesList: FunctionComponent<ServicesListProps> = ({
  addon,
  onItemClick,
  filterByType,
}) => {
  const { data } = useGetServicesQuery();

  const items = filterByType
    ? data?.services.filter((i) => i.type === filterByType)
    : data?.services;

  return (
    <VStack>
      {items?.map((service) => (
        <ServiceListItem
          key={service.id}
          service={service}
          addon={addon}
          onClick={onItemClick}
        />
      ))}
    </VStack>
  );
};
