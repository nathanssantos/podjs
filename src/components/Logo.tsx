import { Flex, Icon, Text } from '@chakra-ui/react';
import { RiDiscLine } from 'react-icons/ri';

type LogoProps = {
  size?: 'sm' | 'md' | 'lg';
};

const Logo = ({ size = 'sm' }: LogoProps) => {
  let iconSize = '32px';
  let textSize = '20px';
  let gap = 1;

  switch (size) {
    case 'lg': {
      iconSize = '64px';
      textSize = '40px';
      gap = 2;
      break;
    }

    default: {
      break;
    }
  }

  return (
    <Flex align='center' gap={gap} userSelect='none'>
      <Icon as={RiDiscLine} fontSize={iconSize} color='teal.300' />
      <Text fontSize={textSize} fontWeight='semibold'>
        PodJS
      </Text>
    </Flex>
  );
};

export default Logo;