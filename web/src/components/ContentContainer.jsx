import React from 'react';
import { Box, chakra } from '@chakra-ui/react';

export default chakra(function ClubCard({ className, children }) {
  return (
    <Box
      className={className}
      w={{ lg: '1000px', base: '100%' }}
      h="100%"
      p="20px"
    >
      {children}
    </Box>
  );
});
