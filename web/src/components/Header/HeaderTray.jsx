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
  Image,
} from '@chakra-ui/react';
import MainLogo from './../../assets/main-logo.png';

import { HamburgerIcon, CalendarIcon } from '@chakra-ui/icons';

// Button that opens tray when pressed!
const HeaderTray = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // We will change this arr to a json arr in future to add urls and corresponding icons
  const menuItems = ['Orders', 'Favorites', 'Payment', 'Help', 'Account'];
  return (
    <>
      <HStack w="100%">
        <Button colorScheme="gray" onClick={onOpen}>
          <HamburgerIcon />
        </Button>
        <Image src={MainLogo} h="40px" />
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
            <Box w="100%" p="1px">
              {menuItems.map((entry, index) => {
                return (
                  <HStack p="10px" key={index}>
                    <CalendarIcon w={6} h={6} />
                    <Text fontSize="20px">{entry}</Text>
                  </HStack>
                );
              })}
            </Box>
          </DrawerBody>
          <DrawerFooter>
            <Box w="100%" p="1px">
              <hr />
              <HStack p="10px">
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
