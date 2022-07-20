import React from 'react';
import { chakra, Spinner } from '@chakra-ui/react';

export default chakra(function LoadingSpinner({ className }) {
  return (
    <Spinner
      className={className}
      thickness="8px"
      speed="0.8s"
      emptyColor="gray.200"
      color="blue.500"
      boxSize="300px"
    />
  );
});
