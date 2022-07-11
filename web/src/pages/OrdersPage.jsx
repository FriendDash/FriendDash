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
  Select,
} from '@chakra-ui/react';
import Header from '../components/Header/Header';

import { getOrdersAsync } from '../redux/orders/thunk';
import { useSelector, useDispatch } from 'react-redux';
import GroupOrderManageCard from '../components/GroupCard/GroupOrderManageCard';
import ContentContainer from '../components/ContentContainer';

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
    <VStack>
      <Header />
      <Box paddingTop="50px">
        <ContentContainer>
          <Heading textAlign="center" my="20px">
            Created By You
          </Heading>
          <VStack spacing="20px">
            {creatorOrders.map(order => (
              <GroupOrderManageCard groupOrder={order} isCreator={true} />
            ))}
          </VStack>
          <Heading textAlign="center" my="20px">
            Orders You Are Part Of
          </Heading>

          <VStack spacing="20px">
            {otherOrders.map(order => (
              <GroupOrderManageCard groupOrder={order} isCreator={false} />
            ))}
          </VStack>
        </ContentContainer>
      </Box>
    </VStack>
  );
};

export default OrdersPage;
