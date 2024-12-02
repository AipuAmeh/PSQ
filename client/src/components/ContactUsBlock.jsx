import { Box, FormControl, Text, Input, Textarea, FormLabel, FormHelperText, Button } from "@chakra-ui/react";



const ContactUsBlock = () => {
return (
    <Box display='flex' justifyContent='center' bg='brand.cambridgeBlue' py='3em' borderColor='brand.coolGray' gap='3em'>
        <Box w='40%'>
            <Text fontSize='2em'> Get In Touch With Us</Text>
            <Text mt='5em'>
            Leave us a message. We will be sure to get back to you.
            </Text>
           
        </Box>
        <Box w='40%'>
            <FormControl mt='3em' isRequired>
                <FormLabel>Name</FormLabel>
                <Input placeholder='First and Last Name' color='white'/>
                <FormLabel mt='0.5em'>Email</FormLabel>
                <Input placeholder='Email' />
                <FormHelperText>We&lsquo;ll never share your email.</FormHelperText>
                <FormLabel mt='0.5em'>Message</FormLabel>
                <Textarea placeholder='How Can We Help?'/>
                <Box mt={6}>
                <Button>Send Message</Button>
                </Box>
    
            </FormControl>
        </Box>
    </Box>
)

}

export default ContactUsBlock;