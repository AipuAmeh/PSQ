import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Box,
  Input,
  Textarea,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
import { isInvalidEmail } from "../utils/validation/invalidEmail";
import { useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const toast = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // add form error handling/validation


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (name === '' || email === '' || message === ''){
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
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      px={10}
      my={6}
    >
      <Text fontSize="3xl">Contact Us</Text>
      <FormControl w="80%" isRequired >
        <FormLabel mt={4}>Name</FormLabel>
        <Input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="First and Last name"
        />
        <FormLabel mt={4}>Email address</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
      
          }}
          placeholder="Email"
        />
        <FormHelperText>We'll never share your email.</FormHelperText>
        <FormLabel mt={4}>Message</FormLabel>
        <Textarea
          type="text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
    
          }}
          placeholder="How Can We Help?"
        ></Textarea>
      </FormControl>
      <Button mt={6} bg="brand.callToActionButtons" onClick={handleFormSubmit}>
        Send Message
      </Button>
    </Box>
  );
};

export default Contact;
