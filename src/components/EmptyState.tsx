import { Flex, Icon, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { RiErrorWarningLine, RiSearchEyeLine } from 'react-icons/ri';

type EmptyStateProps = {
  variant?: 'not-found' | 'error';
};

const renderContent = ({ variant = 'error' }: EmptyStateProps) => {
  switch (variant) {
    case 'not-found': {
      return (
        <>
          <Icon as={RiSearchEyeLine} fontSize='100px' />
          <Text>No search results found. Please try a different term.</Text>
        </>
      );
    }

    default: {
      return (
        <>
          <Icon as={RiErrorWarningLine} fontSize='100px' />
          <Text>Something unexpected happened. Please try again.</Text>
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
