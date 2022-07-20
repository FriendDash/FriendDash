import {
  Box,
  Heading,
  VStack,
  Image,
  Text,
  Button,
  Spinner,
} from '@chakra-ui/react';
import Header from '../components/Header/Header';
import SavedCard from '../components/SavedCard';
import { useEffect, useState } from 'react';
import NotFound from '../components/NotFound';

const PaymentPage = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [stripeConnected, setStripeConnected] = useState(null);
  const userStripeId = JSON.parse(
    localStorage.getItem('userSession_FriendDash')
  ).stripeId;
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

  return (
    <Box>
      {stripeConnected && (
        <VStack>
          <Header />
          <Box paddingTop={'50px'}>
            <VStack>
              <Heading textAlign="center" my="20px">
                Your Payment Methods
              </Heading>
              <Box
                borderColor={'black'}
                borderStyle="solid"
                borderWidth={'2px'}
              >
                {paymentMethods.map(paymentMethod => (
                  <SavedCard
                    cardType={paymentMethod.card.brand}
                    lastFour={paymentMethod.card.last4}
                  />
                ))}
              </Box>
            </VStack>
            <VStack>
              <Heading textAlign="center" my="20px">
                Add a Payment Method
              </Heading>
              <form
                action={`https://frienddash-db.herokuapp.com/stripe/${userStripeId}/create-checkout-session`}
                method="POST"
              >
                <Button
                  cursor={'pointer'}
                  padding="25px"
                  borderColor="gray"
                  borderStyle="solid"
                  borderWidth={'2px'}
                  type="submit"
                  marginBottom={'50px'}
                >
                  <Image
                    width={'50px'}
                    src="https://cdn3.iconfinder.com/data/icons/leto-finance-money-1/64/credit_card_new_add_plus-256.png"
                    alt="Add credit card"
                  />
                  <Text>Add a new credit/debit card</Text>
                </Button>
              </form>
            </VStack>
          </Box>
        </VStack>
      )}
      {stripeConnected === null && (
        <Spinner position={'fixed'} top={'50%'} left={'50%'} />
      )}
      {stripeConnected === false && (
        <NotFound element={'Your Stripe account'} />
      )}
    </Box>
  );
};

export default PaymentPage;
