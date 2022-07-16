import {
    Box,
    Heading,
    VStack,
    Image,
    Text,
    Button
} from '@chakra-ui/react';
import Header from '../components/Header/Header';
import SavedCard from '../components/SavedCard';
import { useEffect, useState } from 'react';

const PaymentPage = () => {
    const [paymentMethods, setPaymentMethods] = useState([]);
    const userStripeId = JSON.parse(localStorage.getItem('userSession_FriendDash')).stripeId;
    useEffect(() => {
        async function getPaymentMethods() {
            const res = await fetch(`http://localhost:5000/stripe/paymentMethods/${userStripeId}`, {
                method: 'GET',
            });
            const json = await res.json();
            setPaymentMethods(json.data);
        }
        getPaymentMethods();
    }, []);


    return (
        <VStack>
            <Header />
            <Box paddingTop={'50px'}>
                <VStack>
                    <Heading textAlign='center' my='20px'>
                        Your Payment Methods
                    </Heading>
                    <Box borderColor={'black'} borderStyle='solid' borderWidth={'2px'}>
                        {paymentMethods.map(
                            paymentMethod => <SavedCard cardType={paymentMethod.card.brand} lastFour={paymentMethod.card.last4} />
                        )}
                    </Box>
                </VStack>
                <VStack>
                    <Heading textAlign='center' my='20px'>
                        Add a Payment Method
                    </Heading>
                    <form action={`http://localhost:5000/stripe/${userStripeId}/create-checkout-session`} method='POST'>
                        <Button cursor={'pointer'} padding='25px' borderColor='gray' borderStyle='solid' borderWidth={'2px'} type='submit' marginBottom={'50px'}>
                            <Image width={'50px'} src='https://cdn3.iconfinder.com/data/icons/leto-finance-money-1/64/credit_card_new_add_plus-256.png' alt='Add credit card' />
                            <Text>Add a new credit/debit card</Text>
                        </Button>
                    </form>
                </VStack>
            </Box>
        </VStack>
    );
};

export default PaymentPage;