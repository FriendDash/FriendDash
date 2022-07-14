import React from 'react';
import { chakra, Flex, useColorModeValue } from '@chakra-ui/react';

export default chakra(function GroupCard({ className, children }) {
  const bg = useColorModeValue('gray.50', 'gray.700');
  const bgHover = useColorModeValue('gray.100', 'gray.500');
  return (
    <Flex
      className={className}
      justify="center"
      w="300px"
      h="244px"
      bg={bg}
      p="7px"
      rounded="10px"
      _hover={{
        bg: { bgHover },
        transform: 'scale(1.05)',
        boxShadow: '5px 5px 15px rgba(0,0,0,0.1)',
      }}
      transition="0.2s ease"
    >
      {children}
    </Flex>
  );
});
