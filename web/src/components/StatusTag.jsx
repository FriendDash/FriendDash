import React from 'react';
import { Box, chakra, Tag } from '@chakra-ui/react';

import { orderStatusColorMapping } from '../utils/OrderStatusMapping';

export default chakra(function StatusTag({ className, status }) {
  return (
    <Tag
      colorScheme={orderStatusColorMapping[status]}
      borderWidth="0.5px"
      borderColor="blackAlpha.500"
      textTransform="capitalize"
      className={className}
    >
      {status}
    </Tag>
  );
});
