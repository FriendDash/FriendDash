import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeOrderAsync } from '../../redux/orders/thunk';
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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import OrderDetailUser from './OrderDetailUser';
import { DeleteIcon, ChevronDownIcon } from '@chakra-ui/icons';
import ConfirmationModal from '../ConfirmationModal';

export default chakra(function ManageOrderModal({
  className,
  data,
  isOpen,
  onClose,
}) {
  const navigate = useNavigate();

  const {
    isOpen: isConfirmationOpen,
    onOpen: onConfirmationOpen,
    onClose: onConfirmationClose,
  } = useDisclosure();
  const dispatch = useDispatch();
  const deleteOrder = () => {
    dispatch(removeOrderAsync(data._id));
    onConfirmationClose();
    onClose();
    navigate(0);
  };

  const [orderStatus, setOrderStatus] = useState(data.orderStatus);
  const bg = useColorModeValue('red.100', 'red.700');

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
            <HStack w="100%" pr="5px">
              <Menu>
                <MenuButton
                  as={Button}
                  textAlign="start"
                  rightIcon={<ChevronDownIcon />}
                  textTransform="capitalize"
                  w="calc(100% - 130px)"
                >
                  {orderStatus}
                </MenuButton>
                <MenuList>
                  <MenuItem value="open" onClick={() => setOrderStatus('open')}>
                    Open
                  </MenuItem>
                  <MenuItem
                    value="completed"
                    onClick={() => setOrderStatus('completed')}
                  >
                    Completed
                  </MenuItem>
                  <MenuItem
                    value="inProgress"
                    onClick={() => setOrderStatus('inProgress')}
                  >
                    In Progress
                  </MenuItem>
                  <MenuItem
                    value="closed"
                    onClick={() => setOrderStatus('closed')}
                  >
                    Closed
                  </MenuItem>
                </MenuList>
              </Menu>

              <Button colorScheme="teal" w="130px" onClick={handleSavePUTReq}>
                Save
              </Button>
            </HStack>

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
                <Box bg={bg} rounded="20px" w="100%">
                  <Text textAlign="center" p="10px" fontWeight="600">
                    No Members in Order
                  </Text>
                </Box>
              )}
            </VStack>
          </VStack>
        </ModalBody>

        <ModalFooter justifyContent="center">
          <Button
            leftIcon={<DeleteIcon />}
            colorScheme="red"
            onClick={onConfirmationOpen}
          >
            Delete Order
          </Button>
          <ConfirmationModal
            isOpen={isConfirmationOpen}
            onClose={onConfirmationClose}
            title={'Confirm delete group order? This cannot be undone'}
            confirmButton={'Confirm'}
            cancelButton={'Cancel'}
            onConfirm={deleteOrder}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
