import RestaurantMenu from '../components/RestaurantMenu';
import { Box } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

const RestaurantMenuPage = () => {
  return (
    <Box align="center">
      <RestaurantMenu />
    </Box>
  );
};

export default RestaurantMenuPage;
