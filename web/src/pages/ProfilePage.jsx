import Header from '../components/Header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from '../components/Profile';
import { Link, useParams } from 'react-router-dom';
import {
  Box,
  Heading,
  Button,
  Image,
  Text,
  VStack,
  Avatar,
} from '@chakra-ui/react';
import { getUserByIdAsync } from '../redux/users/thunk';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';

import NotFound from '../components/NotFound';

// Ref Dynamic Routing: https://reacttraining.com/blog/react-router-v5-1/

const userMock = {
  userName: 'Steven Zhao',
  userProfile: 'https://i.imgur.com/GxUEUe0.jpeg',
  userEmail: 'default1@gmail.com',
  userRating: [4, 5, 2, 3, 5],
  userOrders: ['1', '2', '3'],
  googleId: '123231',
};

const emptyUser = {
  userName: '',
  userProfile: '',
  userEmail: '',
  userRating: [],
  userOrders: [],
  googleId: 'sad33aas',
};

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

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:5000/users/${id}`);
      const json = await res.json();
      console.log(json);
      if (res.status == '200') {
        setUser(json);
      }
    })();
  }, []);

  // get id from url
  // do fetch/get req from db for this user id
  // show user profile info and ratings

  //   <Box align="center">
  //   {' '}
  //   <Box marginTop="10%" align="center">
  //     <Heading>Welcome Wanderer!</Heading>
  //   </Box>
  //   <Login />
  // </Box>

  return (
    <Box>
      {/* <Header /> */}

      {Object.keys(user).length > 1 ? (
        <>
          <Box
            marginTop="6%"
            align="center"
            p="30px"
            bg="gray.300"
            // w={{ lg: '600px', md: '600px', base: '100%' }}
            w="100%"
            h="300px"
            borderRadius="10px"
          >
            {' '}
            <Avatar size="2xl" name={user.userName} src={user.userProfile} />
            <Heading size="xl" pt="9px">
              {user.userName}
            </Heading>
            <Heading size="l" pt="9px">
              Average User Rating:{' '}
              {user.userRating.reduce((a, b) => a + b, 0) /
                user.userRating.length}
              <br />
              User ID: {id}
              <br />
              Total Orders: {user.userOrders.length}
            </Heading>
          </Box>
          <Box
            align="center"
            p="30px"
            bg="gray.200"
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
                  backgroundColor="blue.100"
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
