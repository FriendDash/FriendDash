import {
    Box,
    Heading,
    HStack,
    VStack,
    Image,
    Text,
    Button
} from '@chakra-ui/react';
import Header from '../components/Header/Header';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51LLIiwFJkD2X0rrAKxtioD3RGqsz0yyNWgJdZVGqkjjjOzGIrRY0E2EjLoLqBCjKj6TqtQ5nyLAZEOKTYF3PpXdO00ClHs67Du');

const PaymentPage = () => {

    return (
        <Box>
            <Header />
            <Box paddingTop={'50px'}>
                <VStack>
                    <Heading textAlign='center' my='20px'>
                        Your Payment Methods
                    </Heading>
                    <Box borderColor={'black'} borderStyle='solid' borderWidth={'2px'}>
                        <HStack padding='10px' margin={'10px'} borderColor='gray' borderStyle='solid' borderWidth={'2px'}>
                            <Image width={'50px'} src='https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/363_Visa_Credit_Card_logo-1024.png' alt='Visa logo'/>
                            <Text>************1234</Text>
                        </HStack>
                        <HStack padding='10px' margin={'10px'} borderColor='gray' borderStyle='solid' borderWidth={'2px'}>
                            <Image width={'50px'} src='https://cdn3.iconfinder.com/data/icons/payment-method-1/64/_Mastercard-512.png' alt='MasterCard logo'/>
                            <Text>************5678</Text>
                        </HStack>
                    </Box>
                </VStack>
                <VStack>
                    <Heading textAlign='center' my='20px'>
                        Add a Payment Method
                    </Heading>
                    <form action='http://localhost:5000/stripe/create-checkout-session' method='POST'>
                        <Button cursor={'pointer'} padding='30px' borderColor='gray' borderStyle='solid' borderWidth={'2px'} type='submit'>
                            <Image width={'50px'} src='https://cdn3.iconfinder.com/data/icons/leto-finance-money-1/64/credit_card_new_add_plus-256.png' alt='Add credit card'/>
                            <Text>Add a new credit/debit card</Text>
                        </Button>
                    </form>
                </VStack>
            </Box>
        </Box>
    );
};

export default PaymentPage;