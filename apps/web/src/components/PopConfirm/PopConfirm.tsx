import {
  Button,
  ButtonGroup,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverProps,
  PopoverTrigger,
  useBoolean,
} from "@chakra-ui/react";
import React, {
  Children,
  cloneElement,
  FunctionComponent,
  ReactNode,
  useCallback,
  DOMAttributes,
  MouseEventHandler,
} from "react";
import { useRef } from "react";

interface PopConfirmProps extends PopoverProps {
  children: ReactNode;
}

export const PopConfirm: FunctionComponent<PopConfirmProps> = ({
  children,
  ...popOverProps
}) => {
  const [isOpen, setIsOpen] = useBoolean(false);
  const onClickRef = useRef<MouseEventHandler<any>>();
  const child: any = Children.only(children);

  const getTriggerProps = useCallback(
    (props: DOMAttributes<any>) => {
      if (props.onClick) {
        onClickRef.current = props.onClick;
      }

      return {
        ...props,
        onClick: setIsOpen.toggle,
      };
    },
    [setIsOpen.toggle]
  );

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      setIsOpen.off();

      onClickRef.current?.(e);
    },
    [setIsOpen]
  );

  return (
    <Popover
      isOpen={isOpen}
      onClose={setIsOpen.off}
      size="sm"
      {...popOverProps}
    >
      <PopoverTrigger>
        {cloneElement(child, getTriggerProps(child.props))}
      </PopoverTrigger>
      <PopoverContent w={56}>
        <PopoverArrow />
        <PopoverBody>Are you sure?</PopoverBody>
        <PopoverFooter gap={2} display="flex" justifyContent="flex-end">
          <ButtonGroup size="xs">
            <Button onClick={setIsOpen.off} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleClick} colorScheme="red">
              Confirm
            </Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};
