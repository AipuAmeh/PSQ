import { Box, FormControl, Text, Input, Textarea, FormLabel, FormHelperText, Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { isInvalidEmail } from "../utils/validation/invalidEmail";
import emailjs from "@emailjs/browser";



const ContactUsBlock = () => {

    const toast = useToast();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleFormSubmit = async (e) => {
        e.preventDefault();

          // form error handling/validation
    if (name === "" || email === "" || message === "") {
        toast({
          title: "Error",
          description: "Please complete all fields",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        return;
      }
      if (isInvalidEmail(email)) {
        toast({
          title: "Error",
          description: "Please enter a valid email.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        return;
      }
      if (name && email && message) {
        const templateId = "template_xk4zyom";
        const serviceId = "service_rbbss6j";
        const publicKey = "Tm2IbNrAlhYPf8SWm";
        const templateParams = { name, email, message };
        await emailjs.send(serviceId, templateId, templateParams, publicKey).then(
          (result) => {
            return result;
          },
          (error) => {
            console.log(error);
          }
        );
        toast({
          title: "Success",
          description: "Thank you for your interest!",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setName("");
        setEmail("");
        setMessage("");
      } else {
        return;
      }

    }
    
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
                <Input 
                placeholder='First and Last Name' 
                variant='filled'
                value={name}
                onChange={(e) => {
                    setName(e.target.value);
                }}/>
                <FormLabel mt='0.5em'>Email</FormLabel>
                <Input 
                placeholder='Email' 
                variant='filled'
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                }}/>
                <FormHelperText>We&lsquo;ll never share your email.</FormHelperText>
                <FormLabel mt='0.5em'>Message</FormLabel>
                <Textarea 
                placeholder='How Can We Help?' 
                variant='filled'
                value={message}
                onChange={(e) => {
                    setMessage(e.target.value);
                }}/>
                <Box mt={6}>
                <Button background='brand.mintCream' onClick={handleFormSubmit}>Send Message</Button>
                </Box>
    
            </FormControl>
        </Box>
    </Box>
)

}

export default ContactUsBlock;