import {
  FormLabel,
  Switch,
  useColorMode,
  Button,
  FormControl,
  Box,
  Text,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

import { useEffect, useState } from 'react';

const ToggleColor = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    // check when the component is loaded
    const localStorageToggled = localStorage.getItem('TOGGLE_MODE');

    // If is not null
    if (localStorageToggled) {
      setToggle(localStorageToggled === 'true' ? true : false);
    } else {
      // If null set the localStorage key/value as a string.
      localStorage.setItem('TOGGLE_MODE', `${toggle}`);
    }
  }, [toggle]);

  const handleToggle = () => {
    localStorage.setItem('TOGGLE_MODE', `${!toggle}`);
    setToggle(!toggle);
    toggleColorMode();
  };
  return (
    <Box>
      <Text fontSize="lg">Change Theme:</Text>
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="toggleTheme" mb="0" mr="5px">
          <SunIcon w={6} h={6} />
          {/* Light */}
        </FormLabel>
        <Switch id="toggleTheme" isChecked={toggle} onChange={handleToggle} />
        <FormLabel htmlFor="toggleTheme" mb="0" ml="5px">
          <MoonIcon w={6} h={6} />
          {/* Dark */}
        </FormLabel>
      </FormControl>
    </Box>
  );
};

export default ToggleColor;
