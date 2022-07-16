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
  useToast,
} from '@chakra-ui/react';

import { addOrderAsync } from '../redux/orders/thunk';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { signedOutUserObject } from '../utils/SignedOutUserObject';

export default chakra(function CreateGroupForm({ className, isOpen, onClose }) {
  const [restaurantName, setRestaurantName] = useState('');
  const [time, setTime] = useState(new Date());
  const [groupMembers, setGroupMembers] = useState('1');
  const [pickupLocation, setPickupLocation] = useState('');
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [mapsAPIResponse, setMapsAPIResponse] = useState({});
  // const name = 'Dan Abrahmov';

  const [user, setUser] = useState(() => {
    // getting stored value from localStorage
    const saved = localStorage.getItem('userSession_FriendDash');
    const initialValue = JSON.parse(saved);
    return initialValue || signedOutUserObject;
  });

  const dispatch = useDispatch();
  const orderCreatedToast = useToast({
    title: 'Order Created',
    description: 'Group order created',
    status: 'success',
    duration: 4000,
    isClosable: true,
  });

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
    let newGroup = {
      restaurant: restaurantName,
      creatorName: user.userName,
      pickupLocation: pickupLocation,
      pickupTime: time,
      maxSize: groupMembers,
      creatorUserId: user.googleId,
    };
    if (restaurantName.trim() === '' || time === '' || pickupLocation === '') {
      alert('You must not submit an empty form.');
    } else {
      dispatch(addOrderAsync(newGroup));
      orderCreatedToast();
      resetForm();
      onClose();
    }
  };

  const resetForm = () => {
    setRestaurantName('');
    setTime(new Date());
    setGroupMembers('1');
    setPickupLocation('');
    setLat('');
    setLong('');
    setMapsAPIResponse({});
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
      setPickupLocation('6245 Agronomy Road');
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
            <Select
              value={restaurantName}
              onChange={e => setRestaurantName(e.target.value)}
              required
              placeholder=" "
              marginBottom={'10px'}
            >
              <option value="McDonalds">McDonald's</option>
              <option value="Nori Bento & Udon">Nori Bento & Udon</option>
              <option value="Pizza Pizza">Pizza Pizza</option>
              <option value="Subway">Subway</option>
            </Select>
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
        <ModalFooter>
          <Button
            type="Cancel"
            colorScheme="blue"
            onClick={onClose}
            w="130px"
            mr="15px"
          >
            Cancel
          </Button>
          <Button
            colorScheme="teal"
            type="Submit"
            onClick={handleSubmitToServer}
          >
            Create Group
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
