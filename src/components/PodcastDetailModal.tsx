import {
  Badge,
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { observer } from 'mobx-react';
import React, { useRef } from 'react';

import { useStore } from '../hooks';
import { formatDuration } from '../utils';

type PodcastDetailModal = {
  podcast: Podcast;
  isOpen: boolean;
  onClose: () => void;
};

const PodcastDetailModal = ({ podcast, isOpen, onClose }: PodcastDetailModal) => {
  const { uiStore, collectionStore } = useStore();
  const btnRef = useRef(null);

  const { detail } = collectionStore;

  const { title, link, isoDate, enclosure, content, itunes } = podcast;

  return (
    <Modal
      onClose={onClose}
      finalFocusRef={btnRef}
      isOpen={isOpen}
      scrollBehavior='outside'
      size='xl'
    >
      <ModalOverlay backdropFilter='auto' backdropBlur='10px' />
      <ModalContent>
        <ModalHeader>
          {!!detail?.collectionName?.length ? detail?.collectionName : ''}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex gap={4} direction='column' alignSelf='center' align='center'>
            <Flex
              borderWidth='1px'
              borderRadius='lg'
              overflow='hidden'
              w='100%'
              minW={240}
              maxW='411px'
            >
              <Image src={itunes.image} alt={title} objectFit='cover' w='100%' h='100%' />
            </Flex>

            <Flex flex={1} direction='column' align='center' gap={2} textAlign='center'>
              <Text fontSize='2xl' lineHeight={1} fontWeight='semibold'>
                {title}
              </Text>
              {!!detail?.artistName?.length && (
                <Text fontSize='lg' fontWeight={300} color='gray.500'>
                  {detail.collectionName}
                </Text>
              )}
              <Flex gap={2} align='center'>
                <Text fontSize='14px'>{new Date(isoDate).toLocaleDateString('pt-BR')}</Text>
                <Badge borderRadius='full' px={2} colorScheme='teal'>
                  {formatDuration(itunes.duration)}
                </Badge>
              </Flex>
              <Text
                fontSize='14px'
                color='gray.500'
                dangerouslySetInnerHTML={{
                  __html: itunes.summary?.length ? itunes.summary : content,
                }}
              />
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default observer(PodcastDetailModal);
