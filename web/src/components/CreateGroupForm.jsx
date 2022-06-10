import { Heading, chakra, Modal, FormControl, FormLabel, Input, Select, Button, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react";
import React, { useState } from 'react';
import { TimePicker } from 'react';

export default chakra(function CreateGroupForm({ className, onCloseCallback }) {
    const [restaurantName, setRestaurantName] = useState("");
    const [time, setTime] = useState(new Date());
    const [groupMembers, setGroupMembers] = useState("1");
    return (
        <Modal isOpen={true} className={className}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create a Group Order</ModalHeader>
                <ModalBody>

                    <form>
                        <FormControl>
                            <FormLabel>Select Restaurant</FormLabel>
                            <Input type="restaurantName" value={restaurantName} placeholder="Restaurant Name" onChange={e => setRestaurantName(e.target.value)} required />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Pick Up Time</FormLabel>
                            <input type="time" id="pickUpTimePicker" value={time} onChange={e => setTime(e.target.value)} required />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Max. Number of Group Members</FormLabel>
                            <Select value={groupMembers} onChange={e => setGroupMembers(e.target.value)} required>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Select>
                        </FormControl>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button type="Submit" onClick={() => onCloseCallback()}>
                        Create Group
                    </Button>
                    <Button type="Cancel" onClick={() => onCloseCallback()}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
});