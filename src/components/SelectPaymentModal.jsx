import {
    chakra,
    useDisclosure,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Heading,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Modal,
    Box,
    ModalFooter,
    Button
} from "@chakra-ui/react";
import React, { useState, useEffect } from 'react';
import SavedCard from "./SavedCard";
import ItemsTable from "./ItemsTable";

export default chakra(function SelectPaymentModal({ isOpen, onClose, orderId, userId }) {
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [stripeConnected, setStripeConnected] = useState(null);
    const [completeOrder, setCompleteOrder] = useState({});
    const [selectedPayment, setSelectedPayment] = useState(0);
    const [recipientId, setRecipientId] = useState(null);
    const [totalCost, setTotalCost] = useState(0);
    const { isOpen: isConfirmationOpen, onOpen: onConfirmationOpen, onClose: onConfirmationClose } = useDisclosure();
    const userStripeId =
        localStorage.getItem('userSession_FriendDash') != null
            ? JSON.parse(localStorage.getItem('userSession_FriendDash')).stripeId
            : 0;

    const cancelRef = React.useRef();

    useEffect(() => {
        async function getPaymentMethods() {
            if (userStripeId) {
                const res = await fetch(
                    `https://frienddash-db.herokuapp.com/stripe/paymentMethods/${userStripeId}`,
                    {
                        method: 'GET',
                    }
                );
                const json = await res.json();
                if (res.status == 200) {
                    setPaymentMethods(json.data);
                    setStripeConnected(true);
                } else {
                    setStripeConnected(false);
                }
            } else {
                setStripeConnected(false);
            }
        }
        getPaymentMethods();
    }, []);

    const onSelectPayment = (index) => {
        setSelectedPayment(index);
    }

    async function onClickSelect() {
        const res = await fetch(
            `https://frienddash-db.herokuapp.com/orders/${orderId}`,
            {
                method: 'GET'
            }
        );
        if (res.status === 200) {
            const order = await res.json();
            const userOrder = order.orderDetails.find(detail => { return detail.orderUserId === userId });
            setCompleteOrder(userOrder.orderItems);
            onConfirmationOpen();
            setTotalCost(
                userOrder.orderItems.reduce(
                    (previousValue, currentElement) =>
                        previousValue +
                        currentElement.price * currentElement.quantity,
                    0
                )
            );
            setRecipientId(order.creatorAccountId);
        } else {
            alert('An error has occurred')
        }
    }

    async function checkout() {
        const bodyObject = {
            userStripeId: userStripeId,
            amount: totalCost * 100,
            paymentMethodId: paymentMethods[selectedPayment].id,
            receiverId: recipientId
        };
        const res = await fetch(
            'https://frienddash-db.herokuapp.com/stripe/checkout',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(bodyObject)
            }
        )
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent marginTop='20%'>
                    <ModalHeader>Please Select a Payment Method</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box>
                            {paymentMethods.map((paymentMethod, index) => (
                                <SavedCard
                                    index={index}
                                    onClickPayment={onSelectPayment}
                                    selected={index === selectedPayment}
                                    data={paymentMethod}
                                    mode='pay'
                                />
                            ))}
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose} w="110px">
                            Close
                        </Button>
                        <Button
                            colorScheme="teal"
                            w="110px"
                            onClick={onClickSelect}
                        >
                            Select
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <AlertDialog
                isOpen={isConfirmationOpen}
                leastDestructiveRef={cancelRef}
                onClose={onConfirmationClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Confirm Payment?
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            <Heading size="sm">Order Summary</Heading>
                            <ItemsTable completeOrder={completeOrder} />
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onConfirmationClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="green" onClick={checkout} ml={3}>
                                Confirm
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
})