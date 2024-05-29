import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Box,
  Input,
  Text,
  Button,
  InputGroup,
  Center,
  Stack,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { useMutation } from '@apollo/client';
import { ADD_PATIENT } from "../utils/mutations";
import { useCurrentUserContext } from "../utils/CurrentUser";

// mobile development once screen gets smaller
const Signup = () => {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    userName: "",
    email: "",
    password: ""
  });

  const [addPatient, { error, data }] = useMutation(ADD_PATIENT);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formState);
    try {
      if (!formState) {
        console.log('please fill out fields');
      } else {
        const dataResponse = await addPatient({
          variables: { ...formState }
        });
        console.log(dataResponse);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <Box
      className="signup-form"
      w="100%"
      display="flex"
      justifyContent="center"
      flexDirection="column"
    >
      <Text fontSize="2xl" display="flex" justifyContent="center" mt={6}>
        Create Your Account
      </Text>

      { data ? (
        <p> 
          <Link to='/'></Link>
        </p>
      ) : (
      <Box mx={4}>
        <FormControl
          isRequired
          mt={8}
          display="flex"
          flexDirection="row"
          justifyContent="center"
          w="100%"
        >
          <Stack mr={3} flex="1">
            <FormLabel>First name</FormLabel>
            <Input 
            placeholder="First name"
            name='firstName'
            onChange={handleChange}
            type="text"
            value={formState.firstName}
            />
          </Stack>

          <Stack flex="1">
            <FormLabel>Last name</FormLabel>
            <Input 
            placeholder="Last name" 
            name='lastName'
            type="text"
            onChange={handleChange}
            value={formState.lastName}
            />
          </Stack>
        </FormControl>

        <FormControl
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
            name='email'
            type="text"
            onChange={handleChange}
            value={formState.email}
            />
          </Stack>

          <Stack flex="1">
            <FormLabel>Date of Birth</FormLabel>
            <Input 
            placeholder="MM/DD/YYYY" 
            name='dob'
            type="date"
            onChange={handleChange}
            value={formState.dob} />
          </Stack>
        </FormControl>

        <FormControl
          isRequired
          mt={4}
          display="flex"
          flexDirection="row"
          justifyContent="center"
          w="100%"
        >
          <Stack mr={3} flex="1">
            <FormLabel>Username</FormLabel>
            <Input 
            placeholder="Username"
            name='userName'
            type='text'
            onChange={handleChange}
            value={formState.userName}
            />
          </Stack>

          <Stack flex="1">
            <FormLabel>Password</FormLabel>
            <Input 
            placeholder="******" 
            name='password'
            type="password"
            onChange={handleChange}
            value={formState.password}
            />
          </Stack>
        </FormControl>
      </Box>
)}
      <Center>
        <Button 
        mt={4} 
        w="50%"
        onClick={handleSubmit}>
          Sign Up
        </Button>
      </Center>
      {error ? <div>{error.message}</div> : null}
    </Box>
  );
};

export default Signup;
