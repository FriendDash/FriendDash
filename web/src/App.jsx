import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import theme from './theme';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/DashboardPage';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RestaurantMenuPage from './pages/RestaurantMenuPage';
import ProfilePage from './pages/ProfilePage';
import GroupOrderPage from './pages/GroupOrderPage';
import AccountsPage from './pages/AccountPage';
import AboutPage from './pages/AboutPage';
import OrdersPage from './pages/OrdersPage';
import PaymentPage from './pages/PaymentPage';
import './App.css';
import RatingPopup from './components/RatingPopup';


const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/home" element={<Dashboard />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/account" element={<AccountsPage />} />
          <Route exact path="/orders" element={<OrdersPage />} />
          <Route path="/menu/:id" element={<RestaurantMenuPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/group/:id" element={<GroupOrderPage />} />
          <Route exact path="/payment" element={<PaymentPage />} />
          <Route exact path="/help" element={<AboutPage />} />
          <Route exact path="/rating" element={<RatingPopup />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
