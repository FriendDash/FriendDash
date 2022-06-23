import {
  Heading,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';

const RestaurantMenuItem = ({ menuItem, setOrderItem, quantityGTZero, orderSoFar }) => {
  const handleChange = (newOrderItem) => {
    const foundItemIndex = orderSoFar.findIndex((item) => item.menuItem === newOrderItem.menuItem);
    if (foundItemIndex === -1) {
      setOrderItem(quantityGTZero([...orderSoFar, newOrderItem]))
     } else {
      const newOrderSoFar = [...orderSoFar];
      newOrderSoFar[foundItemIndex] = newOrderItem;
      setOrderItem(quantityGTZero([...newOrderSoFar]));
     } 
  }

  return (
    <span padding="5px">
      <Heading size="md">{menuItem.dishName}</Heading>
      <Text size="md">{menuItem.description}</Text>
      <Heading size="md">${menuItem.price}</Heading>
      <NumberInput defaultValue="0" onChange={(valueString) => handleChange({menuItem: menuItem.dishName, price: menuItem.price, quantity: parseInt(valueString)})}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </span>
  );
};

export default RestaurantMenuItem;
