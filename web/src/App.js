import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import theme from './theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box>Hello World</Box>
    </ChakraProvider>
  );
}

export default App;
