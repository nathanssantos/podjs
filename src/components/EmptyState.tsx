import { Flex, Icon, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { RiErrorWarningLine, RiSearchEyeLine } from 'react-icons/ri';

import { EMPTY_STATE, ERROR_STATE } from '../constants/message';

type EmptyStateProps = {
  variant?: 'not-found' | 'error';
};

const renderContent = ({ variant = 'error' }: EmptyStateProps) => {
  switch (variant) {
    case 'not-found': {
      return (
        <>
          <Icon as={RiSearchEyeLine} fontSize='100px' />
          <Text>{EMPTY_STATE}</Text>
        </>
      );
    }

    default: {
      return (
        <>
          <Icon as={RiErrorWarningLine} fontSize='100px' />
          <Text>{ERROR_STATE}</Text>
        </>
      );
    }
  }
};

const EmptyState = (props: EmptyStateProps) => {
  const { variant } = props;

  return (
    <Flex
      direction='column'
      width='100%'
      align='center'
      justify='center'
      py={16}
      gap={6}
      textAlign='center'
    >
      {renderContent({ variant })}
    </Flex>
  );
};

export default observer(EmptyState);
