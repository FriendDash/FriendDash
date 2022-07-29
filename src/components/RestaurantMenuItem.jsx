import {
  chakra,
  Heading,
  Text,
  Box,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  HStack,
} from '@chakra-ui/react';

export default chakra(function RestaurantMenuItem({
  menuItem,
  setOrderItem,
  quantityGTZero,
  orderSoFar,
}) {
  const handleChange = newOrderItem => {
    const foundItemIndex = orderSoFar.findIndex(
      item => item.menuItem === newOrderItem.menuItem
    );
    if (foundItemIndex === -1) {
      setOrderItem(quantityGTZero([...orderSoFar, newOrderItem]));
    } else {
      const newOrderSoFar = [...orderSoFar];
      newOrderSoFar[foundItemIndex] = newOrderItem;
      setOrderItem(quantityGTZero([...newOrderSoFar]));
    }
  };

  return (
    <Box padding="10px" border="1px solid" rounded="10px">
      <Heading size="md" textAlign="left" noOfLines={1}>
        {menuItem.dishName}
      </Heading>
      <Text
        size="md"
        textAlign="left"
        my="10px"
        h="75px"
        overflow="hidden"
        textOverflow="ellipsis"
        noOfLines={3}
      >
        {menuItem.description}
      </Text>
      <HStack px="5px" justifyContent="space-between">
        <Heading size="sm" fontWeight="500" textAlign="left">
          ${menuItem.price}
        </Heading>
        <NumberInput
          defaultValue="0"
          min={0}
          onChange={valueString =>
            handleChange({
              menuItem: menuItem.dishName,
              price: menuItem.price,
              quantity: parseInt(valueString),
            })
          }
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </HStack>
    </Box>
  );
});
