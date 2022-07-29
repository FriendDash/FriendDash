import { chakra, Heading, Divider, SimpleGrid } from '@chakra-ui/react';
import RestaurantMenuItem from './RestaurantMenuItem';

export default chakra(function RestaurantMenuSection(props) {
  return (
    <div>
      <Divider />
      <Heading size="lg" py="9px" textAlign="left">
        {props.sectionName}
      </Heading>
      <SimpleGrid columns={{ lg: 2, base: 1 }} spacing={10}>
        {props.menuItems.map(item => {
          return (
            <RestaurantMenuItem
              key={item.dishName}
              menuItem={item}
              orderSoFar={props.orderSoFar}
              setOrderItem={props.setOrderItem}
              quantityGTZero={props.quantityGTZero}
            />
          );
        })}
      </SimpleGrid>
      <br />
    </div>
  );
});
