import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { ModuleType } from "@dashboardarr/common";
import {
  GetConfigDocument,
  GetConfigQuery,
  GetConfigQueryVariables,
  ModuleItemInput,
  useAddModuleItemMutation,
} from "@dashboardarr/graphql";
import { useAtom } from "jotai";
import { FunctionComponent, useCallback, useState } from "react";
import { createModuleItemAtom } from "../../state/module";
import { useConfig } from "../../utils/useConfig";

import { Step, Steps, useSteps } from "chakra-ui-steps";
import { ModuleTypeSelector } from "./ModuleTypeSelector";
import { ButtonModuleStep } from "./ModuleSteps/ButtonModuleStep";
import { CalendarModuleStep } from "./ModuleSteps/CalendarModuleStep";
import { UsenetModuleStep } from "./ModuleSteps/UsenetModuleStep";
import { hasRequiredFields } from "../../utils/requiredModuleFields";

interface AddModuleModalProps {}

export const AddModuleModal: FunctionComponent<AddModuleModalProps> = () => {
  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const [isOpen, setIsOpen] = useAtom(createModuleItemAtom);
  const { name } = useConfig();
  const [moduleType, setModuleType] = useState<ModuleType>();
  const [moduleItemInput, setModuleItemInput] = useState<ModuleItemInput>({});

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setModuleType(undefined);
  }, [setIsOpen]);

  const [addModule, { loading }] = useAddModuleItemMutation({
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

  const handleAddModule = useCallback(async () => {
    await addModule({
      variables: {
        configName: name,
        module: moduleItemInput,
      },
    });
    handleClose();
  }, [addModule, handleClose, moduleItemInput, name]);

  const handleUpdateModuleInput = <K extends keyof ModuleItemInput>(
    type: K
  ) => {
    return (val: Partial<ModuleItemInput[K]>) => {
      setModuleItemInput({
        [type]: { ...(moduleItemInput[type] || {}), ...val },
      });
    };
  };

  const handleButtonClick = useCallback(
    (type: ModuleType) => {
      setModuleType(type);
      nextStep();
    },
    [nextStep]
  );

  const steps = [
    {
      label: "Step 1",
      description: "Choose your module type",
      content: () => <ModuleTypeSelector onButtonClick={handleButtonClick} />,
    },
    {
      label: "Step 2",
      description: "Customize your module",
      content: () => {
        switch (moduleType) {
          case ModuleType.Button:
            return (
              <ButtonModuleStep
                onChange={handleUpdateModuleInput("button")}
                module={moduleItemInput.button || {}}
              />
            );
          case ModuleType.Calendar:
            return (
              <CalendarModuleStep
                onChange={handleUpdateModuleInput("calendar")}
                module={moduleItemInput.calendar || {}}
              />
            );
          case ModuleType.Usenet:
            return (
              <UsenetModuleStep
                onChange={handleUpdateModuleInput("usenet")}
                module={moduleItemInput.usenet || {}}
              />
            );

          default:
            return null;
        }
      },
    },
  ];

  return (
    <Modal size="lg" isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a new module to your Dahsboard</ModalHeader>
        <ModalBody>
          <Flex flexDir="column" width="100%">
            <Steps size="sm" mb={6} activeStep={activeStep} colorScheme="blue">
              {steps.map(({ label, content, description }) => (
                <Step label={label} description={description} key={label}>
                  {content()}
                </Step>
              ))}
            </Steps>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Flex width="100%" justify="flex-end">
            {activeStep > 0 && (
              <Button mr={4} onClick={prevStep} size="sm" variant="ghost">
                Previous
              </Button>
            )}
            {activeStep === steps.length - 1 && (
              <Button
                disabled={
                  !moduleType || !hasRequiredFields(moduleItemInput, moduleType)
                }
                size="sm"
                colorScheme={"blue"}
                isLoading={loading}
                onClick={handleAddModule}
              >
                Finish
              </Button>
            )}
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
