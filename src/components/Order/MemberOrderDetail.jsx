import {
  chakra,
  Box,
  Heading,
  HStack,
  Text,
  Circle,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';

const colorMapping = {
  0: 'green.600',
  1: 'pink.700',
  2: 'yellow.700',
  3: 'blue.600',
  4: 'purple.600',
};

export default chakra(function MemberOrderDetail({ className, groupOrder }) {
  const bg = useColorModeValue('gray.200', 'gray.700');
  return (
    <Stack
      className={className}
      spacing="30px"
      direction={{ lg: 'row', base: 'column' }}
      alignItems="center"
    >
      {groupOrder.orderDetails.map((order, i) => (
        <Box key={i} h="300px" w="200px" bg={bg} rounded="20px">
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
              {JSON.parse(localStorage.getItem('userSession_FriendDash')) !=
              null ? (
                groupOrder.creatorUserId !=
                  JSON.parse(localStorage.getItem('userSession_FriendDash'))
                    .googleId &&
                groupOrder.orderDetails.filter(
                  order =>
                    order.orderUserId ===
                    JSON.parse(localStorage.getItem('userSession_FriendDash'))
                      .googleId
                ).length == 0 ? (
                  <div>Member {i + 1}</div>
                ) : (
                  <a
                    href={`https://frienddash.vercel.app/profile/${groupOrder.orderDetails[i].orderUserId}`}
                  >
                    {groupOrder.orderDetails[i].userName}
                  </a>
                )
              ) : (
                <div>Member {i + 1}</div>
              )}
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
    </Stack>
  );
});
