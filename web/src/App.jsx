import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import theme from './theme';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/register" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
