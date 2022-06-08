import {
  Heading,
  Divider,
} from '@chakra-ui/react';
import RestaurantMenuItem from './RestaurantMenuItem';

const RestaurantMenuSection = props => {
  return (
    <div>
      <Divider />
      <Heading size="lg" ml="18px" pt="9px">
        {props.sectionName}
      </Heading>
      {props.menuItems.map(item => {
        return <RestaurantMenuItem key={item.dishName} menuItem={item} />;
      })}
    </div>
  );
};

export default RestaurantMenuSection;
