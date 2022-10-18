import { Box } from "@chakra-ui/react";
import {
  createRef,
  FunctionComponent,
  ReactNode,
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
import {
  GRID_COLUMNS,
  ModuleSizeContraints,
  SizeConstraint,
} from "@dashboardarr/common";
import { useConfig } from "../../utils/useConfig";
import { useAtomValue } from "jotai";
import { editDashboardModulesAtom } from "../../state/module";

interface MainPageProps {}

export const MainPage: FunctionComponent<MainPageProps> = () => {
  const grid = useRef<GridStack>();
  const refs = useRef<any>({});
  const { settings, modules } = useConfig();
  const [updateModulePositions] = useUpdateModulePositionsMutation();
  const isEditting = useAtomValue(editDashboardModulesAtom);

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
      cellHeight: 120,
      column: GRID_COLUMNS,
      margin: 10,
      float: true,
      disableDrag: !isEditting,
      disableResize: !isEditting,
    });

    grid.current.removeAll(false);
    modules.forEach(({ id }) => {
      grid.current?.makeWidget(refs.current[id].current);
    });

    grid.current.on("change", handleSave);

    return () => {
      grid.current!.off("change");
    };
  }, [modules, handleSave, isEditting]);

  useEffect(() => {
    if (isEditting) {
      grid.current?.enable();
    } else {
      grid.current?.disable();
    }
  }, [isEditting]);

  return (
    <>
      <ServiceModal />
      <AddModuleModal />
      <SettingsDrawer />
      <Box w="100%">
        <NavBar />

        <Box className="grid-stack">
          {modules.map((item, i) => {
            let module: ReactNode = null;
            let constraints: Partial<SizeConstraint> = {};

            switch (item.__typename) {
              case "ButtonModule":
                module = <ButtonItemModuleBlock item={item} />;
                constraints = ModuleSizeContraints.button;
                break;

              case "CalendarModule":
                module = <CalendarModuleBlock weekStart={item.startOfWeek} />;
                constraints = ModuleSizeContraints.calendar;
                break;

              case "UsenetModule":
                module = <UsernetModuleBlock serviceId={item.service.id} />;
                constraints = ModuleSizeContraints.usenet;
                break;
            }

            return (
              <GridStackItem
                key={item.id}
                id={item.id}
                modulePosition={item.position}
                ref={refs.current[item.id]}
                {...constraints}
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
