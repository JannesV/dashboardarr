import {
  FormControl,
  FormLabel,
  InputGroup,
  FormErrorMessage,
  Image,
  Center,
  Icon,
  Text,
  Box,
} from "@chakra-ui/react";
import React, { FunctionComponent, useCallback, useRef, useState } from "react";

import { FcAddImage } from "react-icons/fc";

interface FileUploadProps {
  label: string;
  name: string;
  acceptedFileTypes: string;
  value?: string;
  onChange(file: File): void;
}

export const FileUpload: FunctionComponent<FileUploadProps> = ({
  label,
  name,
  acceptedFileTypes,
  value,
  onChange,
}) => {
  const [image, setImage] = useState<string | undefined>(value);
  const invalid = "";
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.currentTarget.files;

      if (files && files[0]) {
        onChange(files[0]);
        setImage(URL.createObjectURL(files[0]));
      }
    },
    [onChange]
  );

  return (
    <FormControl isRequired>
      <FormLabel htmlFor="writeUpFile">{label}</FormLabel>
      <InputGroup>
        <input
          type="file"
          accept={acceptedFileTypes}
          name={name}
          ref={inputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        ></input>
        {!image ? (
          <Center
            onClick={() => inputRef.current?.click()}
            w="full"
            borderColor="gray.300"
            _hover={{
              borderColor: "gray.400",
            }}
            borderRadius="base"
            transition="border-color .2s"
            borderWidth={1}
            borderStyle="dashed"
            p={4}
            flexDir="column"
            cursor="pointer"
          >
            <Icon fontSize="60px" as={FcAddImage} />
            <Text mt={4}>Upload an image</Text>
            <Text mt={2} color="gray.500" fontSize=".8em">
              .png, .jpg
            </Text>
          </Center>
        ) : (
          <Box
            onClick={() => inputRef.current?.click()}
            cursor="pointer"
            h={32}
            borderWidth={1}
            borderColor="gray.200"
            borderRadius="md"
            p={2}
            transition=".2s"
            _hover={{
              borderColor: "gray.300",
            }}
          >
            <Image objectFit="contain" h="full" src={image} />
          </Box>
        )}
      </InputGroup>
      <FormErrorMessage>{invalid}</FormErrorMessage>
    </FormControl>
  );
};
