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
  useDisclosure
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal';

export const restarauntImageMapping = {
  Subway:
    'https://doordash-static.s3.amazonaws.com/media/store/header/55699.jpg',
  'Pizza Pizza':
    'https://doordash-static.s3.amazonaws.com/media/store/header/273467.jpg',
  'Nori Bento & Udon':
    'https://doordash-static.s3.amazonaws.com/media/store/header/f40ada71-6450-4790-a911-fc2aae5c748b.jpg',
  McDonalds:
    'https://doordash-static.s3.amazonaws.com/media/store/header/437107.png',
};

export default chakra(function ViewOrderModal({
  className,
  data,
  isOpen,
  onClose,
}) {
  const navigate = useNavigate();
  const { isOpen: isConfirmationOpen, onOpen: onConfirmationOpen, onClose: onConfirmationClose } = useDisclosure();
  const dispatch = useDispatch();
  const deleteOrder = () => {
    dispatch(removeOrderAsync(data.orderId));
    onConfirmationClose();
    onClose();
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose} className={className}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Order Details</ModalHeader>
        <ModalCloseButton />

        <ModalBody pt="0px">
          <HStack marginBottom={"10px"}>
            <Button colorScheme="red" marginRight={"0"} marginLeft={"auto"} onClick={onConfirmationOpen}>
              Delete Order
            </Button>
            <ConfirmationModal isOpen={isConfirmationOpen} onClose={onConfirmationClose} className={className} title={"Confirm delete group order? This cannot be undone"} confirmButton={"CONFIRM"} cancelButton={"CANCEL"} onConfirm={deleteOrder} />
          </HStack>
          <VStack>
            <Image
              src={restarauntImageMapping[data.restaurant]}
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
                  <Text>
                    {data.creatorFirstName} {data.creatorLastName}
                  </Text>
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
            onClick={() => navigate(`/group/${data.orderId}`)}
          >
            Join Order
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
