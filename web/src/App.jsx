import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import theme from './theme';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/DashboardPage';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RestaurantMenuPage from './pages/RestaurantMenuPage';
import ProfilePage from './pages/ProfilePage';

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/home" element={<Dashboard />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/menu" element={<RestaurantMenuPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
