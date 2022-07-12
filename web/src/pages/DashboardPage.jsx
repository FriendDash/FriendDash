import { useState, useEffect } from 'react';
import { Box, SimpleGrid, VStack, Select, HStack, Checkbox } from '@chakra-ui/react';
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
  let ordersFromReduxStore = useSelector(state => state.reducer.orders.list);
  const [filteredOrders, setFilteredOrders] = useState(ordersFromReduxStore);
  const [searchValue, setSearchValue] = useState('');
  const [completedFilter, setCompletedFilter] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [closedFilter, setClosedFilter] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersAsync());
  }, []);

  useEffect(()=>{
    setFilteredOrders(ordersFromReduxStore);
  },[ordersFromReduxStore]);

  useEffect(()=> {
    updateList();
  }, [openFilter, closedFilter, completedFilter]);

  useEffect(()=> {
    sortOrders(sortBy);
  }, [sortBy]);

  const handleChange = (e) => {
    if (e.target.name === 'open') {
      setOpenFilter(openFilter => !openFilter);
    } else if (e.target.name === 'closed') {
      setClosedFilter(closedFilter => !closedFilter);
    } else if (e.target.name === 'completed') {
      setCompletedFilter(completedFilter => !completedFilter);
    }
  }

  const updateList = () => {
    if (!openFilter && !closedFilter && !completedFilter) {
      setFilteredOrders(ordersFromReduxStore)
    } else {
      var tempOrders = openFilter ? ordersFromReduxStore.filter(order => order.orderStatus === 'open') : [];
      tempOrders = tempOrders.concat(closedFilter ? ordersFromReduxStore.filter(order => order.orderStatus === 'closed') : []);
      tempOrders = tempOrders.concat(completedFilter ? ordersFromReduxStore.filter(order => order.orderStatus === 'completed') : []);
      setFilteredOrders(tempOrders);
    }
  }

  const sortOrders = (sortBy) => {
    if (sortBy === 'name asc') {
      setFilteredOrders([...filteredOrders].sort((a, b) => (a.restaurant < b.restaurant ? -1 : 1)));
    } else if (sortBy === 'name desc') {
      setFilteredOrders([...filteredOrders].sort((a, b) => (a.restaurant > b.restaurant ? -1 : 1)));
    } else if (sortBy === 'time asc') {
      setFilteredOrders([...filteredOrders].sort((a, b) => (a.pickupTime < b.pickupTime ? -1 : 1)));
      console.log(filteredOrders)
    } else if (sortBy === 'time desc') {
      setFilteredOrders([...filteredOrders].sort((a, b) => (a.pickupTime > b.pickupTime ? -1 : 1)));
      console.log(filteredOrders)
    } else if (sortBy === 'members asc') {
      setFilteredOrders([...filteredOrders].sort((a, b) => (a.maxSize < b.maxSize ? -1 : 1)));
    } else if (sortBy === 'members desc') {
      setFilteredOrders([...filteredOrders].sort((a, b) => (a.maxSize > b.maxSize ? -1 : 1)));
    }
  }

  return (
    <VStack>
      <Header />
      <Box paddingTop="50px">
        {/* <h1>Dashboard Page</h1> */}
        <ContentContainer>
          <SearchBar handleChange={setSearchValue} mb="20px" />
          <HStack paddingBottom={'10px'} display='flex' justifyContent={'space-between'}>
            <HStack>
              <Checkbox name='open'
                checked={openFilter}
                onChange={handleChange}
              >
                Open
              </Checkbox>
              <Checkbox name='closed'
                checked={closedFilter}
                onChange={handleChange}
              >
                Closed
              </Checkbox>
              <Checkbox name='completed'
                checked={completedFilter}
                onChange={handleChange}
              >
                Completed
              </Checkbox>
            </HStack>
            <Select placeholder='Sort By' w='20%' onChange={(e) => setSortBy(e.target.value)}>
              <option value='name asc'>Restaurant Name A-Z</option>
              <option value='name desc'>Restaurant Name Z-A</option>
              <option value='time asc'>Pickup Time Earliest</option>
              <option value='time desc'>Pickup Time Latest</option>
              <option value='members asc'>Max. No. of Members Ascending</option>
              <option value='members desc'>Max. No. of Members Descending</option>
            </Select>
          </HStack>
          <SimpleGrid
            columns={{ lg: 3, base: 1 }}
            justifyItems="center"
            spacing="30px"
          >
            {filteredOrders.map(
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
