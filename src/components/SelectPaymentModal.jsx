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
    Button,
    Text,
    Link
} from "@chakra-ui/react";
import React, { useState, useEffect } from 'react';
import SavedCard from "./SavedCard";
import ItemsTable from "./ItemsTable";

export default chakra(function SelectPaymentModal({ isOpen, onClose, orderId, userId }) {
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [stripeConnected, setStripeConnected] = useState(null);
    const [userOrder, setUserOrder] = useState({});
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
            const userOrderDetail = order.orderDetails.find(detail => detail.orderUserId === userId);
            setUserOrder(userOrderDetail);
            onConfirmationOpen();
            setTotalCost(
                userOrderDetail.orderItems.reduce(
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
        if (res.status == 200) {
            userOrder.paid = true;
            const res = await fetch(
                `https://frienddash-db.herokuapp.com/orders/editOrderDetail/${orderId}/${userOrder._id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userOrder)
                }
            );
            if (res.status === 200) {
                window.location.reload();
            } else {
                alert('An error has occurred');
            }
        } else {
            alert("An error has occurred")
        }
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent marginTop='20%'>
                    <ModalHeader>Please Select a Payment Method</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {
                            paymentMethods.length > 0 ?
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
                                :
                                <Text>
                                    Oops, you have no payment methods! Please go to the {' '}
                                    <Link color='teal.400' href='/payment'>
                                        Payment Page
                                    </Link>
                                    {' '}to add a payment method.
                                </Text>
                        }

                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose} w="110px">
                            Close
                        </Button>
                        <Button
                            colorScheme="teal"
                            w="110px"
                            disabled={paymentMethods.length === 0}
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
                            <ItemsTable completeOrder={userOrder.orderItems} />
                            <Heading size="sm">Payment Method</Heading>
                            <SavedCard mode='static' data={paymentMethods[selectedPayment]} />
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