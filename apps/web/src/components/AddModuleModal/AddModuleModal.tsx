import { CalendarIcon } from "@chakra-ui/icons";
import {
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { ModuleType } from "@dashboardarr/common";
import {
  CalendarWeekStart,
  GetConfigDocument,
  GetConfigQuery,
  GetConfigQueryVariables,
  Service,
  ServiceType,
  useAddModuleItemMutation,
} from "@dashboardarr/graphql";
import { useAtom } from "jotai";
import { FunctionComponent, useCallback, useState } from "react";
import { GiButtonFinger } from "react-icons/gi";
import { TbWorldDownload } from "react-icons/tb";
import { createModuleItemAtom } from "../../state/module";
import { useConfig } from "../../utils/useConfig";
import { ServicesList } from "../SettingsDrawer/ServiceList/ServicesList";
import { ModuleTypeButton } from "./ModuleTypeButton";

interface AddModuleModalProps {}

export const AddModuleModal: FunctionComponent<AddModuleModalProps> = () => {
  const [isOpen, setIsOpen] = useAtom(createModuleItemAtom);
  const { name } = useConfig();
  const [moduleType, setModuleType] = useState<ModuleType>();

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setModuleType(undefined);
  }, [setIsOpen]);

  const [addModule] = useAddModuleItemMutation({
    update(cache, { data }) {
      if (data) {
        cache.updateQuery<GetConfigQuery, GetConfigQueryVariables>(
          {
            query: GetConfigDocument,
            variables: { configName: name },
          },
          () => ({
            config: data.addModuleItem,
          })
        );
      }
    },
  });

  const handleAddUsenetItem = useCallback(
    async (service: Service) => {
      await addModule({
        variables: {
          configName: name,
          module: {
            usenet: {
              serviceId: service.id,
            },
          },
        },
      });

      handleClose();
    },
    [addModule, name, handleClose]
  );

  const handleAddCalendar = useCallback(async () => {
    await addModule({
      variables: {
        configName: name,
        module: {
          calendar: {
            startOfWeek: CalendarWeekStart.Monday,
          },
        },
      },
    });

    handleClose();
  }, [addModule, name, handleClose]);

  const TypeSelector = () => {
    if (moduleType) {
      return null;
    }

    return (
      <HStack>
        <ModuleTypeButton
          icon={GiButtonFinger}
          label="Button"
          onClick={() => setModuleType(ModuleType.Button)}
        />
        <ModuleTypeButton
          icon={TbWorldDownload}
          label="Usenet"
          onClick={() => setModuleType(ModuleType.Usenet)}
        />
        <ModuleTypeButton
          icon={CalendarIcon}
          label="Calendar"
          onClick={handleAddCalendar}
        />
      </HStack>
    );
  };

  const handleAddButtonItem = useCallback(
    async (service: Service) => {
      await addModule({
        variables: {
          configName: name,
          module: {
            button: {
              serviceId: service.id,
            },
          },
        },
      });

      handleClose();
    },
    [addModule, name, handleClose]
  );

  return (
    <Modal size="lg" isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a new module to your Dahsboard</ModalHeader>
        <ModalBody>
          {moduleType === ModuleType.Button && (
            <ServicesList onItemClick={handleAddButtonItem} />
          )}
          {moduleType === ModuleType.Usenet && (
            <ServicesList
              onItemClick={handleAddUsenetItem}
              filterByType={ServiceType.Sabnzbd}
            />
          )}
          <TypeSelector />
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};
