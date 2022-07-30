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
import EditCardModal from './EditCardModal';

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
    const {
        isOpen: isEditOpen,
        onOpen: onEditOpen,
        onClose: onEditClose,
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
            `https://frienddash-db.herokuapp.com/stripe/paymentMethods/${data.id}`,
            {
                method: 'DELETE',
            }
        );
        if (res.status == 204) {
            onConfirmationClose();
            onClose();
            window.location.reload();
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

                <ModalFooter display={'flex'} justifyContent={'space-between'}>
                    <Button colorScheme="blue" mr={3} onClick={onClose} w="110px">
                        Close
                    </Button>
                    <HStack>
                        <Button
                            colorScheme="teal"
                            w="110px"
                            onClick={onEditOpen}
                        >
                            Edit Card
                        </Button>
                        <Button
                            colorScheme="red"
                            w="110px"
                            onClick={onConfirmationOpen}
                        >
                            Delete Card
                        </Button>
                    </HStack>
                    <ConfirmationModal
                        isOpen={isConfirmationOpen}
                        onClose={onConfirmationClose}
                        title={'Confirm delete card? This cannot be undone'}
                        confirmButton={'Confirm'}
                        cancelButton={'Cancel'}
                        onConfirm={deleteCard}
                    />
                    <EditCardModal
                        pmId={data.id}
                        name={data.billing_details.name}
                        exp_month={data.card.exp_month}
                        exp_year={data.card.exp_year}
                        isOpen={isEditOpen}
                        onClose={onEditClose}
                    />
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
});
