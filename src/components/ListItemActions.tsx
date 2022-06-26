import { Box, Flex, Icon, IconButton, useColorMode } from '@chakra-ui/react';
import { RiHeartLine, RiInformationLine, RiPlayLine, RiPlayListAddLine } from 'react-icons/ri';

type ListItemActions = {
  showBtInfo?: boolean;
  showBtPlay?: boolean;
  showBtPlayListAdd?: boolean;
  showBtFavoriteAdd?: boolean;
  onClickInfo?: () => void;
  onClickPlay?: () => void;
  onClickPlaylistAdd?: () => void;
  onClickFavoriteAdd?: () => void;
};

const ListItemActions = ({
  showBtInfo = false,
  showBtPlay = false,
  showBtPlayListAdd = false,
  showBtFavoriteAdd = false,
  onClickInfo,
  onClickPlay,
  onClickPlaylistAdd,
  onClickFavoriteAdd,
}: ListItemActions) => {
  const { colorMode } = useColorMode();

  return (
    <Flex
      position='absolute'
      gap={3}
      direction='row'
      justify='center'
      align='flex-end'
      opacity={0}
      transition='all 150ms ease-in-out'
      left={0}
      right={0}
      bottom={0}
      top={0}
      _groupHover={{ opacity: 1 }}
      py={2}
    >
      <Box
        bgGradient={`linear(to-b, transparent, ${colorMode === 'light' ? '#fff' : 'gray.800'})`}
        position='absolute'
        top={0}
        left={0}
        right={0}
        bottom={0}
      />
      {showBtPlay && (
        <IconButton
          aria-label='Play'
          size='sm'
          onClick={onClickPlay}
          backdropFilter='blur(10px)'
        >
          <Icon as={RiPlayLine} fontSize='20px' />
        </IconButton>
      )}
      {(showBtInfo || showBtPlayListAdd) && (
        <Flex gap={3}>
          {showBtInfo && (
            <IconButton
              aria-label='Information'
              size='sm'
              onClick={onClickInfo}
              backdropFilter='blur(10px)'
            >
              <Icon as={RiInformationLine} fontSize='20px' />
            </IconButton>
          )}
          {showBtPlayListAdd && (
            <IconButton
              aria-label='Add to playlist'
              size='sm'
              onClick={onClickPlaylistAdd}
              backdropFilter='blur(10px)'
            >
              <Icon as={RiPlayListAddLine} fontSize='20px' />
            </IconButton>
          )}
          {showBtFavoriteAdd && (
            <IconButton
              aria-label='Favorite'
              size='sm'
              onClick={onClickFavoriteAdd}
              backdropFilter='blur(10px)'
            >
              <Icon as={RiHeartLine} fontSize='20px' />
            </IconButton>
          )}
        </Flex>
      )}
    </Flex>
  );
};

export default ListItemActions;
