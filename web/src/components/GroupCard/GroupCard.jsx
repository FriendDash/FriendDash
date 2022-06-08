import React from 'react';
import { chakra, Flex } from '@chakra-ui/react';

export default chakra(function GroupCard({ className, children }) {
  return (
    <Flex
      className={className}
      justify="center"
      w="300px"
      h="244px"
      bg="gray.50"
      p="7px"
      rounded="10px"
      _hover={{
        bg: 'gray.100',
        transform: 'scale(1.05)',
        boxShadow: '5px 5px 15px rgba(0,0,0,0.1)',
      }}
      transition="0.2s ease"
    >
      {children}
    </Flex>
  );
});
