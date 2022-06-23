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
  Icon,
  Link,
} from '@chakra-ui/react';
import MainLogo from './../../assets/main-logo.png';
import { IoMdPower } from 'react-icons/io';

import { HamburgerIcon, CalendarIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

const HeaderTray = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState({});
  const [name, setName] = useState('User');
  const [avatar, setAvatar] = useState('');

  // Refs:
  // https://developers.google.com/identity/gsi/web/guides/display-button#javascript
  // https://stackoverflow.com/questions/65234862/how-to-define-variable-google-when-using-google-one-tap-javascript-api
  // https://www.youtube.com/watch?v=roxC8SMs7HU&t=0s

  // Ref: icon https://react-icons.github.io/react-icons/search?q=iom

  const handleCredentialResponse = res => {
    console.log('Encoded JWT ID token: ' + res.credential);
    let userObject = jwt_decode(res.credential);
    console.log(userObject);
    setUser(userObject); // use redux and store this locally
    document.getElementById('signInDiv').hidden = true;
    setName(userObject.name);
    setAvatar(userObject.picture);
  };

  const handleSignOut = () => {
    setUser({});
    document.getElementById('signInDiv').hidden = false;
    onClose();
    setName('User');
    setAvatar('');
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
    // window.google.accounts.id.prompt(); // also display the One Tap dialog
  }, []);

  // We will change this arr to a json arr in future to add urls and corresponding icons
  const menuItems = [
    { tabName: 'Orders', url: '/orders' },
    { tabName: 'Favorites', url: '/fav' },
    { tabName: 'Payment', url: '/payment' },
    { tabName: 'Help', url: '/help' },
    { tabName: 'Account', url: '/account' },
  ];

  return (
    <>
      <HStack w="100%" display="flex" justifyContent="space-between">
        <HStack>
          <Button colorScheme="gray" onClick={onOpen}>
            <HamburgerIcon />
          </Button>
          <Image src={MainLogo} h="40px" />
          <Text fontSize="xl" as="b">
            FriendDash |
          </Text>{' '}
          {user && (
            <Text fontSize="xl" paddingRight="20px" as="b">
              Hello {name}!
            </Text>
          )}
        </HStack>
        <div id="signInDiv"></div>{' '}
        {Object.keys(user).length > 0 && (
          <HStack
            p="10px"
            onClick={handleSignOut}
            style={{ cursor: 'pointer' }}
          >
            <Icon as={IoMdPower} w={6} h={6} />
            <Text fontSize="20px">Logout</Text>
          </HStack>
        )}
      </HStack>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            <HStack>
              <Avatar name={name} size="lg" src={avatar} />
              <Box>
                <Text>{name}</Text>
                <Text fontSize="md">View Profile</Text>
              </Box>
            </HStack>
          </DrawerHeader>
          <DrawerBody>
            <Box w="100%" p="1px">
              {menuItems.map((entry, index) => {
                return (
                  <a href={entry.url} style={{ textDecoration: 'none' }}>
                    <HStack p="10px" key={index}>
                      <CalendarIcon w={6} h={6} />
                      <Text fontSize="20px">{entry.tabName}</Text>
                    </HStack>
                  </a>
                );
              })}
            </Box>
          </DrawerBody>
          <DrawerFooter>
            <Box w="100%" p="1px">
              <hr />
              {/*  This handles logout*/}
              {Object.keys(user).length > 0 && (
                <HStack
                  p="10px"
                  onClick={handleSignOut}
                  style={{ cursor: 'pointer' }}
                >
                  <Icon as={IoMdPower} w={6} h={6} />
                  <Text fontSize="20px">Logout</Text>
                </HStack>
              )}
            </Box>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default HeaderTray;
