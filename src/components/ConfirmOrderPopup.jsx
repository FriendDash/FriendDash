import { Button, Heading, useDisclosure, Text } from '@chakra-ui/react';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ItemsTable from './ItemsTable';

export default function ConfirmOrderPopup(props) {
  const dispatch = useDispatch();
  const toast = useToast();

  const signedOutUserObject = {
    createdAt: '',
    googleId: '0',
    updatedAt: '',
    userEmail: '',
    userName: 'Foodie',
    userOrders: [],
    userProfile: '',
    userRating: [],
  };

  const [user, setUser] = useState(() => {
    // getting stored value from localStorage
    const saved = localStorage.getItem('userSession_FriendDash');
    const initialValue = JSON.parse(saved);
    return initialValue || signedOutUserObject;
  });

  const { groupOrder, combineOrders, starters, mains, desserts } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const completeOrder = [...starters, ...mains, ...desserts];
  const navigate = useNavigate();

  const onConfirm = () => {
    onClose();
    // TODO: implement the proper navigation for closing group order
    navigate(`/group/${groupOrder._id}`);
  };

  const openPopUp = () => {
    combineOrders(starters, mains, desserts);
    onOpen();
  };

  const confirmOrderClick = () => {
    const newOrderItem = {
      orderUserId: user.googleId,
      userName: user.userName,
      orderItems: completeOrder,
    };

    // PUT req to main order
    (async () => {
      const response = await fetch(
        `https://frienddash-db.herokuapp.com/orders/updateOrderDetails/${groupOrder._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newOrderItem),
        }
      );

      if (response.status == '200') {
        console.log('inside 200 check');
        toast({
          title: 'Order Added.',
          description: "We've added your order for you.",
          status: 'success',
          duration: 9000,
          position: 'bottom',
          isClosable: true,
        });
      }
    })();

    // PUT req user
    (async () => {
      const response = await fetch(
        `https://frienddash-db.herokuapp.com/users/updateUserOrders/${user.googleId}/${groupOrder._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status == '200') {
        console.log('successful update to user 200 check');
      }
    })();

    onConfirm();
  };

  return (
    <>
      <Button
        colorScheme="teal"
        rightIcon={<HiOutlineShoppingCart size="24px" />}
        aria-label="Customer checkout"
        onClick={openPopUp}
        w="200px"
        h="50px"
      >
        <Text fontSize="24px">Checkout</Text>
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirm Add to Group Order
            </AlertDialogHeader>

            <AlertDialogBody>
              <Heading size="sm">Order Summary</Heading>
              <ItemsTable completeOrder={completeOrder} />
              <br />
              Are you sure you want to add to the group order? You can't make
              any changes afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="green" onClick={confirmOrderClick} ml={3}>
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
