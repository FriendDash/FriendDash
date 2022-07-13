import React, { useState } from 'react';
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
  Text,
  VStack,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import OrderDetailUser from './OrderDetailUser';
import { ChevronDownIcon } from '@chakra-ui/icons';

export default chakra(function ManageOrderModal({
  className,
  data,
  isOpen,
  onClose,
}) {
  const navigate = useNavigate();
  const toast = useToast();

  const [orderStatus, setOrderStatus] = useState(data.orderStatus);

  const handleSavePUTReq = () => {
    const newOrderStatus = {
      orderStatus: orderStatus,
    };
    (async () => {
      const response = await fetch(
        `http://localhost:5000/orders/updateStatus/${data._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newOrderStatus),
        }
      );

      const dataRes = await response.json();
      if (dataRes) {
        toast({
          title: 'Order Status updated.',
          description: "We've updated your order status.",
          status: 'success',
          duration: 9000,
          isClosable: true,
          position: 'bottom',
        });
        onClose();
        navigate(0);
      }
    })();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className={className}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Manage Order</ModalHeader>
        <ModalCloseButton />

        <ModalBody pt="0px">
          <VStack alignItems="flex-start">
            <Box>
              <Heading size="sm">Restaurant:</Heading>
              <Text>{data.restaurant}</Text>
            </Box>
            <Box>
              <Heading size="sm">Organizer:</Heading>
              <Text>{data.creatorName}</Text>
            </Box>
            <Box>
              <Heading size="sm">Pick Up Location:</Heading>
              <Text>{data.pickupLocation}</Text>
            </Box>
            <Box>
              <Heading size="sm">Pick Up Time:</Heading>
              <Text>{data.pickupTime}</Text>
            </Box>
            <Heading size="sm">Order Status:</Heading>
            <Menu>
              <MenuButton
                w="100%"
                as={Button}
                textAlign="start"
                rightIcon={<ChevronDownIcon />}
                textTransform="capitalize"
              >
                {orderStatus}
              </MenuButton>
              <MenuList w="100%">
                <MenuItem
                  w="400px"
                  value="open"
                  onClick={() => setOrderStatus('open')}
                >
                  Open
                </MenuItem>
                <MenuItem
                  w="400px"
                  value="completed"
                  onClick={() => setOrderStatus('completed')}
                >
                  Completed
                </MenuItem>
                <MenuItem
                  w="400px"
                  value="inProgress"
                  onClick={() => setOrderStatus('inProgress')}
                >
                  In Progress
                </MenuItem>
                <MenuItem
                  w="400px"
                  value="closed"
                  onClick={() => setOrderStatus('closed')}
                >
                  Closed
                </MenuItem>
              </MenuList>
            </Menu>

            <Heading size="sm">Members</Heading>
            <VStack
              w="100%"
              alignItems="flex-start"
              maxHeight="160px"
              overflowY="auto"
            >
              {data.orderDetails.length ? (
                data.orderDetails.map(userOrder => (
                  <OrderDetailUser
                    key={data._id}
                    userOrder={userOrder}
                    groupId={data._id}
                  />
                ))
              ) : (
                <Box bg="red.100" rounded="20px" w="100%">
                  <Text textAlign="center" p="10px" fontWeight="600">
                    No Members in Order
                  </Text>
                </Box>
              )}
            </VStack>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose} w="110px">
            Close
          </Button>
          <Button colorScheme="teal" w="110px" onClick={handleSavePUTReq}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
