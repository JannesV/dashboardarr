import {
  Box,
  Modal,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Button,
  ModalBody,
  VStack,
  HStack,
  FormHelperText,
  Alert,
  AlertIcon,
  useBoolean,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import {
  Service,
  ServiceFragmentDoc,
  ServiceType,
  useCreateServiceMutation,
  useGetServicesQuery,
  useUpdateServiceMutation,
} from "@dashboardarr/graphql";
import { useAtom } from "jotai";
import { FunctionComponent } from "react";
import { createServiceAtom, editServiceAtom } from "../../state/service";
import { Formik, FormikProps } from "formik";

import { FormControl, InputControl, SelectControl } from "formik-chakra-ui";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const EMPTY_SERVICE: Service = {
  icon: "",
  id: "",
  name: "",
  type: ServiceType.Other,
  url: "",
};

export const ServiceModal: FunctionComponent = () => {
  const [showApiKey, setShowApiKey] = useBoolean();
  const [editServiceId, setEditServiceId] = useAtom(editServiceAtom);
  const [isCreateService, setIsCreateService] = useAtom(createServiceAtom);

  const { data } = useGetServicesQuery();

  const handleClose = () => {
    setEditServiceId(undefined);
    setIsCreateService(false);
    setShowApiKey.off();
  };

  const service = data?.services.find((s) => s.id === editServiceId);

  const [updateService, { loading: updateServiceLoading, error: updateError }] =
    useUpdateServiceMutation();
  const [createService, { loading: createServiceLoading, error: createError }] =
    useCreateServiceMutation({
      update(cache, { data }) {
        if (data) {
          cache.modify({
            fields: {
              services(services: Service[] = []) {
                const newServiceRef = cache.writeFragment({
                  data: data.createService,
                  fragment: ServiceFragmentDoc,
                });

                return [...services, newServiceRef];
              },
            },
          });
        }
      },
    });

  const handleSubmit = async (service: Service) => {
    try {
      if (editServiceId) {
        await updateService({
          variables: {
            service: {
              icon: service.icon,
              name: service.name,
              type: service.type,
              url: service.url,
              apiKey: service.apiKey,
              externalUrl: service.externalUrl,
            },
            id: editServiceId,
          },
        });
      } else {
        await createService({
          variables: {
            service: {
              icon: service.icon,
              name: service.name,
              type: service.type,
              url: service.url,
              apiKey: service.apiKey,
              externalUrl: service.externalUrl,
            },
          },
        });
      }

      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal
      isOpen={!!editServiceId || isCreateService}
      size="2xl"
      onClose={handleClose}
    >
      <Formik
        initialValues={service || EMPTY_SERVICE}
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

                    <SelectControl label="Service Type:" name="type">
                      {Object.values(ServiceType)
                        .sort()
                        .map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                    </SelectControl>

                    <FormControl label="URL" name="url">
                      <InputControl
                        inputProps={{
                          placeholder: "URL",
                        }}
                        name="url"
                      />
                      <FormHelperText>
                        This URL will be used for internal requests and needs to
                        be only accessibly by the server where Dashboardarr runs
                      </FormHelperText>
                    </FormControl>
                    <FormControl label="External URL" name="externalUrl">
                      <InputControl
                        inputProps={{
                          placeholder: "External URL",
                        }}
                        name="externalUrl"
                      />
                      <FormHelperText>
                        This URL will be used when you want to upen the service
                        from within the browser
                      </FormHelperText>
                    </FormControl>
                    <InputGroup>
                      <InputControl
                        label="API Key"
                        inputProps={{
                          placeholder: "API Key",
                          type: showApiKey ? "text" : "password",
                        }}
                        name="apiKey"
                      />
                      <InputRightElement mt={8}>
                        <IconButton
                          aria-label="Toggle API Key visibilitys"
                          icon={showApiKey ? <ViewOffIcon /> : <ViewIcon />}
                          onClick={setShowApiKey.toggle}
                          variant="ghost"
                          size="sm"
                        />
                      </InputRightElement>
                    </InputGroup>
                  </VStack>
                </Box>
              </ModalBody>
              {(updateError || createError) && (
                <Alert status="error">
                  <AlertIcon />
                  An error occurred while processing the request.
                </Alert>
              )}
              <ModalFooter>
                <HStack>
                  <Button
                    isLoading={updateServiceLoading || createServiceLoading}
                    type="submit"
                    colorScheme="blue"
                  >
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
