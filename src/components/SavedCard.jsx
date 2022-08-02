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
    const onClick = () => {
        if (props.mode === 'view') {
            onOpen();
        } else if (props.mode === 'pay') {
            props.onClickPayment(props.index);
        }
    }

    return (
        <HStack borderRadius={'10'} padding='10px' margin={'10px'} borderColor={props.selected ? 'blue' : 'gray'} borderStyle='solid' borderWidth={'2px'} cursor={props.mode === 'static' ? 'auto' : 'pointer'}
            onClick={onClick}>
            {
                props.data.card.brand === 'visa' &&
                <HStack>
                    <Image width={'50px'} src='https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/363_Visa_Credit_Card_logo-1024.png' alt='Visa logo' />
                    <Text>**** **** **** {props.data.card.last4}</Text>
                </HStack>
            }
            {
                props.data.card.brand === 'mastercard' &&
                <HStack>
                    <Image width={'50px'} src='https://cdn3.iconfinder.com/data/icons/payment-method-1/64/_Mastercard-512.png' alt='MasterCard logo' />
                    <Text>**** **** **** {props.data.card.last4}</Text>
                </HStack>
            }
            {
                props.data.card.brand === 'amex' &&
                <HStack>
                    <Image width={'50px'} src='https://cdn2.iconfinder.com/data/icons/credit-cards-6/156/american_express-256.png' alt='Amex logo' />
                    <Text>**** ****** *{props.data.card.last4}</Text>
                </HStack>
            }

            <ViewCardModal isOpen={isOpen} onClose={onClose} data={props.data} />
        </HStack>
    )
};

export default SavedCard;