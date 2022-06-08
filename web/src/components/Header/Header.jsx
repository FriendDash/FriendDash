import { Box, HStack, chakra } from '@chakra-ui/react';

import HeaderTray from './HeaderTray';
const Header = ({ className }) => {
  return (
    <Box
      bgColor="white"
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
      <HStack>
        <div>
          <HeaderTray />
        </div>
      </HStack>
    </Box>
  );
};

export default chakra(Header);
