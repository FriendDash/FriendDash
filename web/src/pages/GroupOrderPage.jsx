import { useState, useEffect } from 'react';

import Header from '../components/Header/Header';
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
import ContentContainer from '../components/ContentContainer';
import { restarauntImageMapping } from '../components/ViewOrderModal';
import MemberOrderDetail from '../components/Order/MemberOrderDetail';

const GroupOrderPage = () => {
  const [groupOrder, setGroupOrder] = useState();
  const navigate = useNavigate();
  const isOrderFull = groupOrder?.orderDetails.length >= groupOrder?.maxSize;
  let { id } = useParams();

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:5000/orders/${id}`);
      const json = await res.json();

      setGroupOrder(json);
    })();
  }, []);

  return (
    <VStack>
      <Header />
      <Box h="40px" />
      <ContentContainer>
        <VStack>
          {groupOrder ? (
            <Box>
              {/* Info Banner */}
              <HStack bg="gray.700" w="100%" p="10px" rounded="10px">
                <VStack alignItems="flex-start">
                  <HStack>
                    <Heading color="white">{groupOrder.creatorName}'s</Heading>
                    <Heading color="whiteAlpha.800">Group Order</Heading>
                  </HStack>
                  <Text color="white">
                    Large orders may take longer to prepare
                  </Text>
                </VStack>
                <Spacer />
                <HStack>
                  <Button w="130px" onClick={() => navigate('/dashboard')}>
                    Go Back
                  </Button>
                  <Button
                    disabled={isOrderFull}
                    w="130px"
                    onClick={() => navigate('/menu')}
                  >
                    Add to Order
                  </Button>
                </HStack>
              </HStack>

              {/* Order Full Banner */}
              {isOrderFull && (
                <Box bg="red" rounded="10px" p="10px" mt="10px">
                  <Heading size="lg" textAlign="center" color="whiteAlpha.900">
                    Sorry! Order is full, please find another order
                  </Heading>
                </Box>
              )}

              <Image
                src={restarauntImageMapping[groupOrder.restaurant]}
                mt="10px"
                h="100px"
                w="1000px"
                maxW="100%"
                borderRadius="10px"
                objectFit="cover"
              />

              <HStack mt="10px" h="60px">
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
              </HStack>

              {/* Render all currently added orders as cards */}
              <MemberOrderDetail mt="20px" groupOrder={groupOrder} />
            </Box>
          ) : (
            <Spinner
              thickness="8px"
              speed="0.8s"
              emptyColor="gray.200"
              color="blue.500"
              boxSize="300px"
            />
          )}
        </VStack>
      </ContentContainer>
    </VStack>
  );
};

export default GroupOrderPage;
