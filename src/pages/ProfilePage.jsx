import Header from '../components/Header/Header';

import { useParams } from 'react-router-dom';
import {
  Box,
  Heading,
  Avatar,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Button,
  useToast,
  useClipboard,
  useColorModeValue,
} from '@chakra-ui/react';

import { useEffect } from 'react';
import { useState } from 'react';

import NotFound from '../components/NotFound';

// Ref Dynamic Routing: https://reacttraining.com/blog/react-router-v5-1/

// const userMock = {
//   userName: 'Steven Zhao',
//   userProfile: 'https://i.imgur.com/GxUEUe0.jpeg',
//   userEmail: 'default1@gmail.com',
//   userRating: [4, 5, 2, 3, 5],
//   userOrders: ['1', '2', '3'],
//   googleId: '123231',
// };

// const emptyUser = {
//   userName: '',
//   userProfile: '',
//   userEmail: '',
//   userRating: [],
//   userOrders: [],
//   googleId: 'sad33aas',
// };

const orderItems = [
  {
    menuItem: 'Calimari',
    price: 12,
    quantity: 2,
  },
  {
    menuItem: 'Truffle fries',
    price: 10,
    quantity: 1,
  },
  {
    menuItem: 'Ice Cream',
    price: 18,
    quantity: 1,
  },
  {
    menuItem: 'Green Leaves',
    price: 12,
    quantity: 2,
  },
  {
    menuItem: 'Hot fries',
    price: 10,
    quantity: 1,
  },
  {
    menuItem: 'Vanilla Cream',
    price: 18,
    quantity: 1,
  },
  {
    menuItem: 'Sushi Red',
    price: 12,
    quantity: 2,
  },
  {
    menuItem: 'Pancake',
    price: 10,
    quantity: 1,
  },
  {
    menuItem: 'Chocolate Ice Cream',
    price: 18,
    quantity: 1,
  },
];

const ProfilePage = () => {
  let { id } = useParams();
  const [user, setUser] = useState({});

  const { hasCopied, onCopy } = useClipboard(window.location.href);
  const toast = useToast();
  const bg = useColorModeValue('gray.300', 'black.200');
  const bg2 = useColorModeValue('blue.100', 'gray.500');

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `https://frienddash-db.herokuapp.com/users/${id}`
      );
      const json = await res.json();
      console.log(json);
      if (res.status === 200) {
        setUser(json);
      }
    })();
  }, []);

  return (
    <Box>
      <Header />

      {Object.keys(user).length > 1 ? (
        <>
          <Box
            marginTop="4%"
            align="center"
            p="30px"
            bg={bg}
            // w={{ lg: '600px', md: '600px', base: '100%' }}
            w="100%"
            h="400px"
            borderRadius="10px"
          >
            {' '}
            <Avatar size="2xl" name={user.userName} src={user.userProfile} />
            <Heading size="xl" pt="9px">
              {user.userName}
            </Heading>
            <Heading size="sm" pt="9px">
              Joined: <br /> {new Date(user.createdAt).toLocaleString()}{' '}
            </Heading>
            <StatGroup p="14px">
              <Stat>
                <StatLabel>Average User Rating</StatLabel>
                <StatNumber>
                  {user.userRating.reduce((a, b) => a + b, 0) /
                    user.userRating.length}
                </StatNumber>
              </Stat>
              <Stat>
                <StatLabel>UserID</StatLabel>
                <StatNumber>{user.googleId}</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Total Orders</StatLabel>
                <StatNumber>{user.userOrders.length}</StatNumber>
              </Stat>
            </StatGroup>
            <Button
              ml={0}
              colorScheme="linkedin"
              size="sm"
              variant="outline"
              onClick={() => {
                onCopy();
                toast({
                  title: 'Share Profile',
                  description: `We've copied the profile URL to your clipboard. ${window.location.href}`,
                  status: 'success',
                  duration: 9000,
                  isClosable: true,
                  position: 'bottom',
                });
              }}
            >
              Share Profile
            </Button>
          </Box>
          <Box
            align="center"
            p="30px"
            bg={bg}
            // w={{ lg: '600px', md: '600px', base: '100%' }}
            w="100%"
            h="100%"
            borderRadius="10px"
            overflowY="auto"
          >
            <Heading size="lg" pt="9px">
              Orders
            </Heading>

            {orderItems.map((entry, index) => {
              return (
                <Box
                  key={index}
                  backgroundColor={bg2}
                  padding="20px"
                  margin="10px"
                >
                  {entry.menuItem} x {entry.quantity} @ ${entry.price}
                </Box>
              );
            })}
          </Box>
        </>
      ) : (
        <NotFound element={'User'} />
      )}
    </Box>
  );
};

export default ProfilePage;
