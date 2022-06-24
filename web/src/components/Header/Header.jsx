import { Box, HStack, chakra } from '@chakra-ui/react';

import HeaderTray from './HeaderTray';
const Header = ({ className }) => {
  return (
    <Box
      bgColor="gray.100"
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
