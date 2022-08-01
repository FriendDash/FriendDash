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
import ConfirmationModal from '../ConfirmationModal';
import SelectPaymentModal from '../SelectPaymentModal';

export default chakra(function GroupOrderManageCard({
  className,
  groupOrder,
  isCreator,
  userId,
}) {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenPayment, onOpen: onOpenPayment, onClose: onClosePayment } = useDisclosure();
  const {
    isOpen: isConfirmationOpen,
    onOpen: onConfirmationOpen,
    onClose: onConfirmationClose,
  } = useDisclosure();
  const bg = useColorModeValue('gray.50', 'gray.700');

  const handleViewOrder = () => {
    navigate(`/group/${groupOrder._id}`);
  };

  const removeUser = userId => {
    // leave order from order -> orderDetails
    // leave order from user -> ordersArray

    (async () => {
      const response = await fetch(
        `https://frienddash-db.herokuapp.com/orders/removeUser/${groupOrder._id}/${userId}`,
        {
          method: 'DELETE',
        }
      );
      const dataRes = await response.json();
    })();

    // delete order from userOrders
    (async () => {
      const response = await fetch(
        `https://frienddash-db.herokuapp.com/users/removeOrder/${userId}/${groupOrder._id}`,
        {
          method: 'DELETE',
        }
      );

      if (response.status == '200') {
        console.log('successful update to user 200 check');
      }
    })();

    onConfirmationClose();
    navigate(0);
  };

  return (
    <Flex w="800px" className={className} h="180px" bg={bg} rounded="10px">
      <HStack w="100%">
        <Image
          src={restaurantImageMapping[groupOrder.restaurant]}
          h="180px"
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
          {
            !isCreator && groupOrder.orderStatus == "closed" &&
            <Button w="150px" colorScheme="orange" onClick={onOpenPayment}>
              Pay For Order
            </Button>
          }
          {isCreator ? (
            <Button w="150px" colorScheme="teal" onClick={onOpen}>
              Manage Order
            </Button>
          ) : (
            <Button w="150px" colorScheme="red" onClick={onConfirmationOpen}>
              Leave Order
            </Button>
          )}
        </VStack>
      </HStack>

      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={onConfirmationClose}
        title={`Remove yourself from this order? This action cannot be undone.`}
        confirmButton={'Confirm'}
        cancelButton={'Cancel'}
        onConfirm={() => removeUser(userId)}
      />

      <ManageOrderModal isOpen={isOpen} onClose={onClose} data={groupOrder} />
      <SelectPaymentModal isOpen={isOpenPayment} onClose={onClosePayment} userId={userId} orderId={groupOrder._id} />
    </Flex>
  );
});
