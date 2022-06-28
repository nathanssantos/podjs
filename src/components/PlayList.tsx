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
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { useStore } from '../hooks';
import PlayListItem from './PlayListItem';

const PlayList = () => {
  const { playerStore } = useStore();

  const { playList, playListIsOpen, setPlayList, closePlayList } = playerStore;

  const reorder = (list: Podcast[], startIndex: number, endIndex: number) => {
    const result = list;
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const newState = reorder(playList, result.source.index, result.destination.index);

    setPlayList(newState);
  };

  return (
    <CharkraDrawer isOpen={playListIsOpen} placement='left' onClose={closePlayList} size='lg'>
      <DrawerOverlay backdropFilter='auto' backdropBlur='10px' />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Playlist</DrawerHeader>

        <DrawerBody>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='dropable'>
              {(provided) => (
                <Flex {...provided.droppableProps} ref={provided.innerRef} direction='column'>
                  {playList.map((podcast, index) => (
                    <Draggable
                      draggableId={podcast.enclosure.url}
                      index={index}
                      key={podcast.enclosure.url}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          style={provided.draggableProps.style}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <PlayListItem podcast={podcast} imageFallback='' />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Flex>
              )}
            </Droppable>
          </DragDropContext>
        </DrawerBody>

        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </CharkraDrawer>
  );
};

export default observer(PlayList);
