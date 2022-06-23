import React, { useEffect, useState } from 'react';
import glogo from '../assets/glogo.png';
import { Box, Heading, Button, Image, Text, VStack } from '@chakra-ui/react';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const [requiresRegister, setRequiresRegister] = useState(false);
  const handleRegisterLogin = () => {
    setRequiresRegister(!requiresRegister);
  };

  const handleLoginOrRegister = () => {
    // handles passport call and handles login or register with google
    console.log('passport call');
  };

  return (
    <Box>
      <Box
        p="30px"
        bg="orange"
        w={{ lg: '600px', md: '600px', base: '100%' }}
        h="300px"
        borderRadius="10px"
        align="center"
        outline="solid"
      >
        <Heading size="xl" ml="18px" pt="9px">
          {requiresRegister
            ? 'Register to FriendDash!'
            : 'Login to FriendDash!'}
        </Heading>
        <Box mt="20px" mb="40px">
          {requiresRegister ? (
            <Button
              display="flex"
              flexDir="row"
              onClick={handleLoginOrRegister}
            >
              <Image src={glogo} h="90%" />

              <Text pl="10px">Register with Google</Text>
            </Button>
          ) : (
            // <Button
            //   display="flex"
            //   flexDir="row"
            //   onClick={handleLoginOrRegister}
            // >
            //   <Image src={glogo} h="90%" />

            //   <Text pl="10px">Login with Google</Text>
            // </Button>

            <GoogleLogin
              onSuccess={credentialResponse => {
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
              useOneTap
            />
          )}
        </Box>

        {requiresRegister ? (
          <VStack>
            <Text mr="10px">Already have an account?</Text>
            <Button onClick={handleRegisterLogin} mt="10px">
              <b>Login</b>
            </Button>
          </VStack>
        ) : (
          <VStack>
            <Text mr="10px">Don't have an account?</Text>
            <Button onClick={handleRegisterLogin} mt="10px">
              <b>Register</b>
            </Button>
          </VStack>
        )}
      </Box>
    </Box>
  );
};

export default Login;
