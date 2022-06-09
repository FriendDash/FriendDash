import React from 'react';
import {
  Image,
  chakra,
  VStack,
  Heading,
  Text,
  HStack,
  Button,
  Spacer,
  useDisclosure,
} from '@chakra-ui/react';
import GroupCard from './GroupCard';
import ViewOrderModal from '../ViewOrderModal';

// we will have a seperate mapping that takes restaraunt name as key to retrieve image
// example mapping
const restarauntImageMapping = {
  Subway:
    'https://doordash-static.s3.amazonaws.com/media/store/header/55699.jpg',
  'Pizza Pizza':
    'https://doordash-static.s3.amazonaws.com/media/store/header/273467.jpg',
  'Nori Bento & Udon':
    'https://doordash-static.s3.amazonaws.com/media/store/header/f40ada71-6450-4790-a911-fc2aae5c748b.jpg',
  McDonalds:
    'https://doordash-static.s3.amazonaws.com/media/store/header/437107.png',
};

export default chakra(function GroupOrderCard({ className, data }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <GroupCard className={className}>
      <VStack alignItems="left">
        <Image
          src={restarauntImageMapping[data.restaurant]}
          h="150px"
          w="300px"
          borderRadius="10px"
          objectFit="cover"
        />
        <Heading size="md">{data.restaurant}</Heading>
        <HStack w="100%">
          <HStack>
            <Text>Pickup Time:</Text>
            <Text fontSize="md">{data.pickupTime}</Text>
          </HStack>
          <Spacer />
          <Button colorScheme="blue" alignSelf="flex-end" onClick={onOpen}>
            View Order
          </Button>

          <ViewOrderModal isOpen={isOpen} onClose={onClose} data={data} />
        </HStack>
      </VStack>
    </GroupCard>
  );
});
