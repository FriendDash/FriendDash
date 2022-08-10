import React, { useState } from 'react';
import {
  chakra,
  Center,
  Heading,
  VStack,
  Button,
  Spacer,
  Box,
  ChakraProvider,
  useDisclosure,
} from '@chakra-ui/react';
import { PhoneIcon, AddIcon, WarningIcon } from '@chakra-ui/icons';

import GroupCard from './GroupCard';
import CreateGroupForm from '../CreateGroupForm';

export default chakra(function GroupOrderNew({ className }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = await JSON.parse(localStorage.getItem('userSession_FriendDash'));

  return (
    <Box>
      <GroupCard className={className}>
        <Center>
          <VStack>
            <Heading textAlign="center" size="sm">
              Don't See Your Restaurant Here?
            </Heading>

            <Box h="10px" />

            <Button colorScheme="teal" w="50px" h="50px" rounded="25px" disabled={user.userName === "Foodie"} >
              <AddIcon w={6} h={6} onClick={onOpen} />
            </Button>

            <CreateGroupForm isOpen={isOpen} onClose={onClose} />

            <Box h="10px" />

            <Heading textAlign="center" size="sm">
              Create a Group Order
            </Heading>
          </VStack>
        </Center>
      </GroupCard>
    </Box>
  );
});
