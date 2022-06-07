import { Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react';
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
        <Input
          placeholder="Search active orders"
          size="md"
          onChange={e => setSearchQuery(e.target.value)}
        />
        <InputRightElement width="4.5rem">
          <Button h="100%" size="lg" onClick={handleClick}>
            Search
          </Button>
        </InputRightElement>{' '}
      </InputGroup>
      Output: {searchQuery}
    </div>
  );
};

export default SearchBar;
