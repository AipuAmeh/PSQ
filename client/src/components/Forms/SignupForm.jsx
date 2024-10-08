import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
  Input,
  Button,
  InputGroup,
  Center,
  Stack,
  InputRightElement,
  useBreakpointValue
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_PATIENT } from "../../utils/mutations";
import { useNavigate } from "react-router-dom";
import PasswordChecklistComp from "../Validation/PasswordChecklist";
import { isInvalidEmail } from "../../utils/validation/invalidEmail";

// mobile development once screen gets smaller

const SignupForm = () => {

  // breakpoints for mobile screens
  const mobileFormLayout = useBreakpointValue({ base: 'column', sm: 'column', md: 'row', lg: 'row'});

  const toast = useToast();
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
      const { token, patient } = dataResponse.data.addPatient;
      if (dataResponse !== null) {
        toast({
          title: "Success",
          description: "Successfully added patient",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }
      navigate("/dashboard");
      return { token, patient };
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Center
      className="signup-form"
      display="flex"
      justifyContent="center"
      flexDirection="column"
    >
      {data ? (
        <p>
          <Link to="/"></Link>
        </p>
      ) : (
        <Box w="80%">
          <FormControl
            isInvalid={formErrors.firstName}
            isRequired
            mt="3em"
            display="flex"
            flexDirection={mobileFormLayout}
            justifyContent="center"
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
            flexDirection={mobileFormLayout}
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

          <Box>
            <FormControl
              as="form"
              isInvalid={formErrors.userName}
              isRequired
              mt={4}
              display="flex"
              flexDirection={mobileFormLayout}
              justifyContent="center"
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

              <Stack mr={3} flex="1">
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    placeholder="******"
                    name="password"
                    type={show ? "text" : "password"}
                    onChange={handleChange}
                    value={formState.password}
                    autoComplete="password"
                    onClick={showListOnClick}
                  />

                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handlePasswordClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Stack>
            </FormControl>
            <Box display="flex">
              <Box flex="1"></Box>
              <Box flex="1">
                {showChecklist ? (
                  <PasswordChecklistComp password={formState.password} />
                ) : (
                  false
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      <Box>
        <Button my="3em" onClick={handleSubmit} bg="brand.callToActionButtons">
          Create Patient Account
        </Button>
      </Box>
      {error ? <div>{error.message}</div> : null}
    </Center>
  );
};

export default SignupForm;
