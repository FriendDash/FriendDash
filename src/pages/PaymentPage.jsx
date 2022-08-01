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
  const userStripeId =
    localStorage.getItem('userSession_FriendDash') != null
      ? JSON.parse(localStorage.getItem('userSession_FriendDash')).stripeId
      : 0;
  const userAccountId =
    localStorage.getItem('userSession_FriendDash') != null
      ? JSON.parse(localStorage.getItem('userSession_FriendDash')).accountId
      : 0;
  const [onboarded, setOnboarded] = useState(false);
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

    async function isOnboarded() {
      if (userAccountId) {
        const res = await fetch(
          `https://frienddash-db.herokuapp.com/stripe/accounts/${userAccountId}`,
          {
            method: 'GET',
          }
        );
        if (res.status == 200) {
          const json = await res.json();
          setOnboarded(json.charges_enabled);
        } else {
          setOnboarded(false);
        }
      } else {
        setOnboarded(false);
      }
    }
    getPaymentMethods();
    isOnboarded();
  }, []);

  return (
    <Box>
      <Header />
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
                    data={paymentMethod}
                    mode='view'
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
            {
              !onboarded && userAccountId != 0 &&
              <VStack>
                <Heading textAlign="center" my="20px">
                  Create Your Stripe Connected Account to Receive Payments!
                </Heading>
                <form
                  action={`https://frienddash-db.herokuapp.com/stripe/accountLink/${userAccountId}`}
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
                    <Text>Create Account</Text>
                  </Button>
                </form>
              </VStack>
            }
          </Box>
        </VStack>
      )}
      {stripeConnected === null && (
        <Spinner position={'fixed'} top={'50%'} left={'50%'} />
      )}
      {stripeConnected === false && (
        <Box mt="60px">
          <NotFound element={'Your Stripe account'} />
        </Box>
      )}
    </Box>
  );
};

export default PaymentPage;
