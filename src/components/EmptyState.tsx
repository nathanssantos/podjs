import { Flex, Icon, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { RiErrorWarningLine, RiSearchEyeLine } from 'react-icons/ri';

import { EMPTY_STATE, ERROR_STATE } from '../constants/message';

type EmptyStateProps = {
  variant?: 'not-found' | 'error';
  text?: string;
};

const renderContent = ({ variant = 'error', text }: EmptyStateProps) => {
  switch (variant) {
    case 'not-found': {
      return (
        <>
          <Icon as={RiSearchEyeLine} fontSize='100px' />
          <Text>{!!text?.length ? text : EMPTY_STATE}</Text>
        </>
      );
    }

    default: {
      return (
        <>
          <Icon as={RiErrorWarningLine} fontSize='100px' />
          <Text>{!!text?.length ? text : ERROR_STATE}</Text>
        </>
      );
    }
  }
};

const EmptyState = (props: EmptyStateProps) => {
  const { variant, text } = props;

  return (
    <Flex
      direction='column'
      w='100%'
      align='center'
      justify='center'
      py={16}
      gap={6}
      textAlign='center'
    >
      {renderContent({ variant, text })}
    </Flex>
  );
};

export default observer(EmptyState);
