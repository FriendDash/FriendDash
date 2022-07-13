import {
    Box,
    Heading,
    HStack,
    VStack,
    Image,
    Text
} from '@chakra-ui/react';
import Header from '../components/Header/Header';


const PaymentPage = () => {
    return (
        <Box>
            <Header />
            <Box paddingTop={'50px'}>
                <VStack>
                    <Heading textAlign='center' my='20px'>
                        Your Payment Methods
                    </Heading>
                    <Box borderColor={'black'} borderStyle='solid' borderWidth={'2px'}>
                        <HStack padding='10px' margin={'10px'} borderColor='gray' borderStyle='solid' borderWidth={'2px'}>
                            <Image width={'50px'} src='https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/363_Visa_Credit_Card_logo-1024.png' alt='Visa logo'/>
                            <Text>************1234</Text>
                        </HStack>
                        <HStack padding='10px' margin={'10px'} borderColor='gray' borderStyle='solid' borderWidth={'2px'}>
                            <Image width={'50px'} src='https://cdn3.iconfinder.com/data/icons/payment-method-1/64/_Mastercard-512.png' alt='MasterCard logo'/>
                            <Text>************5678</Text>
                        </HStack>
                    </Box>
                </VStack>
                <HStack display={'flex'} justifyContent={'center'}>
                    <Heading my="20px">
                        Add a Payment Method
                    </Heading>
                </HStack>
            </Box>
        </Box>
    );
};

export default PaymentPage;