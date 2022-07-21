import {
  chakra,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Modal,
  Button,
  ModalBody,
  ModalHeader,
} from '@chakra-ui/react';

export default chakra(function ConfirmationModal({
  className,
  title,
  confirmButton,
  cancelButton,
  isOpen,
  onClose,
  onConfirm,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className={className}>
      <ModalOverlay />
      <ModalContent marginTop={'20%'}>
        <ModalHeader>{title}</ModalHeader>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} w="110px" onClick={onClose}>
            {cancelButton}
          </Button>
          <Button colorScheme="teal" w="110px" onClick={onConfirm}>
            {confirmButton}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
