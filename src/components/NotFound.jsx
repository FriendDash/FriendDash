import {
    Box, Heading, Button, Image, Text, VStack, Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react';

const NotFound = ({element}) => {
    return (
        <Alert status='error' padding="30px" marginTop="4%">
            <AlertIcon />
            <AlertTitle>404: {element} not found!</AlertTitle>
            <AlertDescription>{element} was not found or does not exist! </AlertDescription>
        </Alert>)



}


export default NotFound;