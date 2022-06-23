import { useState, useEffect } from 'react';
import { Box, SimpleGrid, VStack } from '@chakra-ui/react';
import ContentContainer from '../components/ContentContainer';
import GroupOrderNew from '../components/GroupCard/GroupOrderNew';
import GroupOrderCard from '../components/GroupCard/GroupOrderCard';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header/Header';

// import mockData from '../mockData.json';
import { getOrdersAsync } from '../redux/orders/thunk';
import { useSelector, useDispatch } from 'react-redux';

// Dashboard Page
const DashboardPage = () => {
  const [searchValue, setSearchValue] = useState('');
  let ordersFromReduxStore = useSelector(state => state.orders.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersAsync());
  }, []);

  return (
    <VStack>
      <Header />
      <Box paddingTop="50px">
        {/* <h1>Dashboard Page</h1> */}
        <ContentContainer>
          <SearchBar handleChange={setSearchValue} mb="20px" />
          <SimpleGrid
            columns={{ lg: 3, base: 1 }}
            justifyItems="center"
            spacing="30px"
          >
            {ordersFromReduxStore.map(
              (order, key) =>
                order.restaurant
                  .toLowerCase()
                  .includes(searchValue.toLowerCase()) && (
                  <GroupOrderCard key={key} data={order} />
                )
            )}
            <GroupOrderNew />
          </SimpleGrid>
        </ContentContainer>
      </Box>
    </VStack>
  );
};

export default DashboardPage;
