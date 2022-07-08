import React, { useEffect } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import jwt_decode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { addUserAsync } from '../redux/users/thunk';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  let userFromReduxStore = useSelector(state => state.reducer.users.list);

  const dispatch = useDispatch();
  const nav = useNavigate();

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
  };

  useEffect(() => {
    // store response of google obj into localStorage
    // Ref: https://blog.logrocket.com/using-localstorage-react-hooks/
    console.log(userFromReduxStore);
    if (userFromReduxStore.length) {
      localStorage.setItem(
        'userSession_FriendDash',
        JSON.stringify(userFromReduxStore[0])
      );
      nav('/');
    }
  }, [nav, userFromReduxStore]);

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

  return (
    <Box>
      <Box
        p="30px"
        bg="lightgrey"
        w={{ lg: '600px', md: '600px', base: '100%' }}
        h="200px"
        borderRadius="10px"
        align="center"
        outline="solid"
      >
        <Heading size="sm" ml="18px" pt="9px">
          Login using social networks
        </Heading>
        <Box mt="10px" mb="40px">
          <div id="signInDiv"></div>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
