import { useState, useEffect } from 'react';

import Header from '../components/Header/Header';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  VStack,
  Heading,
  HStack,
  Button,
  Spacer,
  Text,
  Image,
  Divider,
  Stack,
} from '@chakra-ui/react';
import ContentContainer from '../components/ContentContainer';
import { restaurantImageMapping } from '../utils/RestaurantImageMapping';
import MemberOrderDetail from '../components/Order/MemberOrderDetail';
import LoadingSpinner from '../components/LoadingSpinner';
import { signedOutUserObject } from '../utils/SignedOutUserObject';
import RatingPopup from '../components/RatingPopup';

const GroupOrderPage = () => {
  const [groupOrder, setGroupOrder] = useState();
  const [user, setUser] = useState(() => {
    // getting stored value from localStorage
    const saved = localStorage.getItem('userSession_FriendDash');
    const initialValue = JSON.parse(saved);
    return initialValue || signedOutUserObject;
  });
  const [userInGroup, setUserInGroup] = useState();

  const navigate = useNavigate();
  const isOrderFull = groupOrder?.orderDetails.length >= groupOrder?.maxSize;
  let { id } = useParams();

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `https://frienddash-db.herokuapp.com/orders/${id}`
      );
      const json = await res.json();

      setGroupOrder(json);
      setUserInGroup(json.orderDetails.filter(order => order.orderUserId === user.googleId).length > 0);
    })();
  }, []);

  const getStatusMessage = status => {
    if (status === 'open') {
      return (
        <Box backgroundColor="green.400" rounded="10px" paddingLeft="10px">
          <Heading size="md">Open</Heading>
          <Text>You can modify this order at this time</Text>
        </Box>
      );
    } else if (status === 'closed') {
      return (
        <Box backgroundColor="red.600" rounded="10px" paddingLeft="10px">
          <Heading size="md">Closed</Heading>
          <Text>Order in progress, no more changes can be made!</Text>
        </Box>
      );
    } else if (status === 'completed') {
      return (
        <Box backgroundColor="teal.400" rounded="10px" paddingLeft="10px">
          <Heading size="md">Completed</Heading>
          <Text>Order completed!</Text>
        </Box>
      );
    }
  };

  return (
    <VStack>
      <Header />
      <Box h="40px" />
      <ContentContainer>
        <VStack>
          {groupOrder ? (
            <Box>
              {/* Info Banner */}
              <Stack
                bg="gray.700"
                w="100%"
                p="10px"
                rounded="10px"
                direction={{ lg: 'row', base: 'column' }}
                alignItems="center"
              >
                <VStack alignItems={{ lg: 'flex-start', base: 'center' }}>
                  <Stack
                    direction={{ lg: 'row', base: 'column' }}
                    alignItems="center"
                  >
                    <Heading color="white">{groupOrder.creatorName}'s</Heading>
                    <Heading color="whiteAlpha.800">Group Order</Heading>
                  </Stack>
                  <Text color="white">
                    Large orders may take longer to prepare
                  </Text>
                </VStack>
                <Spacer />
                <Stack
                  direction={{ lg: 'row', base: 'column' }}
                  alignItems="center"
                >
                  <Button w="130px" onClick={() => navigate('/dashboard')}>
                    Go Back
                  </Button>
                  <Button
                    disabled={isOrderFull || groupOrder.orderStatus !== 'open' || userInGroup}
                    w="130px"
                    onClick={() => navigate(`/menu/${id}`)}
                  >
                    Add to Order
                  </Button>
                  {(groupOrder.orderStatus !== 'open' && groupOrder.orderStatus !== 'inProgress') &&
                    groupOrder.orderDetails.find(
                      order => order.orderUserId === user.googleId
                    ) &&
                    groupOrder.creatorUserId != user.googleId && (
                      <RatingPopup
                        groupCreatorUserId={groupOrder.creatorUserId}
                        groupCreatorName={groupOrder.creatorName}
                      />
                    )}
                </Stack>
              </Stack>

              {/* Order Full Banner */}
              {isOrderFull && (
                <Box bg="red" rounded="10px" p="10px" mt="10px">
                  <Heading size="lg" textAlign="center" color="whiteAlpha.900">
                    Sorry! Order is full, please find another order
                  </Heading>
                </Box>
              )}

              <Image
                src={restaurantImageMapping[groupOrder.restaurant]}
                mt="10px"
                h="100px"
                w="1120px"
                maxW="100%"
                borderRadius="10px"
                objectFit="cover"
              />

              <Stack
                mt="10px"
                direction={{ lg: 'row', base: 'column' }}
                alignItems="center"
              >
                <Heading>{groupOrder.restaurant}</Heading>
                <HStack
                  border="1px solid gray"
                  rounded="5px"
                  h="100%"
                  px="10px"
                >
                  <Box>
                    <Text color="gray.600">Pick up Location</Text>
                    <Text fontWeight="semibold">
                      {groupOrder.pickupLocation}
                    </Text>
                  </Box>
                  <Divider h="40px" orientation="vertical" />
                  <Box>
                    <Text color="gray.600">Pick up Time</Text>
                    <Text fontWeight="semibold">{groupOrder.pickupTime}</Text>
                  </Box>
                </HStack>
                <Box flexGrow={1} rounded="5px" h="100%">
                  {getStatusMessage(groupOrder.orderStatus)}
                </Box>
              </Stack>

              {/* Render all currently added orders as cards */}
              <MemberOrderDetail mt="20px" groupOrder={groupOrder} />
            </Box>
          ) : (
            <LoadingSpinner />
          )}
        </VStack>
      </ContentContainer>
    </VStack>
  );
};

export default GroupOrderPage;
