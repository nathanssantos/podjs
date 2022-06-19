import {
  Drawer as CharkraDrawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
} from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { useStore } from '../hooks';
import PlayListItem from './PlayListItem';

const PlayList = () => {
  const { playerStore } = useStore();

  const { playList, playListIsOpen, closePlayList } = playerStore;

  return (
    <CharkraDrawer isOpen={playListIsOpen} placement='right' onClose={closePlayList} size='lg'>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Playlist</DrawerHeader>

        <DrawerBody>
          <Flex direction='column' gap={6}>
            {playList.map((podcast) => (
              <PlayListItem key={podcast.enclosure.url} podcast={podcast} imageFallback='' />
            ))}
          </Flex>
        </DrawerBody>

        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </CharkraDrawer>
  );
};

export default observer(PlayList);
