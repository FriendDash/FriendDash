import { Heading, Text } from '@chakra-ui/react';

const RestaurantMenuItem = ({menuItem}) => {

  return (
      <span padding="5px">
          <Heading size="md">
            {menuItem.dishName}
          </Heading>
          <Text size="md">
              {menuItem.description}
          </Text>
          <Heading size="md">
            ${menuItem.price}
          </Heading>
      </span>
  );
};

export default RestaurantMenuItem;
