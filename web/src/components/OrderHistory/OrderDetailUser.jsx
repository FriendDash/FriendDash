import React from 'react';
import {
  chakra,
  Button,
  HStack,
  useDisclosure,
  Spacer,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../ConfirmationModal';

export default chakra(function OrderDetailUser({
  className,
  userOrder,
  groupId,
}) {
  const {
    isOpen: isConfirmationOpen,
    onOpen: onConfirmationOpen,
    onClose: onConfirmationClose,
  } = useDisclosure();

  const navigate = useNavigate();

  const removeUser = userId => {
    // function to remove
    (async () => {
      const response = await fetch(
        `http://localhost:5000/orders/removeUser/${groupId}/${userId}`,
        {
          method: 'DELETE',
        }
      );
      const dataRes = await response.json();
      if (dataRes) {
        onConfirmationClose();
        navigate(0);
      }
    })();
    console.log(`http://localhost:5000/orders/removeUser/${groupId}/${userId}`);
  };

  return (
    <HStack w="100%" bg="gray.100" p="5px" rounded="10px" className={className}>
      <Button
        colorScheme="teal"
        variant="link"
        pl="10px"
        pr="10px"
        onClick={() => navigate(`/profile/${userOrder.orderUserId}`)}
      >
        {userOrder.userName}
      </Button>
      <Spacer />
      <Button colorScheme="red" onClick={onConfirmationOpen} w="130px">
        Remove User
      </Button>

      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={onConfirmationClose}
        title={`Please confirm to remove ${userOrder.userName} from this order. This action cannot be undone.`}
        confirmButton={'Confirm'}
        cancelButton={'Cancel'}
        onConfirm={() => removeUser(userOrder.orderUserId)}
      />
    </HStack>
  );
});
