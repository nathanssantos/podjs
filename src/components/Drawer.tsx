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

import { useStore } from '../hooks';

const Drawer = () => {
  const { uiStore } = useStore();
  const { colorMode, toggleColorMode } = useColorMode();
  const { drawerIsOpen, closeDrawer } = uiStore;

  return (
    <CharkraDrawer isOpen={drawerIsOpen} placement='left' onClose={closeDrawer}>
      <DrawerOverlay backdropFilter='auto' backdropBlur='10px' />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>PodJS</DrawerHeader>

        <DrawerBody></DrawerBody>

        <DrawerFooter>
          <Flex align='center' gap={3}>
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
