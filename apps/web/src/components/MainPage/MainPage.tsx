import { Box } from "@chakra-ui/react";
import {
  createRef,
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
} from "react";

import { NavBar } from "../NavBar/NavBar";
import {
  ModulePositionInput,
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
import { AddModuleModal } from "../AddModuleModal/AddModuleModal";
import { GRID_COLUMNS } from "@dashboardarr/common";
import { useConfig } from "../../utils/useConfig";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MainPageProps {}

export const MainPage: FunctionComponent<MainPageProps> = () => {
  const grid = useRef<GridStack>();
  const refs = useRef<any>({});
  const { settings, modules } = useConfig();
  const [updateModulePositions] = useUpdateModulePositionsMutation();

  useColorModeTracker(settings.colorMode);

  if (Object.keys(refs.current).length !== modules.length) {
    modules.forEach(({ id }) => {
      refs.current[id] = refs.current[id] || createRef();
    });
  }

  const handleSave = useCallback(() => {
    const gridData = grid.current?.save(false) as ModulePositionInput[];

    updateModulePositions({
      variables: {
        configName: "default",
        positions: gridData.map((d) => ({
          id: d.id,
          x: d.x,
          y: d.y,
          h: d.h,
          w: d.w,
        })),
      },
    });
  }, [updateModulePositions]);

  useEffect(() => {
    grid.current = GridStack.init({
      cellHeight: 100,
      column: GRID_COLUMNS,
      margin: 10,
      float: true,
    });

    grid.current.removeAll(false);
    modules.forEach(({ id }) => {
      grid.current?.makeWidget(refs.current[id].current);
    });

    grid.current.on("change", handleSave);

    return () => {
      grid.current!.off("change");
    };
  }, [modules, handleSave]);

  return (
    <>
      <ServiceModal />
      <AddModuleModal />
      <SettingsDrawer />
      <Box w="100%">
        <NavBar />

        <Box className="grid-stack">
          {modules.map((item, i) => {
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
