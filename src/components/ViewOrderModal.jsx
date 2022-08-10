import React from 'react';
import { useDispatch } from 'react-redux';
import { removeOrderAsync } from '../redux/orders/thunk';
import {
  chakra,
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Heading,
  HStack,
  Text,
  Image,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { restaurantImageMapping } from '../utils/RestaurantImageMapping';

export default chakra(function ViewOrderModal({
  className,
  data,
  isOpen,
  onClose,
}) {
  const navigate = useNavigate();
  const user = localStorage.getItem('userSession_FriendDash');
  return (
    <Modal isOpen={isOpen} onClose={onClose} className={className}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Order Details</ModalHeader>
        <ModalCloseButton />

        <ModalBody pt="0px">
          <VStack>
            <Image
              src={restaurantImageMapping[data.restaurant]}
              h="150px"
              w="100%"
              borderRadius="10px"
              objectFit="cover"
            />

            <HStack w="100%" justifyContent="space-between" px="10px">
              <VStack alignItems="flex-start">
                <Box>
                  <Heading size="sm">Restaurant:</Heading>
                  <Text>{data.restaurant}</Text>
                </Box>
                <Box>
                  <Heading size="sm">Organizer:</Heading>
                  <Text>{data.creatorName}</Text>
                </Box>
              </VStack>
              <VStack alignItems="flex-start">
                <Box>
                  <Heading size="sm">Pick Up Location:</Heading>
                  <Text>{data.pickupLocation}</Text>
                </Box>
                <Box>
                  <Heading size="sm">Pick Up Time:</Heading>
                  <Text>{data.pickupTime}</Text>
                </Box>
              </VStack>
            </HStack>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose} w="110px">
            Close
          </Button>

          <Button
            colorScheme="teal"
            w="110px"
            disabled={!user || JSON.parse(user).userName === "Foodie"}
            onClick={() => navigate(`/group/${data._id}`)}
          >
            Join Order
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
