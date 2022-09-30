import {
  Box,
  FormControl,
  FormLabel,
  Modal,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Button,
  ModalBody,
  VStack,
  HStack,
} from "@chakra-ui/react";
import {
  Service,
  ServiceType,
  useGetServicesQuery,
  useUpdateServiceMutation,
} from "@dashboardarr/graphql";
import { useAtom } from "jotai";
import { FunctionComponent } from "react";
import { editServiceAtom } from "../../state/service";
import { Formik, FormikProps } from "formik";

import { InputControl, SelectControl } from "formik-chakra-ui";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ServiceModalProps {}

export const ServiceModal: FunctionComponent<ServiceModalProps> = () => {
  const [editServiceId, set] = useAtom(editServiceAtom);

  const { data } = useGetServicesQuery();

  const handleClose = () => {
    set(undefined);
  };

  const service = data?.services.find((s) => s.id === editServiceId);

  const [updateConfig, { loading }] = useUpdateServiceMutation();

  const handleSubmit = async (service: Service) => {
    try {
      await updateConfig({
        variables: {
          service: {
            icon: service.icon,
            name: service.name,
            type: service.type,
            url: service.url,
            apiKey: service.apiKey,
          },
          id: editServiceId!,
        },
      });

      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal isOpen={!!editServiceId} size="2xl" onClose={handleClose}>
      <Formik
        initialValues={service!}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {(props: FormikProps<Service>) => (
          <form onSubmit={props.handleSubmit}>
            <ModalOverlay />
            <ModalContent borderRadius="2xl">
              <ModalBody>
                <Box m={4}>
                  <VStack spacing={8}>
                    <InputControl
                      label="Name"
                      inputProps={{
                        placeholder: "Name",
                      }}
                      name="name"
                    />

                    <InputControl
                      label="Icon"
                      inputProps={{
                        placeholder: "Icon",
                      }}
                      name="icon"
                    />

                    <FormControl>
                      <FormLabel>Service Type:</FormLabel>
                      <SelectControl name="type">
                        {Object.values(ServiceType).map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </SelectControl>
                    </FormControl>

                    <InputControl
                      label="URL"
                      inputProps={{
                        placeholder: "URL",
                      }}
                      name="url"
                    />
                    <InputControl
                      label="API Key"
                      inputProps={{
                        placeholder: "API Key",
                        type: "password",
                      }}
                      name="apiKey"
                    />
                  </VStack>
                </Box>
              </ModalBody>

              <ModalFooter>
                <HStack>
                  <Button isLoading={loading} type="submit" colorScheme="blue">
                    Submit
                  </Button>
                </HStack>
              </ModalFooter>
            </ModalContent>
          </form>
        )}
      </Formik>
    </Modal>
  );
};
