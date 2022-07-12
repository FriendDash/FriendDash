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
  Spacer,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal';

export default chakra(function ManageOrderModal({
  className,
  data,
  isOpen,
  onClose,
}) {
  const navigate = useNavigate();
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
            <Box>
              <Heading size="sm">OrderId:</Heading>
              <Text>{data._id}</Text>
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

            <Heading size="sm">Members</Heading>
            <VStack w="100%" alignItems="flex-start">
              {data.orderDetails.map(order => (
                <HStack w="100%" bg="gray.100" p="5px" rounded="10px">
                  <Button
                    colorScheme="teal"
                    variant="link"
                    pl="10px"
                    pr="10px"
                    onClick={() => navigate(`/profile/${order.orderUserId}`)}
                  >
                    {/* Change to username instead */}
                    {order.orderUserId}
                  </Button>
                  <Spacer />
                  <Button colorScheme="red" onClick={onConfirmationOpen}>
                    Remove User
                  </Button>

                  {/* TODO: Bug that make the modal render same information for eveything */}
                  <ConfirmRemoveUserModal
                    isOpen={isConfirmationOpen}
                    onClose={onConfirmationClose}
                    title={`Please confirm to remove user: ${order._id} from this order. This action cannot be undone.`}
                    confirmButton={'Confirm'}
                    cancelButton={'Cancel'}
                    userId={order._id}
                  />
                </HStack>
              ))}
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

const ConfirmRemoveUserModal = ({
  title,
  confirmButton,
  cancelButton,
  isOpen,
  onClose,
  userId,
}) => {
  // Remove user from order on confirmation
  const removeUser = userId => {
    // function to remove
    // const orderId = data._id;
    // (async () => {
    //   const response = await fetch(
    //     `http://localhost:5000/removeUser/${orderId}/${userId}`,
    //     {
    //       method: 'DELETE',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     }
    //   );
    //   const dataRes = await response.json();
    //   if (dataRes) {
    //     onConfirmationClose();
    //     onClose();
    //     navigate(0);
    //   }
    // })();
    console.log(userId);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent marginTop={'20%'}>
        <ModalHeader>{title}</ModalHeader>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} w="110px" onClick={onClose}>
            {cancelButton}
          </Button>
          <Button
            colorScheme="teal"
            w="110px"
            onClick={() => removeUser(userId)}
          >
            {confirmButton}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
