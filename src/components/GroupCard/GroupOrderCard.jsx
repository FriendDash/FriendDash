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
  Tag,
} from '@chakra-ui/react';
import GroupCard from './GroupCard';
import ViewOrderModal from '../ViewOrderModal';
import StatusTag from './../StatusTag';

import { restaurantImageMapping } from '../../utils/RestaurantImageMapping';

export default chakra(function GroupOrderCard({ className, data }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <GroupCard className={className}>
      <VStack alignItems="left">
        <Image
          src={restaurantImageMapping[data.restaurant]}
          h="150px"
          w="300px"
          borderRadius="10px"
          objectFit="cover"
        />
        <HStack justifyContent="space-between">
          <Heading size="md">{data.restaurant}</Heading>
          {data.orderStatus && <StatusTag status={data.orderStatus} />}
        </HStack>

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
