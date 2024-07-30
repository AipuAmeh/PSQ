import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputRightElement,
  Box,
  Input,
  Text,
  Button,
  InputGroup,
  Center,
  Stack,
  Link,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PATIENT } from "../utils/mutations";
import { useCurrentUserContext } from "../utils/context/CurrentUser";
import { useNavigate } from "react-router-dom";
import PasswordChecklistComp from "../components/Validation/PasswordChecklist";
import { isInvalidEmail } from "../utils/validation/invalidEmail";


// mobile development once screen gets smaller
const Signup = () => {
  const toast = useToast();
  const { loginUser } = useCurrentUserContext();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    userName: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    dob: false,
    userName: false,
    email: false,
    password: false,
  });
  const [show, setShow] = React.useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const [input, setInput] = useState("");

  const handlePasswordClick = () => setShow(!show);

  const showListOnClick = () => {
    setShowChecklist(true);
  };

  const [addPatient, { error, data }] = useMutation(ADD_PATIENT);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    setFormErrors({
      ...formErrors,
      [name]: false,
    });
    setInput(e.target.value);
  };

  const isError = input === "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formState);
    const errors = {
      firstName: formState.firstName === "",
      lastName: formState.lastName === "",
      dob: formState.dob === "",
      userName: formState.userName === "",
      email: formState.email === "",
      password: formState.password === "",
    };
    if (isError) {
      return toast({
        title: "Error",
        description: "Please fill out all fields.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } 

    if (isInvalidEmail(formState.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    setFormErrors(errors);
    
    try {
        const dataResponse = await addPatient({
          variables: { ...formState },
        });
        // remove this console log
        console.log(dataResponse);
        const { token, patient } = dataResponse.data.addPatient;
        loginUser(patient, token);
        navigate("/");
      
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Box
      className="signup-form"
      w="100%"
      display="flex"
      justifyContent="center"
      flexDirection="column"
      mb={6}
      px={10}
    >
      <Text fontSize="2xl" display="flex" justifyContent="center" my={6}>
        Sign Up
      </Text>

      {data ? (
        <p>
          <Link to="/"></Link>
        </p>
      ) : (
        <Box mx={4}>
          <Text fontSize="xl" m={8}>
            General Information
          </Text>
          <FormControl
            isInvalid={formErrors.firstName}
            isRequired
            mt={4}
            display="flex"
            flexDirection="row"
            justifyContent="center"
            w="100%"
          >
            <Stack mr={3} flex="1">
              <FormLabel>First name</FormLabel>
              <Input
                placeholder="First name"
                name="firstName"
                onChange={handleChange}
                type="text"
                value={formState.firstName}
              />
              {isError ? (
                <FormErrorMessage>First name is required.</FormErrorMessage>
              ) : null}
            </Stack>

            <Stack flex="1">
              <FormLabel>Last name</FormLabel>
              <Input
                placeholder="Last name"
                name="lastName"
                type="text"
                onChange={handleChange}
                value={formState.lastName}
              />
                            {isError ? (
                <FormErrorMessage>Last name is required.</FormErrorMessage>
              ) : null}
            </Stack>
          </FormControl>

          <FormControl
            isInvalid={formErrors.email}
            isRequired
            mt={4}
            display="flex"
            flexDirection="row"
            justifyContent="center"
            w="100%"
          >
            <Stack mr={3} flex="1">
              <FormLabel>Email address</FormLabel>
              <Input
                placeholder="Email address"
                name="email"
                type="text"
                onChange={handleChange}
                value={formState.email}
              />
                            {isError ? (
                <FormErrorMessage>Email is required.</FormErrorMessage>
              ) : null}
            </Stack>

            <Stack flex="1">
              <FormLabel>Date of Birth</FormLabel>
              <Input
                placeholder="MM/DD/YYYY"
                name="dob"
                type="date"
                onChange={handleChange}
                value={formState.dob}
              />
                            {isError ? (
                <FormErrorMessage>Date of birth is required.</FormErrorMessage>
              ) : null}
            </Stack>
          </FormControl>
          <Text fontSize="xl" m={8}>
            Account Information
          </Text>

          
          <FormControl
            isInvalid={formErrors.userName}
            isRequired
            mt={4}
            display="flex"
            flexDirection="row"
            justifyContent="center"
            w="65%"
          >
            <Stack mr={3} flex="1">
            <FormLabel>Username</FormLabel>
            <Input
              placeholder="Username"
              name="userName"
              type="text"
              onChange={handleChange}
              value={formState.userName}
            />
            </Stack>
          </FormControl>

          <FormControl
            isInvalid={formErrors.password}
            isRequired
            mt={4}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            w="65%"
          >
            <InputGroup>
            <Stack mr={3} flex="1">
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="******"
                name="password"
                type={show ? "text" : "password"}
                onChange={handleChange}
                value={formState.password}
                onClick={showListOnClick}
              />
           
   
              {/* <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  // backgroundColor='#371236'
                  // _hover={{ bg: '#F7F9F7', color: 'black' }}
                  // color='white'
                  onClick={handlePasswordClick}
                >
                  {show ? "Hide" : "Show"}

                </Button>
              
              </InputRightElement> */}
              </Stack>
            </InputGroup>
            {showChecklist ? (
              <PasswordChecklistComp password={formState.password} />
            ) : (
              false
            )}
          </FormControl>
        </Box>
      )}
      <Center>
        <Button mt={6} size="lg" onClick={handleSubmit} bg="brand.callToActionButtons">
          Create Your Account
        </Button>
      </Center>
      {error ? <div>{error.message}</div> : null}
    </Box>
  );
};

export default Signup;
