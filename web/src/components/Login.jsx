import React, { useEffect, useState } from 'react';
import glogo from '../assets/glogo.png';
import { Box, Heading, Button, Image, Text } from '@chakra-ui/react';
import { useMediaQuery } from '@chakra-ui/react';

const Login = () => {
  const [isSmallerThan600] = useMediaQuery('(max-width: 600px)');
  const [requiresRegister, setRequiresRegister] = useState(false);
  const handleRegisterLogin = () => {
    setRequiresRegister(!requiresRegister);
  };

  const handleLoginOrRegister = () => {
    // handles passport call and handles login or register with google
    console.log('passport call');
  };

  return (
    <Box display="flex" flexDir="column" alignItems="center">
      <Box marginTop="10%" align="center">
        <Heading>Welcome Wanderer!</Heading>
      </Box>
      {isSmallerThan600 ? (
        <Box
          padding="30px"
          bg="orange"
          w="100%"
          h="100%"
          borderRadius="10px"
          align="center"
          outline="solid"
        >
          {requiresRegister ? (
            <Heading size="2xl" ml="18px" pt="9px">
              Register to FriendDash!
            </Heading>
          ) : (
            <Heading size="2xl" ml="18px" pt="9px">
              Login to FriendDash!
            </Heading>
          )}
          <br />
          {requiresRegister ? (
            <Button
              display="flex"
              flexDir="row"
              onClick={handleLoginOrRegister}
            >
              <Image src={glogo} h="90%" />

              <Text paddingLeft="10px">Register with Google</Text>
            </Button>
          ) : (
            <Button
              display="flex"
              flexDir="row"
              onClick={handleLoginOrRegister}
            >
              <Image src={glogo} h="90%" />

              <Text paddingLeft="10px">Login with Google</Text>
            </Button>
          )}
          <br />
          <br />
          <br />

          {requiresRegister ? (
            <Text marginRight="10px">
              Already have an account?
              <br />
              <Button onClick={handleRegisterLogin}>
                <b>Login</b>
              </Button>
            </Text>
          ) : (
            <Text marginRight="10px">
              Don't have an account?
              <br />
              <Button onClick={handleRegisterLogin}>
                <b>Register</b>
              </Button>
            </Text>
          )}
        </Box>
      ) : (
        <Box
          padding="30px"
          margin="10px"
          bg="orange"
          w="50%"
          h="50%"
          borderRadius="10px"
          align="center"
          outline="solid"
        >
          {requiresRegister ? (
            <Heading size="md" ml="18px" pt="9px">
              Register to FriendDash!
            </Heading>
          ) : (
            <Heading size="md" ml="18px" pt="9px">
              Login to FriendDash!
            </Heading>
          )}
          <br />
          {requiresRegister ? (
            <Button
              display="flex"
              flexDir="row"
              padding="10px"
              onClick={handleLoginOrRegister}
            >
              <Image src={glogo} h="80%" />
              <Text paddingLeft="10px">Register with Google</Text>
            </Button>
          ) : (
            <Button
              display="flex"
              flexDir="row"
              padding="10px"
              onClick={handleLoginOrRegister}
            >
              <Image src={glogo} h="80%" />
              <Text paddingLeft="10px">Login with Google</Text>
            </Button>
          )}
          <br />
          {requiresRegister ? (
            <Text marginRight="10px">
              Already have an account?
              <button onClick={handleRegisterLogin}>
                <b>Login</b>
              </button>
            </Text>
          ) : (
            <Text marginRight="10px">
              Don't have an account?
              <button onClick={handleRegisterLogin}>
                <b>Register</b>
              </button>
            </Text>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Login;
