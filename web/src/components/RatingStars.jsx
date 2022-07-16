import React, { useState } from 'react';
import { Box, Stack, Text } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';


// REFERENCE: https://codesandbox.io/s/y8zfo
export default function RatingStars(
  { size, icon, scale, fillColor, strokeColor, rating, setRating }
) {
  const buttons = [];

  const onClick = idx => {
    if (!isNaN(idx)) {
      // allow user to click first icon and set rating to zero if rating is already 1
      if (rating === 1 && idx === 1) {
        setRating(0);
      } else {
        setRating(idx);
      }
    }
  };

  const RatingIcon = ({ fill }) => {
    return (
      <StarIcon
        name={icon}
        size={`${size}px`}
        color={fillColor}
        stroke={strokeColor}
        onClick={onClick}
        fillOpacity={fill ? '100%' : '0'}
      />
    );
  };

  const RatingButton = ({ idx, fill }) => {
    return (
      <Box
        as="button"
        aria-label={`Rate ${idx}`}
        height={`${size}px`}
        width={`${size}px`}
        variant="unstyled"
        mx={1}
        onClick={() => onClick(idx)}
        _focus={{ outline: 0 }}
      >
        <RatingIcon fill={fill} />
      </Box>
    );
  };

  for (let i = 1; i <= scale; i++) {
    buttons.push(<RatingButton key={i} idx={i} fill={i <= rating} />);
  }

  return (
    <Stack isInline mt={8} justify="center">
      <input name="rating" type="hidden" value={rating} />
      {buttons}
      <Box width={`${size * 1.5}px`} textAlign="center">
        <Text fontSize="sm" textTransform="uppercase">
          Rating
        </Text>
        <Text fontSize="2xl" fontWeight="semibold" lineHeight="1.2em">
          {rating}
        </Text>
      </Box>
    </Stack>
  );
}
