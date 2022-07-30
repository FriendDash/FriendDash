import {
    chakra,
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

export default chakra(function SelectPaymentModal({ isOpen, onClose }) {
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [stripeConnected, setStripeConnected] = useState(null);
    const [selectedPayment, setSelectedPayment] = useState(0);
    const userStripeId =
        localStorage.getItem('userSession_FriendDash') != null
            ? JSON.parse(localStorage.getItem('userSession_FriendDash')).stripeId
            : 0;

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

    async function onClickSelect () {
        // const res = await fetch(
        //     `http://localhost:5000/stripe/paymentMethods/${data.id}`,
        //     {
        //         method: 'DELETE',
        //     }
        // )
    }

    return (
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
                    >
                        Select
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
})