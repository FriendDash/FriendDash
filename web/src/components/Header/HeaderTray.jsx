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
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import MainLogo from './../../assets/main-logo.png';
import {
  IoMdPower,
  IoMdListBox,
  IoMdStar,
  IoIosCard,
  IoMdHelpCircle,
  IoMdPerson,
} from 'react-icons/io';

import { HamburgerIcon, CalendarIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { getUserByIdAsync, addUserAsync } from '../../redux/users/thunk';

const HeaderTray = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState({});
  const [name, setName] = useState('Foodie');
  const [avatar, setAvatar] = useState('');
  const [id, setId] = useState('');

  const dispatch = useDispatch();

  // Refs:
  // https://developers.google.com/identity/gsi/web/guides/display-button#javascript
  // https://stackoverflow.com/questions/65234862/how-to-define-variable-google-when-using-google-one-tap-javascript-api
  // https://www.youtube.com/watch?v=roxC8SMs7HU&t=0s
  // https://developers.google.com/identity/gsi/web/guides/verify-google-id-token

  // Ref: icon https://react-icons.github.io/react-icons/search?q=iom

  const handleCredentialResponse = res => {
    console.log('Encoded JWT ID token: ' + res.credential);
    let userObject = jwt_decode(res.credential);
    console.log(userObject);
    setUser(userObject);

    // store credentials in mongodb dependent if already added or not (handled in endpoint)
    dispatch(
      addUserAsync({
        userName: userObject.name,
        userProfile: userObject.picture,
        userEmail: userObject.email,
        userRating: [],
        userOrders: ['99'],
        googleId: userObject.sub,
      })
    );
    document.getElementById('signInDiv').hidden = true;

    dispatch(getUserByIdAsync());
    setName(userObject.name); // google fullname
    setAvatar(userObject.picture); // google pic
    setId(userObject.sub); // google id
  };

  const handleSignOut = () => {
    setUser({});
    document.getElementById('signInDiv').hidden = false;
    onClose();
    setName('Foodie');
    setAvatar('');
    setId('');
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
    document.getElementById('signInDiv').addEventListener('click', () => {
      window.google.accounts.id.prompt(); // also display the One Tap dialog
    });
  }, []);

  // We will change this arr to a json arr in future to add urls and corresponding icons
  const menuItems = [
    {
      tabName: 'Orders',
      url: '/orders',
      icon: IoMdListBox,
    },
    { tabName: 'Favorites', url: '/fav', icon: IoMdStar },
    { tabName: 'Payment', url: '/payment', icon: IoIosCard },
    { tabName: 'Help', url: '/help', icon: IoMdHelpCircle },
    { tabName: 'Account', url: '/account', icon: IoMdPerson },
  ];

  return (
    <>
      <HStack w="100%" display="flex" justifyContent="space-between">
        <HStack>
          <Button colorScheme="gray" onClick={onOpen}>
            <HamburgerIcon />
          </Button>
          <a href="/dashboard">
            <HStack>
              <Image src={MainLogo} h="40px" />
              <Text fontSize="xl" as="b">
                FriendDash |
              </Text>
              {user && (
                <Text fontSize="xl" paddingRight="20px" as="b">
                  Hello {name}!
                </Text>
              )}
            </HStack>
          </a>
        </HStack>
        <div id="signInDiv"></div>
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
                <Link to={`/profile/${id}`}>
                  <Text fontSize="md">View Profile</Text>
                </Link>
              </Box>
            </HStack>
          </DrawerHeader>
          <DrawerBody>
            <Box w="100%" p="1px">
              {menuItems.map((entry, index) => {
                return (
                  <Button
                    key={index}
                    variant="ghost"
                    p="0px 0px"
                    my="5px"
                    w="100%"
                    h="50px"
                    justifyContent="flex-start"
                  >
                    <a href={entry.url}>
                      <HStack p="10px">
                        <Icon as={entry.icon} w={6} h={6} mr="5px" />
                        <Text fontSize="20px">{entry.tabName}</Text>
                      </HStack>
                    </a>
                  </Button>
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
