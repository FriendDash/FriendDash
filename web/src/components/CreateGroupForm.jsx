import {
  chakra,
  Modal,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import React, { useState } from 'react';

export default chakra(function CreateGroupForm({
  className,
  isOpen,
  onCloseCallback,
}) {
  const [restaurantName, setRestaurantName] = useState('');
  const [time, setTime] = useState(new Date());
  const [groupMembers, setGroupMembers] = useState('1');
  return (
    <Modal isOpen={isOpen} className={className}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a Group Order</ModalHeader>
        <ModalBody>
          <form>
            <FormControl>
              <FormLabel>Select Restaurant</FormLabel>
              <Input
                type="restaurantName"
                value={restaurantName}
                placeholder="Restaurant Name"
                onChange={e => setRestaurantName(e.target.value)}
                required
                marginBottom={'10px'}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Pick Up Time</FormLabel>
              <input
                type="time"
                id="pickUpTimePicker"
                value={time}
                onChange={e => setTime(e.target.value)}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel marginTop={'10px'}>
                Max. Number of Group Members
              </FormLabel>
              <Select
                value={groupMembers}
                onChange={e => setGroupMembers(e.target.value)}
                required
                w="100px"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Select>
            </FormControl>
          </form>
        </ModalBody>
        <ModalFooter display={'flex'} justifyContent="space-between">
          <Button type="Submit" onClick={() => onCloseCallback()}>
            Create Group
          </Button>
          <Button type="Cancel" onClick={() => onCloseCallback()}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
