import { Box, Heading, IconButton } from '@chakra-ui/react';
import SampleMenu from '../mocks/restuarantMenuMock.json';
import RestaurantMenuSection from './RestaurantMenuSection';
import ConfirmOrderPopup from './ConfirmOrderPopup';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import React, { useState } from 'react';

const RestaurantMenu = () => {
  const [starters, setStarters] = useState([]);
  const [mains, setMains] = useState([]);
  const [desserts, setDesserts] = useState([]);
  const [completeOrder, setCompleteOrder] = useState([]);

  const combineOrders = (starters, mains, desserts) => {
    const completedOrder = [...starters, ...mains, ...desserts];
    setCompleteOrder(completedOrder);
  };

  const quantityGTZero = (items) => {
    return items.filter((item) => item.quantity > 0);
  }

  return (
    <Box>
      <Box
        p="30px"
        w={{ lg: '950px', md: '600px', base: '100%' }}
        h="auto"
        borderRadius="10px"
        align="center"
        outline="solid"
        marginTop="10px"
      >
        <Heading size="xl" ml="18px" pt="9px">
          {SampleMenu.name} Menu:
        </Heading>
        <RestaurantMenuSection
          sectionName="Starters"
          menuItems={SampleMenu.starters}
          quantityGTZero={quantityGTZero}
          orderSoFar={starters}
          setOrderItem={setStarters}
        />
        <RestaurantMenuSection
          sectionName="Mains"
          menuItems={SampleMenu.mains}
          quantityGTZero={quantityGTZero}
          orderSoFar={mains}
          setOrderItem={setMains}
        />
        <RestaurantMenuSection
          sectionName="Desserts"
          menuItems={SampleMenu.desserts}
          quantityGTZero={quantityGTZero}
          orderSoFar={desserts}
          setOrderItem={setDesserts}
        />
        <ConfirmOrderPopup combineOrders={combineOrders} starters={starters} mains={mains} desserts={desserts} />
      </Box>
    </Box>
  );
};

export default RestaurantMenu;
