import React, { useState, useEffect } from 'react';

import { Box, VStack, Heading } from '@chakra-ui/react';
import Header from '../components/Header/Header';
import GroupOrderManageCard from '../components/OrderHistory/GroupOrderManageCard';
import ContentContainer from '../components/ContentContainer';

import { signedOutUserObject } from '../utils/SignedOutUserObject';

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
        `https://frienddash-db.herokuapp.com/orders/getUserOrders/${user.googleId}`
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
              <GroupOrderManageCard
                key={order._id}
                groupOrder={order}
                isCreator={true}
              />
            ))}
          </VStack>
          <Heading textAlign="center" mt="60px" mb="20px">
            Orders You Are Part Of
          </Heading>

          <VStack spacing="20px">
            {otherOrders.map(order => (
              <GroupOrderManageCard
                key={order._id}
                groupOrder={order}
                isCreator={false}
                userId={user.googleId}
              />
            ))}
          </VStack>
        </ContentContainer>
      </Box>
    </VStack>
  );
};

export default OrdersPage;
