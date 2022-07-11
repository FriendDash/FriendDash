import React, { useEffect, useState } from 'react';
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
  Select,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal';

export default chakra(function ManageOrderModal({
  className,
  data,
  isOpen,
  onClose,
}) {
  const nav = useNavigate();
  const toast = useToast();

  const {
    isOpen: isConfirmationOpen,
    onOpen: onConfirmationOpen,
    onClose: onConfirmationClose,
  } = useDisclosure();

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
        nav(0);
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
          <HStack marginBottom={'10px'}>
            <ConfirmationModal
              isOpen={isConfirmationOpen}
              onClose={onConfirmationClose}
              className={className}
              title={'Confirm delete group order? This cannot be undone'}
              confirmButton={'CONFIRM'}
              cancelButton={'CANCEL'}
              //   onConfirm={deleteOrder}
            />
          </HStack>
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
            <Select
              variant="outline"
              onChange={e => setOrderStatus(e.target.value)}
            >
              <option value="open">Open</option>
              <option value="completed">Completed</option>
              <option value="inProgress">In Progress</option>
            </Select>
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
