import { Box, Heading, chakra, IconButton } from '@chakra-ui/react';
import currentMenu2 from '../mocks/restuarantMenuMock.json';
import McDonaldsMenu from '../mocks/McDonalds.json';
import NoriMenu from '../mocks/Nori.json';
import PizzaPizzaMenu from '../mocks/PizzaPizza.json';
import SubwayMenu from '../mocks/Subway.json';
import RestaurantMenuSection from './RestaurantMenuSection';
import ConfirmOrderPopup from './ConfirmOrderPopup';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default chakra(function RestaurantMenu(props) {
  const [starters, setStarters] = useState([]);
  const [mains, setMains] = useState([]);
  const [desserts, setDesserts] = useState([]);
  const [completeOrder, setCompleteOrder] = useState([]);
  const [groupOrder, setGroupOrder] = useState();

  const [currentMenu, setCurrentMenu] = useState(currentMenu2)
  const [restaurantName, setRestaurantName] = useState('')


  // id is the groupOrderId that we wish to update.
  let { id } = useParams();
  const combineOrders = (starters, mains, desserts) => {
    const completedOrder = [...starters, ...mains, ...desserts];
    setCompleteOrder(completedOrder);
  };

  const quantityGTZero = items => {
    return items.filter(item => item.quantity > 0);
  };

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `https://frienddash-db.herokuapp.com/orders/${id}`
      );
      const json = await res.json();

      setGroupOrder(json);
      switch (json.restaurant){
        case "McDonalds":
            setCurrentMenu(McDonaldsMenu);
            break;
        case "Pizza Pizza":
            setCurrentMenu(PizzaPizzaMenu);
            break;
        case "Subway":
            setCurrentMenu(SubwayMenu); 
            break;
        case "Nori Bento & Udon":
            setCurrentMenu(NoriMenu); 
            break;
      }

    })();
  }, []);
  


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
          {currentMenu.name} Menu:
        </Heading>
        <RestaurantMenuSection
          sectionName="Starters"
          menuItems={currentMenu.starters}
          quantityGTZero={quantityGTZero}
          orderSoFar={starters}
          setOrderItem={setStarters}
        />
        <RestaurantMenuSection
          sectionName="Mains"
          menuItems={currentMenu.mains}
          quantityGTZero={quantityGTZero}
          orderSoFar={mains}
          setOrderItem={setMains}
        />
        <RestaurantMenuSection
          sectionName="Desserts"
          menuItems={currentMenu.desserts}
          quantityGTZero={quantityGTZero}
          orderSoFar={desserts}
          setOrderItem={setDesserts}
        />
        <ConfirmOrderPopup
          groupOrder={groupOrder}
          combineOrders={combineOrders}
          starters={starters}
          mains={mains}
          desserts={desserts}
        />
      </Box>
    </Box>
  );
});
