import { Box, Image, Text } from '@chakra-ui/react';

type CollectionCardProps = {
  collection: Collection;
};

const CollectionCard = (props: CollectionCardProps) => {
  const {
    collection: { collectionId, collectionName, artworkUrl100 },
  } = props;

  return (
    <Box key={collectionId} p='2' shadow='md'>
      <Image objectFit='cover' src={artworkUrl100} alt={collectionName} />
      <Text>{collectionName}</Text>
    </Box>
  );
};

export default CollectionCard;
