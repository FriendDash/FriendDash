import Header from '../components/Header/Header';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Heading,
  Avatar,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Button,
  useToast,
  useClipboard,
  useColorModeValue,
  Image,
  HStack,
  VStack,
  Text,
  Spacer,
  Stack,
} from '@chakra-ui/react';
import StatusTag from '../components/StatusTag';
import NotFound from '../components/NotFound';
import { restaurantImageMapping } from '../utils/RestaurantImageMapping';
import { useNavigate } from 'react-router';

// Ref Dynamic Routing: https://reacttraining.com/blog/react-router-v5-1/

const ProfilePage = () => {
  let { id } = useParams();
  const [user, setUser] = useState({});
  const [getOrders, setGetOrders] = useState([]);

  const { hasCopied, onCopy } = useClipboard(window.location.href);
  const toast = useToast();
  const bg = useColorModeValue('gray.300', 'black.200');
  const bg2 = useColorModeValue('gray.50', 'gray.700');
  const navigate = useNavigate();

  const handleViewOrder = getGroupOrder => {
    navigate(`/group/${getGroupOrder}`);
  };

  useEffect(() => {
    //   GET API Call to get user object
    (async () => {
      const res = await fetch(`https://frienddash-db.onrender.com/users/${id}`);
      const json = await res.json();

      if (res.status === 200) {
        setUser(json);
      }
    })();

    //   GET API Call to get array of order objects with the specific googleId
    (async () => {
      const res2 = await fetch(
        `https://frienddash-db.onrender.com/orders/getUserOrders/${id}`
      );
      const json2 = await res2.json();

      setGetOrders(json2);
    })();
  }, []);

  return (
    <Box>
      <Header />

      {Object.keys(user).length > 1 ? (
        <>
          <Box
            marginTop="70px"
            align="center"
            p="30px"
            bg={bg}
            w="100%"
            borderRadius="10px"
          >
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
              Latest Orders
            </Heading>

            {getOrders
              .sort(function (a, b) {
                // Sort by most recent date first
                return new Date(b.createdAt) - new Date(a.createdAt);
              })
              .map((entry, index) => {
                return (
                  <Box
                    key={index}
                    bg={bg2}
                    padding="20px"
                    margin="10px"
                    borderRadius="20px"
                  >
                    <Stack
                      w="100%"
                      direction={{ lg: 'row', base: 'column' }}
                      alignItems="center"
                    >
                      <Image
                        src={restaurantImageMapping[entry.restaurant]}
                        h="190px"
                        w="315px"
                        borderRadius="10px"
                        objectFit="cover"
                        display={{ lg: 'inline', base: 'none' }}
                      />
                      <VStack alignItems="flex-start">
                        <Heading size="xl">{entry.restaurant}</Heading>
                        <HStack>
                          <Text fontSize="lg">Pickup Time:</Text>
                          <Text fontSize="lg">{entry.pickupTime}</Text>
                        </HStack>
                        <HStack>
                          <Text fontSize="lg">Group Creator:</Text>
                          <Text fontSize="lg">{entry.creatorName}</Text>
                        </HStack>
                        <HStack>
                          <Text fontSize="lg">Users in Order:</Text>
                          <StatusTag
                            fontSize="lg"
                            status={entry.orderDetails.length}
                          />
                        </HStack>

                        <HStack>
                          <Text fontSize="lg">Created:</Text>
                          <Text fontSize="lg">
                            {new Date(entry.createdAt).toLocaleString()}{' '}
                          </Text>
                        </HStack>
                      </VStack>{' '}
                      <Spacer />
                      {/* Buttons */}
                      <VStack pr="10px">
                        <HStack>
                          <Heading size="md">Status:</Heading>
                          <StatusTag status={entry.orderStatus} />
                        </HStack>
                        <Button
                          width="250px"
                          height="50px"
                          rounded="10px"
                          colorScheme="blue"
                          onClick={() => handleViewOrder(entry._id)}
                        >
                          View Order
                        </Button>
                      </VStack>
                    </Stack>
                  </Box>
                );
              })}
          </Box>
        </>
      ) : (
        <Box mt="60px">
          <NotFound element={'User'} />
        </Box>
      )}
    </Box>
  );
};

export default ProfilePage;
