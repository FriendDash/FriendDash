import {
    HStack,
    Image,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';

import ViewCardModal from '../components/ViewCardModal';

const SavedCard = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <HStack padding='10px' margin={'10px'} borderColor='gray' borderStyle='solid' borderWidth={'2px'} cursor={'pointer'} 
        onClick={onOpen}>
            {
                props.data.card.brand === 'visa' &&
                <Image width={'50px'} src='https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/363_Visa_Credit_Card_logo-1024.png' alt='Visa logo' />
            }
            {
                props.data.card.brand === 'mastercard' &&
                <Image width={'50px'} src='https://cdn3.iconfinder.com/data/icons/payment-method-1/64/_Mastercard-512.png' alt='MasterCard logo'/>
            }
            <Text>**** **** **** {props.data.card.last4}</Text>
            
            <ViewCardModal isOpen={isOpen} onClose={onClose} data={props.data} />
        </HStack>
    )
};

export default SavedCard;