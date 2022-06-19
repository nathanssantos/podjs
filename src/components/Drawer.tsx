import {
  Button,
  Drawer as CharkraDrawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  useColorMode,
} from '@chakra-ui/react';
import { observer } from 'mobx-react';

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Drawer = ({ isOpen, onClose }: DrawerProps) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <CharkraDrawer isOpen={isOpen} placement='left' onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>PodJS</DrawerHeader>

        <DrawerBody></DrawerBody>

        <DrawerFooter>
          <Flex alignItems='center' gap={3}>
            Set theme
            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? 'Dark' : 'Light'}
            </Button>
          </Flex>
        </DrawerFooter>
      </DrawerContent>
    </CharkraDrawer>
  );
};

export default observer(Drawer);
