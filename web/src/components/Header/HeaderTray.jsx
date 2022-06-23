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
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

// Button that opens tray when pressed!
const HeaderTray = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState({});

  // https://developers.google.com/identity/gsi/web/guides/display-button#javascript
  // https://stackoverflow.com/questions/65234862/how-to-define-variable-google-when-using-google-one-tap-javascript-api

  const handleCredentialResponse = res => {
    console.log('Encoded JWT ID token: ' + res.credential);
    let userObject = jwt_decode(res.credential);
    console.log(userObject);
    setUser(userObject); // use redux and store this locally
  };

  useEffect(() => {
    // global google
    window.google.accounts.id.initialize({
      client_id:
        '635249974359-roi2pf1k7cirel6f972pm15ra4duocbo.apps.googleusercontent.com',
      callback: handleCredentialResponse,
    });
    window.google.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      { theme: 'filled_blue', size: 'large', type: 'standard' } // customization attributes
    );
    window.google.accounts.id.prompt(); // also display the One Tap dialog
  }, []);

  // We will change this arr to a json arr in future to add urls and corresponding icons
  const menuItems = ['Orders', 'Favorites', 'Payment', 'Help', 'Account'];

  return (
    <>
      <HStack w="100%" display="flex" justifyContent="space-between">
        <HStack>
          <Button colorScheme="gray" onClick={onOpen}>
            <HamburgerIcon />
          </Button>
          <Image src={MainLogo} h="40px" />
          <Text fontSize="xl" as="b">
            FriendDash
          </Text>
        </HStack>
        <div id="signInDiv"></div>
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
              {/* <HStack p="10px">
                <CalendarIcon w={6} h={6} />
                <Text fontSize="20px">Logout</Text>
              </HStack> */}

              {/*  This handles google oauth */}
            </Box>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default HeaderTray;
