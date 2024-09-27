import {
  FormControl,
  FormLabel,
  FormHelperText,
  Box,
  Input,
  Textarea,
  Text,
  Button,
  useToast,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";
import { isInvalidEmail } from "../utils/validation/invalidEmail";
import { useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {

  // breakpoint for contact us box on mobile screens
const mobileScreenDirection = useBreakpointValue({ base: 'column', sm: 'column', md: 'row', lg: 'row' });
const mobileWidthContact = useBreakpointValue({ base: '100%', sm: '100%', md: '40%', lg: '40%'});
const mobileWidthFormBox = useBreakpointValue({ base: '100%', sm: '100%', md: '60%', lg: '60%'});
const mobileFormControl = useBreakpointValue({ base: '100%', sm: '100%', md: '80%', lg: '80%'});
const mobileBoxMargin = useBreakpointValue({ base: '1.5em', sm: '1.5em', md: '3em', lg: '3em'});
const mobileTextMargin = useBreakpointValue({ base: '3em', sm: '3em', md: '9em', lg: '9em'});
const mobileFormMargin = useBreakpointValue({ base: '3em', sm: '3em', md: '6.5em', lg: '6.5em'});


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
  };
  return (
    <Flex px={5} direction={mobileScreenDirection}>
      <Box
        w={mobileWidthContact}
        display="flex"
        justifyContent="flex-start"
        flexDirection="column"
        mx={mobileBoxMargin}
      >
        <Text fontSize="1.8em" mt='3em'>
          Contact Us
        </Text>
        <Text fontSize="1em" mt={mobileTextMargin}>
          Leave us a message. We will be sure to get back to you.
        </Text>
      </Box>

      <Box display="flex" flexDirection="column" w={mobileWidthFormBox} px={4} mt={mobileFormMargin} mb='1em'>
        <FormControl isRequired w={mobileFormControl}>
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
        <Button
          w="fit-content"
          mt={6}
          bg="brand.callToActionButtons"
          onClick={handleFormSubmit}
        >
          Send Message
        </Button>
      </Box>
    </Flex>
  );
};

export default Contact;
