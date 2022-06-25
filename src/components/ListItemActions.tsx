import { Flex, Icon, IconButton } from '@chakra-ui/react';
import { RiInformationLine, RiPlayLine, RiPlayListAddLine } from 'react-icons/ri';

type ListItemActions = {
  showBtInfo?: boolean;
  showBtPlay?: boolean;
  showBtPlayListAdd?: boolean;
  onClickInfo?: () => void;
  onClickPlay?: () => void;
  onClickPlaylistAdd?: () => void;
};

const ListItemActions = ({
  showBtInfo = false,
  showBtPlay = false,
  showBtPlayListAdd = false,
  onClickInfo,
  onClickPlay,
  onClickPlaylistAdd,
}: ListItemActions) => {
  return (
    <Flex
      position='absolute'
      gap={3}
      direction='column'
      align='center'
      justify='center'
      opacity={0}
      transition='all 150ms ease-in-out'
      left='50%'
      top='50%'
      transform='translate(-50%, -50%)'
      _groupHover={{ opacity: 1 }}
    >
      {showBtPlay && (
        <IconButton aria-label='Play' size='sm' onClick={onClickPlay}>
          <Icon as={RiPlayLine} fontSize='20px' />
        </IconButton>
      )}
      {(showBtInfo || showBtPlayListAdd) && (
        <Flex gap={3}>
          {showBtInfo && (
            <IconButton aria-label='Information' size='sm' onClick={onClickInfo}>
              <Icon as={RiInformationLine} fontSize='20px' />
            </IconButton>
          )}
          {showBtPlayListAdd && (
            <IconButton aria-label='Add to playlist' size='sm' onClick={onClickPlaylistAdd}>
              <Icon as={RiPlayListAddLine} fontSize='20px' />
            </IconButton>
          )}
        </Flex>
      )}
    </Flex>
  );
};

export default ListItemActions;
