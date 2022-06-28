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
import EmptyState from './EmptyState';
import Loader from './Loader';

const CollectionDetailModal = () => {
  const { uiStore, collectionStore } = useStore();
  const btnRef = useRef(null);

  const { toggleCollectionModal, collectionDetailModalIsOpen } = uiStore;
  const { detail, detailStatus } = collectionStore;

  const renderDetail = () => {
    switch (detailStatus) {
      case 'fetching': {
        return <Loader variant='list' />;
      }

      case 'empty': {
        return <EmptyState variant='not-found' />;
      }

      case 'error': {
        return <EmptyState />;
      }

      case 'success': {
        if (detail) {
          const {
            artistName,
            collectionId,
            collectionName,
            artworkUrl100,
            artworkUrl600,
            description,
            managingEditor,
            language,
            copyright,
            lastBuildDate,
            primaryGenreName,
            genres,
            feedUrl,
            trackCount,
            country,
            items,
          } = detail;

          return (
            <>
              <Flex gap={4} direction='column' alignSelf='center' align='center'>
                <Flex
                  borderWidth='1px'
                  borderRadius='lg'
                  overflow='hidden'
                  w='100%'
                  minW={240}
                  maxW='320px'
                >
                  <Image
                    src={artworkUrl600}
                    alt={collectionName}
                    objectFit='cover'
                    w='100%'
                    h='100%'
                  />
                </Flex>
                <Flex direction='column' gap={4} textAlign='center'>
                  <Flex flex={1} direction='column' align='center'>
                    <Text fontSize='2xl' lineHeight={1} mb={2} fontWeight='semibold'>
                      {collectionName}
                    </Text>
                    <Text fontSize='lg' mb={4} fontWeight={300} color='gray.500'>
                      {artistName}
                    </Text>
                    {!!description?.length && (
                      <Text mb={4} dangerouslySetInnerHTML={{ __html: description }} />
                    )}
                    <Badge borderRadius='full' px={2} colorScheme='teal'>
                      {primaryGenreName}
                    </Badge>
                  </Flex>
                  {!!copyright?.length && (
                    <Text fontSize='13px' color='gray.500'>
                      {`${!copyright.includes('©') ? `© ${copyright}` : `${copyright}`}`}
                    </Text>
                  )}
                </Flex>
              </Flex>
            </>
          );
        }
      }

      default: {
        return null;
      }
    }
  };

  return (
    <Modal
      onClose={() => toggleCollectionModal({ open: false })}
      finalFocusRef={btnRef}
      isOpen={collectionDetailModalIsOpen}
      scrollBehavior='outside'
      size='xl'
    >
      <ModalOverlay backdropFilter='auto' backdropBlur='10px' />
      <ModalContent>
        <ModalHeader>
          {!!detail?.collectionName?.length ? detail?.collectionName : ''}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>{renderDetail()}</ModalBody>
        <ModalFooter>
          <Button onClick={() => toggleCollectionModal({ open: false })}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default observer(CollectionDetailModal);
