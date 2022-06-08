import { Box, Heading } from '@chakra-ui/react';
import SampleMenu from "../mocks/restuarantMenuMock.json";
import RestaurantMenuSection from './RestaurantMenuSection';

const RestaurantMenu = () => {

  return (
    <Box>
      <Box
        p="30px"
        bg="orange"
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
        <RestaurantMenuSection sectionName="Starters" menuItems={SampleMenu.starters} />
        <RestaurantMenuSection sectionName="Mains" menuItems={SampleMenu.mains}/>
        <RestaurantMenuSection sectionName="Desserts" menuItems={SampleMenu.desserts}/>
      </Box>
    </Box>
  );
};

export default RestaurantMenu;
