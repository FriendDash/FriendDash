import Login from '../components/Login';
import { Box, Heading } from '@chakra-ui/react';
const LoginPage = () => {
  return (
    <Box align="center">
      {' '}
      <Box marginTop="10%" align="center">
        <Heading>Welcome Wanderer!</Heading>
      </Box>
      <Login />
    </Box>
  );
};

export default LoginPage;
