import { Button, Heading, IconButton, useDisclosure } from '@chakra-ui/react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
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
      <Heading size="lg" ml="18px" pt="9px">
        Checkout
      </Heading>
      <IconButton
        aria-label="Customer checkout"
        icon={<AiOutlineShoppingCart />}
        onClick={openPopUp}
      />

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
              <TableContainer>
                <Table size="sm">
                  <Thead>
                    <Tr>
                      <Th>Item Name</Th>
                      <Th>Quantity</Th>
                      <Th isNumeric>Price</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {completeOrder.map((e, i) => {
                      return (
                        <Tr key={i}>
                          <Td>{e.menuItem}</Td>
                          <Td>{e.quantity}</Td>
                          <Td isNumeric>
                            ${e.price} x {e.quantity} = ${e.price * e.quantity}
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                  <Tfoot>
                    <Tr>
                      <Th> </Th>
                      <Th>
                        <b>TOTAL COST:</b>
                      </Th>
                      <Th isNumeric>
                        <b>
                          $
                          {completeOrder.reduce(
                            (previousValue, currentElement) =>
                              previousValue +
                              currentElement.price * currentElement.quantity,
                            0
                          )}
                        </b>
                      </Th>
                    </Tr>
                  </Tfoot>
                </Table>
              </TableContainer>
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
