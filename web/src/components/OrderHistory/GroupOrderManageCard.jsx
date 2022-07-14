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
  useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { restaurantImageMapping } from '../../utils/RestaurantImageMapping';
import StatusTag from '../StatusTag';
import ManageOrderModal from './ManageOrderModal';

export default chakra(function GroupOrderManageCard({
  className,
  groupOrder,
  isCreator,
}) {
  const nav = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bg = useColorModeValue('gray.50', 'gray.700');

  const handleViewOrder = () => {
    nav(`/group/${groupOrder._id}`);
  };

  const handleManageOrder = () => {
    // popup component that shows deatils order information and can edit
  };

  const handleLeaveOrder = () => {
    // popup component to confirm
  };

  return (
    <Flex w="800px" className={className} h="150px" bg={bg} rounded="10px">
      <HStack w="100%">
        <Image
          src={restaurantImageMapping[groupOrder.restaurant]}
          h="150px"
          w="300px"
          borderRadius="10px"
          objectFit="cover"
        />
        <VStack alignItems="flex-start">
          <Heading size="md">{groupOrder.restaurant}</Heading>
          <HStack>
            <Text>Pickup Time:</Text>
            <Text fontSize="md">{groupOrder.pickupTime}</Text>
          </HStack>
          <HStack>
            <Text>Pickup Location:</Text>
            <Text fontSize="md">{groupOrder.pickupLocation}</Text>
          </HStack>
          <HStack>
            <Text>Users in Order:</Text>
            <StatusTag status={groupOrder.orderDetails.length} />
          </HStack>
        </VStack>

        <Spacer />

        {/* Buttons */}
        <VStack pr="10px">
          <HStack>
            <Heading size="sm">Status:</Heading>
            <StatusTag status={groupOrder.orderStatus} />
          </HStack>
          <Button width="150px" colorScheme="blue" onClick={handleViewOrder}>
            View Order
          </Button>
          {isCreator ? (
            <Button w="150px" colorScheme="teal" onClick={onOpen}>
              Manage Order
            </Button>
          ) : (
            <Button w="150px" colorScheme="red" onClick={handleManageOrder}>
              Leave Order
            </Button>
          )}
        </VStack>
      </HStack>

      <ManageOrderModal isOpen={isOpen} onClose={onClose} data={groupOrder} />
    </Flex>
  );
});
