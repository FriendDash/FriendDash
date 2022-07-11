import React from 'react';
import {
  Image,
  chakra,
  Flex,
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

import { restaurantImageMapping } from '../../utils/RestaurantImageMapping';
import { orderStatusColorMapping } from '../../utils/OrderStatusMapping';
import StatusTag from '../StatusTag';

const data = {
  restaurant: 'Subway',
  creatorName: 'Johhny Hacks',
  pickupLocation: '5751 Student Union Blvd',
  pickupTime: '6:30pm',
  maxSize: 4,
  orderId: 1,
  creatorUserId: '113225255095763637104',
  orderStatus: 'open',
  orderDetails: [
    {
      orderUserId: 'abc',
      orderItems: [
        {
          menuItem: 'Big Mac',
          price: 7,
          quantity: 1,
          _id: '62ca6c468b0ee09a39e6cdae',
        },
        {
          menuItem: 'Fries (Large)',
          price: 4,
          quantity: 1,
          _id: '62ca6c468b0ee09a39e6cdaf',
        },
        {
          menuItem: 'Coca Cola',
          price: 2,
          quantity: 1,
          _id: '62ca6c468b0ee09a39e6cdb0',
        },
      ],
      _id: '62ca6c468b0ee09a39e6cdad',
    },
    {
      orderUserId: 'abc',
      orderItems: [
        {
          menuItem: 'Big Mac',
          price: 7,
          quantity: 1,
          _id: '62ca6c468b0ee09a39e6cdb2',
        },
        {
          menuItem: 'Fries (Large)',
          price: 4,
          quantity: 1,
          _id: '62ca6c468b0ee09a39e6cdb3',
        },
        {
          menuItem: 'Coca Cola',
          price: 2,
          quantity: 1,
          _id: '62ca6c468b0ee09a39e6cdb4',
        },
      ],
      _id: '62ca6c468b0ee09a39e6cdb1',
    },
    {
      orderUserId: 'abc',
      orderItems: [
        {
          menuItem: 'Big Mac',
          price: 7,
          quantity: 1,
          _id: '62ca6c468b0ee09a39e6cdb6',
        },
        {
          menuItem: 'Fries (Large)',
          price: 4,
          quantity: 1,
          _id: '62ca6c468b0ee09a39e6cdb7',
        },
        {
          menuItem: 'Coca Cola',
          price: 2,
          quantity: 1,
          _id: '62ca6c468b0ee09a39e6cdb8',
        },
      ],
      _id: '62ca6c468b0ee09a39e6cdb5',
    },
    {
      orderUserId: '112576191172787398605',
      orderItems: [
        {
          menuItem: 'WOWZERS',
          price: 3,
          quantity: 1,
          _id: '62ca6c468b0ee09a39e6cdba',
        },
      ],
      _id: '62ca6c468b0ee09a39e6cdb9',
    },
  ],
  createdAt: '2022-06-26T19:18:54.692Z',
  updatedAt: '2022-06-26T19:18:54.692Z',
};

export default chakra(function GroupOrderManageCard({ className }) {
  return (
    <Flex w="800px" h="150px" bg="gray.50" rounded="10px">
      <HStack w="100%">
        <Image
          src={restaurantImageMapping[data.restaurant]}
          h="150px"
          w="300px"
          borderRadius="10px"
          objectFit="cover"
        />
        <VStack alignItems="flex-start">
          <Heading size="md">{data.restaurant}</Heading>
          <HStack>
            <Text>Pickup Time:</Text>
            <Text fontSize="md">{data.pickupTime}</Text>
          </HStack>
          <HStack>
            <Text>Pickup Location:</Text>
            <Text fontSize="md">{data.pickupLocation}</Text>
          </HStack>
          <HStack>
            <Text>Users in Order:</Text>
            <StatusTag status={data.orderDetails.length} />
          </HStack>
        </VStack>

        <Spacer />

        {/* Buttons */}
        <VStack pr="10px">
          <HStack>
            <Heading size="sm">Status:</Heading>
            <StatusTag status={data.orderStatus} />
          </HStack>
          <Button width="150px" colorScheme="blue">
            View Order
          </Button>
          <Button w="150px" colorScheme="teal">
            Manage Order
          </Button>
        </VStack>
      </HStack>
    </Flex>
  );
});
