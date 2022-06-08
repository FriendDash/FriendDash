import { Box, SimpleGrid, VStack } from '@chakra-ui/react';
import ContentContainer from '../components/ContentContainer';
import GroupOrderNew from '../components/GroupCard/GroupOrderNew';
import GroupOrderCard from '../components/GroupCard/GroupOrderCard';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header/Header';

import mockData from '../mockData.json';

// Dashboard Page
const DashboardPage = () => {
  return (
    <VStack>
      <Header />
      <Box paddingTop="50px">
        {/* <h1>Dashboard Page</h1> */}
        <SearchBar />
        <ContentContainer>
          <SimpleGrid
            columns={{ lg: 3, base: 1 }}
            justifyItems="center"
            spacing="30px"
          >
            {mockData.groupOrders.map((order, key) => (
              <GroupOrderCard key={key} data={order} />
            ))}
            <GroupOrderNew />
          </SimpleGrid>
        </ContentContainer>
      </Box>
    </VStack>
  );
};

export default DashboardPage;