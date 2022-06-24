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
  Circle,
} from '@chakra-ui/react';
import ContentContainer from '../components/ContentContainer';
import { restarauntImageMapping } from '../components/ViewOrderModal';

const GroupOrderPage = () => {
  const [groupOrder, setGroupOrder] = useState();
  const navigate = useNavigate();

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
              <HStack bg="gray.700" w="100%" p="10px" rounded="10px">
                <VStack alignItems="flex-start">
                  <HStack>
                    <Heading color="white">
                      {groupOrder.creatorFirstName} {groupOrder.creatorLastName}
                      's
                    </Heading>
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
                  <Button w="130px" onClick={() => navigate('/menu')}>
                    Add to Order
                  </Button>
                </HStack>
              </HStack>

              <Image
                src={restarauntImageMapping[groupOrder.restaurant]}
                mt="10px"
                h="100px"
                w="1000px"
                maxW="100%"
                borderRadius="10px"
                objectFit="cover"
              />

              <HStack mt="10px" h="40px">
                <Heading>{groupOrder.restaurant}</Heading>
                <HStack
                  border="1px solid gray"
                  rounded="5px"
                  h="100%"
                  px="10px"
                >
                  <Box>
                    <Text>{groupOrder.pickupLocation}</Text>
                  </Box>
                  <Divider h="15px" orientation="vertical" />
                  <Box>
                    <Text>{groupOrder.pickupTime}</Text>
                  </Box>
                </HStack>
              </HStack>

              {/* Render all currently added orders */}
              <HStack mt="30px">
                {groupOrder.orderDetails.map((order, i) => (
                  <Box key={i} h="300px" w="200px" bg="gray.200" rounded="20px">
                    <VStack alignItems="flex-start">
                      {Object.entries(order.orderItems).map(
                        ([item, quantity], i) => (
                          <HStack key={i} mx="auto">
                            <Circle size="30px" bg="gray.700">
                              <Text color="white">{quantity}x</Text>
                            </Circle>
                            <Text textTransform="capitalize">{item}</Text>
                          </HStack>
                        )
                      )}
                    </VStack>
                  </Box>
                ))}
              </HStack>
            </Box>
          ) : (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
              h="500px"
            />
          )}
        </VStack>
      </ContentContainer>
    </VStack>
  );
};

export default GroupOrderPage;
