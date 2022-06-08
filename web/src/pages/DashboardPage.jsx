import { Box, SimpleGrid, VStack } from '@chakra-ui/react';
import ContentContainer from '../components/ContentContainer';
import GroupCard from '../components/GroupCard';
import SearchBar from '../components/SearchBar';

import mockData from '../mockData.json';

// Dashboard Page
const DashboardPage = () => {
  return (
    <VStack>
      <h1>Dashboard Page</h1>
      <SearchBar />
      <ContentContainer>
        <SimpleGrid
          columns={{ lg: 3, base: 1 }}
          justifyItems="center"
          spacing="30px"
        >
          {mockData.groupOrders.map((order, key) => (
            <GroupCard key={key} data={order} />
          ))}
        </SimpleGrid>
      </ContentContainer>
    </VStack>
  );
};

export default DashboardPage;
