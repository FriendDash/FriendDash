import {
  Box,
  Image,
  chakra,
  VStack,
  Heading,
  Text,
  HStack,
  Button,
  Spacer,
  Flex,
} from '@chakra-ui/react';
import React from 'react';

// we will have a seperate mapping that takes restaraunt name as key to retrieve image

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

export default chakra(function ClubCard({ className, data }) {
  return (
    <Flex
      className={className}
      justify="center"
      w="300px"
      bg="gray.50"
      p="5px"
      rounded="10px"
    >
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
          <VStack alignItems="flex-start">
            <HStack>
              <Text>Pickup Time:</Text>
              <Text fontSize="md">{data.pickupTime}</Text>
            </HStack>
          </VStack>
          <Spacer />
          <Button colorScheme="blue" alignSelf="flex-end">
            Join Order
          </Button>
        </HStack>
      </VStack>
    </Flex>
  );
});
