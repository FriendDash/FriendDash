import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Text,
  Button,
  HStack,
  Avatar,
  Box,
  DrawerFooter,
} from '@chakra-ui/react';

import { HamburgerIcon, CalendarIcon } from '@chakra-ui/icons';

// Button that opens tray when pressed!
const HeaderTray = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <HStack width="100%">
        <Button colorScheme="gray" onClick={onOpen}>
          <HamburgerIcon />
        </Button>
        <Text fontSize="xl" as="b">
          FriendDash
        </Text>
      </HStack>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            <HStack>
              <Avatar
                name="Dan Abrahmov"
                size="lg"
                src="https://bit.ly/dan-abramov"
              />
              <Box>
                <Text>Dan Abrahmov</Text>
                <Text fontSize="md">View Profile</Text>
              </Box>
            </HStack>
          </DrawerHeader>
          <DrawerBody>
            <Box width="100%" padding="1px">
              <HStack padding="10px">
                <CalendarIcon w={6} h={6} />
                <Text fontSize="20px">Orders</Text>
              </HStack>
              <HStack padding="10px">
                <CalendarIcon w={6} h={6} />
                <Text fontSize="20px">Favorites</Text>
              </HStack>
              <HStack padding="10px">
                <CalendarIcon w={6} h={6} />
                <Text fontSize="20px">Payment</Text>
              </HStack>
              <HStack padding="10px">
                <CalendarIcon w={6} h={6} />
                <Text fontSize="20px">Help</Text>
              </HStack>
              <HStack padding="10px">
                <CalendarIcon w={6} h={6} />
                <Text fontSize="20px">Account</Text>
              </HStack>
            </Box>
          </DrawerBody>
          <DrawerFooter>
            <Box width="100%" padding="1px">
              <hr />
              <HStack padding="10px">
                <CalendarIcon w={6} h={6} />
                <Text fontSize="20px">Logout</Text>
              </HStack>
            </Box>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default HeaderTray;
