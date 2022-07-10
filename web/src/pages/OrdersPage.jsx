import React, { useState, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  VStack,
  Heading,
  HStack,
  Spinner,
  Button,
  Spacer,
  Text,
  Image,
  Divider,
} from '@chakra-ui/react';
import Header from '../components/Header/Header';

import { getOrdersAsync } from '../redux/orders/thunk';
import { useSelector, useDispatch } from 'react-redux';

const OrdersPage = () => {
  // getOrders contains filter results of orders where the associated googleId is either the creatorUserId or orderDetails.orderUserId
  const [getOrders, setGetOrders] = useState([]);

  const [creatorOrders, setCreatorOrders] = useState([]);
  const [otherOrders, setOtherOrders] = useState([]);

  useEffect(() => {
    const creator = getOrders.filter(
      entry => entry.creatorUserId === user.googleId
    );
    const other = getOrders.filter(entry => {
      return (
        entry.creatorUserId !== user.googleId &&
        entry.orderDetails.filter(order => order.orderUserId === user.googleId)
      );
    });

    setCreatorOrders(creator);
    setOtherOrders(other);
  }, [getOrders]);

  const signedOutUserObject = {
    createdAt: '',
    googleId: '0',
    updatedAt: '',
    userEmail: '',
    userName: 'Foodie',
    userOrders: [],
    userProfile: '',
    userRating: [],
  };

  const [user, setUser] = useState(() => {
    // getting stored value from localStorage
    const saved = localStorage.getItem('userSession_FriendDash');
    const initialValue = JSON.parse(saved);
    return initialValue || signedOutUserObject;
  });

  //   GET API Call to get array of order objects with the specific googleId
  useEffect(() => {
    (async () => {
      const res = await fetch(
        `http://localhost:5000/orders/getUserOrders/${user.googleId}`
      );
      const json = await res.json();

      setGetOrders(json);
    })();
  }, []);

  return (
    <Box>
      <Header />
      <VStack mt="68px">
        <Heading>Created by You</Heading>
        <Box w="800px" bg="pink.400">
          {creatorOrders.map(order => (
            <VStack border="1px solid yellow" my="20px">
              <Text>Restaurant: {order.restaurant}</Text>
              <Text>Creator Name: {order.creatorName}</Text>
              <Text>Order ID: {order.orderId}</Text>
              <Text>Creator ID: {order.creatorUserId}</Text>
              <Text>Order Status: {order.orderStatus}</Text>
            </VStack>
          ))}
        </Box>
        <Heading>Orders You Are Part of</Heading>
        <Box w="800px" bg="pink.400">
          {otherOrders.map(order => (
            <VStack border="1px solid yellow" my="20px">
              <Text>Restaurant: {order.restaurant}</Text>
              <Text>Creator Name: {order.creatorName}</Text>
              <Text>Order ID: {order.orderId}</Text>
              <Text>Creator ID: {order.creatorUserId}</Text>
              <Text>Order Status: {order.orderStatus}</Text>
              {order.orderDetails.map(entry => (
                <Text color="red">{entry.orderUserId}</Text>
              ))}
            </VStack>
          ))}
        </Box>
        {/* <pre>{JSON.stringify(getOrders, null, 2)}</pre> */}
      </VStack>
    </Box>
  );
};

export default OrdersPage;
