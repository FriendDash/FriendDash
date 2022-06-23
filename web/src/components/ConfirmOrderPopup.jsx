
import { Button, Heading, IconButton, useDisclosure } from '@chakra-ui/react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
  } from '@chakra-ui/react'
import React, { useState } from "react";
import { updateOrderAsync } from '../redux/orders/thunk';

export default function ConfirmOrderPopup(props) {
    const dispatch = useDispatch();

    const { combineOrders, starters, mains, desserts } = props;
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const completeOrder = [...starters, ...mains, ...desserts];

    const openPopUp = () => {
        combineOrders(starters, mains, desserts);
        onOpen();
    }

    const confirmOrderClick = () => {
        dispatch(updateOrderAsync(props.id))
        onClose();
    }

   
  
    return (
      <>
        <Heading size="lg" ml="18px" pt="9px">
        Checkout
      </Heading>
      <IconButton aria-label='Customer checkout' icon={<AiOutlineShoppingCart />} onClick={openPopUp}/>
  
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Confirm Add to Group Order
              </AlertDialogHeader>
  
              <AlertDialogBody>
                <Heading size="sm">Order Summary</Heading>
                {completeOrder.map((e, i) => {return <p key={i}>Item Name: {e.menuItem} - Quantity: {e.quantity}</p>})}
                <br />
                {/* TODO: Add logic for caluclating summary prices */}
                Are you sure you want to add to the group order? You can't undo this action afterwards.
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme='green' onClick={confirmOrderClick} ml={3}>
                  Confirm
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }