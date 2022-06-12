import { Box, Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';

const Profile = () => {
  return (
    <Link href='/' passHref>
      <Box display={{ base: 'none', md: 'flex' }}>
        <Text fontSize={22} letterSpacing='tight' fontWeight='bold'>
          PodJS
        </Text>
      </Box>
    </Link>
  );
};

export default Profile;
