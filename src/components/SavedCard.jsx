import {
    HStack,
    Image,
    Text,
} from '@chakra-ui/react';

const SavedCard = (props) => {
    return (
        <HStack padding='10px' margin={'10px'} borderColor='gray' borderStyle='solid' borderWidth={'2px'}>
            {
                props.cardType === 'visa' &&
                <Image width={'50px'} src='https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/363_Visa_Credit_Card_logo-1024.png' alt='Visa logo' />
            }
            {
                props.cardType === 'mastercard' &&
                <Image width={'50px'} src='https://cdn3.iconfinder.com/data/icons/payment-method-1/64/_Mastercard-512.png' alt='MasterCard logo'/>
            }
            <Text>************{props.lastFour}</Text>
        </HStack>
    )
};

export default SavedCard;