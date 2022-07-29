import React from 'react';
import {
    chakra,
    Box,
    Button,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Heading,
    HStack,
    useDisclosure
} from '@chakra-ui/react';
import ConfirmationModal from './ConfirmationModal';

export default chakra(function ViewCardModal({
    data,
    isOpen,
    onClose,
}) {
    const {
        isOpen: isConfirmationOpen,
        onOpen: onConfirmationOpen,
        onClose: onConfirmationClose,
    } = useDisclosure();
    const styleCardBrand = (brand) => {
        switch (brand) {
            case 'visa':
                return 'Visa';
            case 'mastercard':
                return 'MasterCard';
        }
    }
    
    async function deleteCard() {
        const res = await fetch(
            //TODO: change url when done testing
            `http://localhost:5000/stripe/paymentMethods/${data.id}`,
            {
                method: 'DELETE',
            }
        );
        if (res.status == 204) {
            onConfirmationClose();
            onClose();
        } else {
            alert('An error has occurred')
        }
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent marginTop='20%'>
                <ModalHeader>{styleCardBrand(data.card.brand)} ending in {data.card.last4}</ModalHeader>
                <ModalCloseButton />

                <ModalBody pt="0px">
                    <HStack w="100%" justifyContent="space-between" px="10px">
                        <Box>
                            <Heading size="sm">Name on Card:</Heading>
                            <Text>{data.billing_details.name}</Text>
                        </Box>
                        <Box>
                            <Heading size="sm">Expiry Date:</Heading>
                            <Text>{data.card.exp_month}/{data.card.exp_year}</Text>
                        </Box>
                    </HStack>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose} w="110px">
                        Close
                    </Button>
                    <Button
                        colorScheme="teal"
                        w="110px"
                        onClick={onConfirmationOpen}
                    >
                        Delete Card
                    </Button>
                    <ConfirmationModal
                        isOpen={isConfirmationOpen}
                        onClose={onConfirmationClose}
                        title={'Confirm delete card? This cannot be undone'}
                        confirmButton={'Confirm'}
                        cancelButton={'Cancel'}
                        onConfirm={deleteCard}
                    />
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
});
