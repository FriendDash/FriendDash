import React from 'react';
import {
    chakra,
    FormControl,
    Button,
    FormLabel,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    HStack,
    NumberInputField,
    NumberInput,
    Text
} from '@chakra-ui/react';
import { useState } from 'react';

export default chakra(function EditCardModal({
    pmId, name, exp_month, exp_year, isOpen, onClose
}) {
    const [newName, setName] = useState(name);
    const [expiryMonth, setExpiryMonth] = useState(exp_month);
    const [expiryYear, setExpiryYear] = useState(exp_year);
    const currentYear = new Date().getFullYear();

    async function onSubmit() {
        const data = {
            billing_details: { name: newName },
            card: { exp_month: expiryMonth, exp_year: expiryYear }
        }
        const res = await fetch(
            `https://frienddash-db.herokuapp.com/stripe/paymentMethods/${pmId}`,
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }
        )
        if (res.status != 200) {
            alert('An error has occurred');
        }
        onClose();
        window.location.reload();
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent marginTop='20%'>
                <ModalHeader>Edit Card</ModalHeader>
                <ModalCloseButton />

                <ModalBody pt="0px">
                    <HStack w="100%" justifyContent="space-between" px="10px">
                        <FormControl>
                            <FormLabel>Name on Card</FormLabel>
                            <Input
                                type="nameOnCard"
                                value={newName}
                                placeholder="Name"
                                onChange={e => setName(e.target.value)}
                                required
                                marginBottom={'10px'}
                            />
                            <FormLabel>Expiry Date</FormLabel>
                            <HStack>
                                <NumberInput
                                    isRequired
                                    defaultValue={expiryMonth}
                                    min={1}
                                    max={12}
                                    onChange={e => setExpiryMonth(e.target.value)}>
                                    <NumberInputField w='100px' />
                                </NumberInput>
                                <Text fontSize='2xl'>/</Text>
                                <NumberInput
                                    isRequired
                                    defaultValue={expiryYear}
                                    min={currentYear}
                                    max={currentYear + 20}
                                    onChange={e => setExpiryYear(e.target.value)}>
                                    <NumberInputField w='120px' />
                                </NumberInput>
                            </HStack>
                        </FormControl>
                    </HStack>
                </ModalBody>

                <ModalFooter display={'flex'} justifyContent={'space-between'}>
                    <Button colorScheme="blue" mr={3} onClick={onClose} w="110px">
                        Close
                    </Button>
                    <Button
                        colorScheme="teal"
                        w="110px"
                        onClick={onSubmit}
                    >
                        Submit
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
})