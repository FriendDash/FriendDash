import {
  chakra,
  Center,
  Button,
  Heading,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { TbStars } from 'react-icons/tb';
import React, { useState } from 'react';
import RatingStars from './RatingStars';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast,
} from '@chakra-ui/react';

export default chakra(function RatingPopup(props) {
  const toast = useToast();

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
      const response = await fetch(
        `https://frienddash-db.herokuapp.com/users/updateUserRating/${props.groupCreatorUserId}/${rating}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status == '200') {
        console.log('inside 200 check');
        toast({
          title: 'Rating Submitted.',
          description: `Thank you for rating ${props.groupCreatorName}!`,
          status: 'success',
          duration: 9000,
          position: 'bottom',
          isClosable: true,
        });
      }
    })();
    onConfirm();
  };

  return (
    <>
        <Button
          aria-label="Customer checkout"
          w="130px"
          onClick={openPopUp}
        >Rate Order</Button>

        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Rate your group leader {props.groupCreatorName}:
              </AlertDialogHeader>

              <AlertDialogBody>
                <Heading size="md">
                  How did {props.groupCreatorName} do? <br />1 = Terrible, 5 = Great!
                </Heading>
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

    </>
  );
})
