import {
  FormLabel,
  Switch,
  useColorMode,
  Button,
  FormControl,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const ToggleColor = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <FormControl display="flex" alignItems="center">
      <FormLabel htmlFor="toggleTheme" mb="0" mr="5px">
        <SunIcon w={6} h={6} />
        {/* Light */}
      </FormLabel>
      <Switch id="toggleTheme" onChange={toggleColorMode} />
      <FormLabel htmlFor="toggleTheme" mb="0" ml="5px">
        <MoonIcon w={6} h={6} />
        {/* Dark */}
      </FormLabel>
    </FormControl>
    // <Button onClick={toggleColorMode}>
    //   Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
    // </Button>
  );
};

export default ToggleColor;
