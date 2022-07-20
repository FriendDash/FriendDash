import {
  chakra,
  Heading,
  Divider,
} from '@chakra-ui/react';
import RestaurantMenuItem from './RestaurantMenuItem';

export default chakra(function RestaurantMenuSection(props){
  return (
    <div>
      <Divider />
      <Heading size="lg" ml="18px" pt="9px">
        {props.sectionName}
      </Heading>
      {props.menuItems.map(item => {
        return <RestaurantMenuItem key={item.dishName} menuItem={item} orderSoFar={props.orderSoFar} setOrderItem={props.setOrderItem} quantityGTZero={props.quantityGTZero}/>;
      })}
      <br/>
    </div>
  );
});
