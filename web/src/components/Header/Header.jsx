import { Box, HStack, chakra } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/react';

import HeaderTray from './HeaderTray';
const Header = ({ className }) => {
  const bg = useColorModeValue('gray.100', 'black.200');
  return (
    <Box
      bgColor={bg}
      p="7px"
      w="100%"
      position="fixed"
      top="0px"
      overflow="hidden"
      className={className}
      marginBottom="10px"
      zIndex="3"
      borderStyle="solid"
      borderWidth="1px"
    >
      <HeaderTray />
    </Box>
  );
};

export default chakra(Header);
