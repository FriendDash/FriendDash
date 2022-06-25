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
  InputRightElement,
  InputGroup,
} from '@chakra-ui/react';

import { addOrderAsync } from '../redux/orders/thunk';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default chakra(function CreateGroupForm({ className, isOpen, onClose }) {
  const [restaurantName, setRestaurantName] = useState('');
  const [time, setTime] = useState(new Date());
  const [groupMembers, setGroupMembers] = useState('1');
  const [pickupLocation, setPickupLocation] = useState('');
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [mapsAPIResponse, setMapsAPIResponse] = useState({});
  const firstName = 'Dan';
  const lastName = 'Abrahmov';

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(mapsAPIResponse);
  }, [mapsAPIResponse]);

  useEffect(() => {
    /* geolocation is available */
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
      console.log(lat + ' - ' + long);

      // console.log(mapsAPIResponse);
    } else {
      console.log('geolocation is not supported');
    }
  }, []);

  const handleSubmitToServer = () => {
    const rand = 1 + Math.random() * (100 - 1);
    let newGroup = {
      restaurant: restaurantName,
      creatorFirstName: firstName,
      creatorLastName: lastName,
      pickupLocation: pickupLocation,
      pickupTime: time,
      maxSize: groupMembers,
      orderId: rand,
      creatorUserId: rand,
    };
    if (restaurantName === '' || time === '' || pickupLocation === '') {
      alert('You must not submit an empty form.');
    } else {
      dispatch(addOrderAsync(newGroup));
      alert('Successfully Submitted Order! ' + JSON.stringify(newGroup));
    }
  };

  const handleAddress = () => {
    if (
      (lat !== undefined || long !== undefined) &&
      process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    ) {
      (async () => {
        const res = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
        );
        const json = await res.json();
        setMapsAPIResponse(json);
        if (json.results.length > 0) {
          setPickupLocation(json.results[0].formatted_address);
        }
      })();
    } else {
      setPickupLocation('6245 Agronomy Road, Vancouver, BC V6T 1Z4');
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} className={className}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a Group Order</ModalHeader>
        <ModalBody>
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

            <FormLabel>Select Pickup Location</FormLabel>
            <InputGroup>
              <Input
                type="pickupLocation"
                value={pickupLocation}
                placeholder="Address"
                onChange={e => setPickupLocation(e.target.value)}
                required
                marginBottom={'10px'}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleAddress}>
                  Location
                </Button>
              </InputRightElement>
            </InputGroup>

            <FormLabel>Pick Up Time</FormLabel>
            <input
              type="time"
              id="pickUpTimePicker"
              value={time}
              onChange={e => setTime(e.target.value)}
              required
            />

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
        </ModalBody>
        <ModalFooter display={'flex'} justifyContent="space-between">
          <Button type="Submit" onClick={handleSubmitToServer}>
            Create Group
          </Button>
          <Button type="Cancel" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
