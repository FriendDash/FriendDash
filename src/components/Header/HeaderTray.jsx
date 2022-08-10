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
  Flex,
  Image,
  Icon,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import MainLogo from './../../assets/main-logo.png';
import {
  IoMdPower,
  IoMdListBox,
  IoIosRestaurant,
  IoIosCard,
  IoMdHelpCircle,
  IoMdPerson,
} from 'react-icons/io';

import { HamburgerIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { signedOutUserObject } from '../../utils/SignedOutUserObject';

const HeaderTray = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [user, setUser] = useState(() => {
    // getting stored value from localStorage
    const saved = localStorage.getItem('userSession_FriendDash');
    const initialValue = JSON.parse(saved);
    return initialValue || signedOutUserObject;
  });

  const nav = useNavigate();

  const handleSignOut = () => {
    localStorage.setItem(
      'userSession_FriendDash',
      JSON.stringify(signedOutUserObject)
    );
    setUser(signedOutUserObject);
    onClose();
  };

  const handleSignIn = () => {
    nav('/login');
  };

  // We will change this arr to a json arr in future to add urls and corresponding icons
  const menuItems = [
    { tabName: 'Dashboard', url: '/dashboard', icon: IoMdListBox },
    {
      tabName: 'Orders',
      url: '/orders',
      icon: IoIosRestaurant,
    },
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
              <Flex flexDir={{ lg: 'row', base: 'column' }}>
                <Text fontSize="xl" as="b" pr="10px">
                  FriendDash |
                </Text>

                <Text fontSize="xl" paddingRight="20px" as="b">
                  Hello {user.userName}!
                </Text>
              </Flex>
            </HStack>
          </a>
        </HStack>
        <HStack>
          {user.userName !== 'Foodie' ? (
            <HStack
              p="10px"
              onClick={handleSignOut}
              style={{ cursor: 'pointer' }}
            >
              <Icon as={IoMdPower} w={6} h={6} />
              <Text fontSize="20px" display={{ lg: 'inline', base: 'none' }}>
                Logout
              </Text>
            </HStack>
          ) : (
            <HStack
              p="10px"
              onClick={handleSignIn}
              style={{ cursor: 'pointer' }}
            >
              <Icon as={IoMdPower} w={6} h={6} />
              <Text fontSize="20px">Login</Text>
            </HStack>
          )}
        </HStack>
      </HStack>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            <HStack>
              <Avatar name={user.userName} size="lg" src={user.userProfile} />
              <Box>
                <Text>{user.userName}</Text>
                <Link to={`/profile/${user.googleId}`}>
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
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default HeaderTray;
