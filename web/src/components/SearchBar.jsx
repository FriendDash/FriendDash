import React from 'react';

import {
  Input,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Button,
  chakra,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

// Search Bar Component

export default chakra(function SearchBar({ className, handleChange }) {
  const handleClick = () => {
    // Handle Search
    console.log('search pressed');
  };
  return (
    <InputGroup size="md" className={className}>
      <InputLeftElement
        pointerEvents="none"
        children={<SearchIcon color="gray.500" />}
      />
      <Input
        placeholder="Search active orders"
        size="md"
        onChange={e => handleChange(e.target.value)}
      />
      <InputRightElement width="4.5rem">
        <Button size="md" colorScheme="teal" onClick={handleClick}>
          Search
        </Button>
      </InputRightElement>
    </InputGroup>
  );
});
