import React from 'react';
import {
  chakra,
  Button,
  HStack,
  useDisclosure,
  Spacer,
  useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../ConfirmationModal';
import StatusTag from '../StatusTag';

export default chakra(function OrderDetailUser({
  className,
  userOrder,
  groupId,
  creatorUserId,
}) {
  const {
    isOpen: isConfirmationOpen,
    onOpen: onConfirmationOpen,
    onClose: onConfirmationClose,
  } = useDisclosure();
  const bg = useColorModeValue('gray.100', 'gray.600');

  const navigate = useNavigate();

  const removeUser = async userId => {
    // function to remove
    await (async () => {
      const response = await fetch(
        `https://frienddash-db.onrender.com/orders/removeUser/${groupId}/${userId}`,
        {
          method: 'DELETE',
        }
      );
      const dataRes = await response.json();
    })();

    // delete order from userOrders
    await (async () => {
      const response = await fetch(
        `https://frienddash-db.onrender.com/users/removeOrder/${userId}/${groupId}`,
        {
          method: 'DELETE',
        }
      );

      if (response.status == '200') {
        console.log('successful update to user 200 check');
      }
    })();

    onConfirmationClose();
    navigate(0);
  };

  return (
    <HStack w="100%" bg={bg} p="5px" rounded="10px" className={className}>
      <Button
        colorScheme="teal"
        variant="link"
        pl="10px"
        pr="10px"
        onClick={() => navigate(`/profile/${userOrder.orderUserId}`)}
      >
        {userOrder.userName}
      </Button>
      <StatusTag status={userOrder.paid ? 'paid' : 'not paid'} />
      <Spacer />
      {!userOrder.paid && (
        <Button colorScheme="red" onClick={onConfirmationOpen} w="130px">
          Remove User
        </Button>
      )}

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
