import { Center, Button, Heading, IconButton, useDisclosure } from '@chakra-ui/react';
import { TbStars } from 'react-icons/tb';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import RatingStars from './RatingStars';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useToast
  } from '@chakra-ui/react';


export default function RatingPopup(props) {

  const toast = useToast()

  const signedOutUserObject = {
    createdAt: '',
    googleId: '0',
    updatedAt: '',
    userEmail: '',
    userName: 'Foodie',
    userOrders: [],
    userProfile: '',
    userRating: [],
  };

  const [user, setUser] = useState(() => {
    // getting stored value from localStorage
    const saved = localStorage.getItem('userSession_FriendDash');
    const initialValue = JSON.parse(saved);
    return initialValue || signedOutUserObject;
  });

  const [rating, setRating] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const onConfirm = () => {
    onClose();
  };

  const openPopUp = () => {
    onOpen();
  };

  const confirmRatingClick = () => {
    // PUT req user
    (async () => {
      const response = await fetch(`http://localhost:5000/users/updateUserRating/${user.googleId}/${rating}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status == '200')
      {
        console.log("inside 200 check");
        toast({
          title: 'Order Added.',
          description: "We've added your order for you.",
          status: 'success',
          duration: 9000,
          position: "bottom",
          isClosable: true,
        })
      }
      
    })();
    onConfirm();
  };

  return (
    <>
    <Center>
      <Heading size="lg" ml="18px" pt="9px">
        Open Rating
      </Heading>
      </Center>
      <Center>
      <IconButton
        aria-label="Customer checkout"
        icon={<TbStars />}
        onClick={openPopUp}
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Rate your group leader:
            </AlertDialogHeader>

            <AlertDialogBody>
              <Heading size="md">How did your order leader do? <br/>
              1 = Terrible, 5 = Great!</Heading>
              <RatingStars
                size={48}
                icon="star"
                scale={5}
                fillColor="gold"
                strokeColor="grey"
                rating={rating}
                setRating={setRating}
              />
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="green" onClick={confirmRatingClick} ml={3}>
                Submit
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Center>
    </>
  );
}
