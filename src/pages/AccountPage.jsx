import Header from '../components/Header/Header';
import {
  Box,
  Heading,
  Avatar,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Button,
  useToast,
  FormControl,
  FormLabel,
  Input,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import ToggleColor from '../components/ToggleColor';

import { useSelector, useDispatch } from 'react-redux';
import { removeUserAsync } from '../redux/users/thunk';
import { useNavigate } from 'react-router-dom';
import NotFound from '../components/NotFound';
import { signedOutUserObject } from '../utils/SignedOutUserObject';

const AccountsPage = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const toast = useToast();
  const bg = useColorModeValue('gray.100', 'gray.700');

  const [user, setUser] = useState(() => {
    // getting stored value from localStorage
    const saved = localStorage.getItem('userSession_FriendDash');
    const initialValue = JSON.parse(saved);
    return initialValue || signedOutUserObject;
  });

  const handleDeleteAccount = () => {
    dispatch(removeUserAsync(user._id));
    console.log(JSON.stringify(user));
    handleSignOut();
    nav('/');
  };

  const handleSignOut = () => {
    localStorage.setItem(
      'userSession_FriendDash',
      JSON.stringify(signedOutUserObject)
    );
    setUser(signedOutUserObject);
  };

  return (
    <Box>
      <Header />
      <Box p="5%">
        {user.userName !== 'Foodie' ? (
          <>
            <Box
              marginTop="6%"
              align="left"
              p="35px"
              bg={bg}
              // w={{ lg: '600px', md: '600px', base: '100%' }}
              w="100%"
              h="100px"
              borderRadius="10px"
            >
              <Heading size="lg">Profile</Heading>
            </Box>
            <Box
              align="left"
              p="35px"
              bg={bg}
              // w={{ lg: '600px', md: '600px', base: '100%' }}
              w="100%"
              h="100%"
              borderRadius="10px"
            >
              <FormControl isRequired>
                <FormLabel htmlFor="Username">Username</FormLabel>
                <Input
                  id="Username"
                  placeholder="Username"
                  defaultValue={user.userName}
                />

                <FormLabel pt=" 10px" htmlFor="Email">
                  Email
                </FormLabel>
                <Input
                  id="Email"
                  placeholder="Email"
                  defaultValue={user.userEmail}
                />
              </FormControl>
              {/* {user.userName !== 'Foodie' && (
                <Box align="right" w="100%" pt="20px">
                  <Button
                    onClick={() => {
                      toast({
                        position: 'bottom',
                        title: 'Account deleted.',
                        description: "We've deleted your account for you.",
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                      });
                      handleDeleteAccount();
                    }}
                  >
                    Delete Account
                  </Button>
                </Box>
              )}{' '} */}
              <br />
              <ToggleColor />
            </Box>
          </>
        ) : (
          <NotFound element={'User'} />
        )}
      </Box>
    </Box>
  );
};

export default AccountsPage;
