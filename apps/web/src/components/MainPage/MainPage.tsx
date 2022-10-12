import { Box, Center, Spinner } from "@chakra-ui/react";
import {
  createRef,
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";

import { NavBar } from "../NavBar/NavBar";
import {
  ModulePositionInput,
  useGetConfigQuery,
  useGetServicesQuery,
  useUpdateModulePositionsMutation,
} from "@dashboardarr/graphql";
import { useColorModeTracker } from "../../utils/useColorModeTracker";
import { ServiceModal } from "../ServiceModal/ServiceModal";
import { SettingsDrawer } from "../SettingsDrawer/SettingsDrawer";

import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.min.css";
import "gridstack/dist/gridstack-extra.min.css";
import { GridStackItem } from "../GridStackItem/GridStackItem";
import { ButtonItemModuleBlock } from "../../modules/ButtonItem/ButtonItemModuleBlock";
import { UsernetModuleBlock } from "../../modules/Usenet/UsenetModuleBlock";
import { CalendarModuleBlock } from "../../modules/Calendar/CalendarModuleBlock";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MainPageProps {}

export const MainPage: FunctionComponent<MainPageProps> = () => {
  const grid = useRef<GridStack>();
  const refs = useRef<any>({});
  const { data } = useGetServicesQuery();
  const { data: configData, loading } = useGetConfigQuery({
    variables: { configName: "default" },
  });
  const [updateModulePositions] = useUpdateModulePositionsMutation();

  useColorModeTracker(configData?.config.settings.colorMode);

  const moduleItems = useMemo(
    () => configData?.config.modules || [],
    [configData?.config.modules]
  );

  if (Object.keys(refs.current).length !== data?.services.length) {
    moduleItems.forEach(({ id }) => {
      refs.current[id] = refs.current[id] || createRef();
    });
  }

  const handleSave = useCallback(() => {
    const gridData = grid.current?.save(false) as ModulePositionInput;

    updateModulePositions({
      variables: {
        configName: "default",
        positions: gridData,
      },
    });
  }, [updateModulePositions]);

  useEffect(() => {
    if (!data || loading) {
      return;
    }

    grid.current = GridStack.init({
      cellHeight: 100,
      column: 6,
      margin: 10,
      float: true,
    });

    grid.current.removeAll(false);
    moduleItems.forEach(({ id }) => {
      grid.current!.makeWidget(refs.current[id].current);
    });

    grid.current.on("change", handleSave);

    return () => {
      grid.current!.off("change");
    };
  }, [moduleItems, loading, data, handleSave]);

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <>
      <ServiceModal />
      <SettingsDrawer />
      <Box w="100%">
        <NavBar />

        <Box className="grid-stack">
          {moduleItems.map((item, i) => {
            let module = null;

            if (item.__typename === "ButtonModule") {
              module = <ButtonItemModuleBlock item={item} />;
            } else if (item.__typename === "UsenetModule") {
              module = <UsernetModuleBlock serviceId={item.service.id} />;
            } else if (item.__typename === "CalendarModule") {
              module = <CalendarModuleBlock />;
            }
            return (
              <GridStackItem
                key={item.id}
                id={item.id}
                position={item.position}
                ref={refs.current[item.id]}
                minHeight={item.__typename === "CalendarModule" ? 2 : 0}
                minWidth={item.__typename === "UsenetModule" ? 2 : 0}
              >
                {module}
              </GridStackItem>
            );
          })}
        </Box>
      </Box>
    </>
  );
};
