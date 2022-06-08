import React from 'react';
import {
  chakra,
  Center,
  Heading,
  VStack,
  Button,
  Spacer,
  Box,
} from '@chakra-ui/react';
import { PhoneIcon, AddIcon, WarningIcon } from '@chakra-ui/icons';

import GroupCard from './GroupCard';

export default chakra(function GroupOrderNew({ className }) {
  return (
    <GroupCard className={className}>
      <Center>
        <VStack>
          <Heading textAlign="center" size="sm">
            Don't See Your Restaurant Here?
          </Heading>

          <Box h="10px" />

          <Button colorScheme="teal" w="50px" h="50px" rounded="25px">
            <AddIcon w={6} h={6} />
          </Button>

          <Box h="10px" />

          <Heading textAlign="center" size="sm">
            Create a Group Order
          </Heading>
        </VStack>
      </Center>
    </GroupCard>
  );
});
