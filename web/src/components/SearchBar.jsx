import {
  Input,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Button,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

import React, { useState } from 'react';

// Search Bar Component
const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const handleClick = () => {
    // Handle Search
    console.log('search pressed');
  };
  return (
    <div>
      <InputGroup size="md">
        {' '}
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input
          placeholder="Search active orders"
          size="md"
          onChange={e => setSearchQuery(e.target.value)}
        />
        <InputRightElement width="4.5rem">
          <Button h="100%" size="md" onClick={handleClick}>
            Search
          </Button>
        </InputRightElement>{' '}
      </InputGroup>
      Output: {searchQuery}
    </div>
  );
};

export default SearchBar;
