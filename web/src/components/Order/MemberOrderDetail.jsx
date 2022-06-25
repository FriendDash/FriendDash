import { chakra, Box, Heading, HStack, Text, Circle } from '@chakra-ui/react';

const colorMapping = {
  0: 'green.600',
  1: 'pink.700',
  2: 'yellow.700',
  3: 'blue.600',
};

export default chakra(function MemberOrderDetail({ className, groupOrder }) {
  return (
    <HStack className={className} spacing="30px">
      {groupOrder.orderDetails.map((order, i) => (
        <Box key={i} h="300px" w="200px" bg="gray.200" rounded="20px">
          <Box alignItems="flex-start">
            <Heading
              size="md"
              textAlign="center"
              w="100%"
              bg={colorMapping[i]}
              color="whiteAlpha.900"
              py="5px"
              borderTopLeftRadius="20px"
              borderTopRightRadius="20px"
            >
              Member {i + 1}
            </Heading>

            {/* Renders order items */}
            <Box px="15px">
              {order.orderItems.map(({ menuItem, quantity }, i) => (
                <HStack key={i} my="10px">
                  <Circle size="25px" bg="gray.700">
                    <Text color="white" fontSize="12px">
                      {quantity}x
                    </Text>
                  </Circle>
                  <Text
                    textTransform="capitalize"
                    fontSize="14px"
                    wordBreak="break-word"
                  >
                    {menuItem}
                  </Text>
                </HStack>
              ))}
            </Box>
          </Box>
        </Box>
      ))}
    </HStack>
  );
});
