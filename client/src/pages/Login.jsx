import { useMutation } from "@apollo/client";
import { FormControl, FormLabel, Input, Center, Text, Button, useToast, Stack, Box, Link } from "@chakra-ui/react";
import { useState } from "react";
import { LOGIN_PATIENT, LOGIN_PROVIDER } from "../utils/mutations";
import { useCurrentUserContext } from "../utils/context/CurrentUser";
import { useNavigate } from "react-router-dom";
import { isInvalidEmail } from "../utils/validation/invalidEmail";
import ForgotPasswordModal from "../components/ForgotPasswordModal";
import { useDisclosure } from "@chakra-ui/react";

const Login = () => {
    const { loginUser } = useCurrentUserContext();
    const navigate = useNavigate();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [formState, setFormState] = useState({
        email: "",
        password: ""
    });
    const [formErrors, setFormErrors] = useState({
      email: false,
      password: false
    });
    const [input, setInput] = useState("");
    const [loginPatient] = useMutation(LOGIN_PATIENT);
    const [loginProvider] = useMutation(LOGIN_PROVIDER);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value
        });
        setFormErrors({
          ...formErrors,
          [name]: false
        });
        setInput(e.target.value);
    };

    const isError = input === "";

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(formState);
      const submitterId = await e.target.id;
    console.log('Form submitted by:', submitterId);
      if (isError) {
        return toast({
          title: "Error",
          description: "Please log in to your account.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }

      if (isInvalidEmail(formState.email)) {
        return toast({
          title: "Error",
          description: "Please enter a valid email.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
      try {
        if (e.target.id == "patient-login") {
          const patientResponse = await loginPatient({
            variables: { ...formState },
          });
          const { token, patient } = patientResponse.data.loginPatient;
  
          loginUser(patient, token);
          navigate("/");
        } else if (e.target.id == "provider-login") {
          const providerResponse = await loginProvider({
            variables: { ...formState },
          });
          const { token, provider } = providerResponse.data.loginProvider;
          loginUser(provider, token);
          navigate("/");
        }
// error handling for XSS attacks
      } catch (error) {
        console.log(error.message);
          return toast({
            title: "Error",
            description: "User does not exist.",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
      }
    };
    
    return (
      <Stack>
    <Center className="login-form" display='flex' flexDirection='column'>
                <Text fontSize='2xl' display='flex' justifyContent='center' flexDirection='column' my={6}>Login To Your Account</Text>
      <FormControl
        isRequired
        mt={4}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        w="65%"
      >
        <FormLabel>Email</FormLabel>
        <Input
        placeholder='Email'
        value={formState.email}
        type="text"
        name='email'
        onChange={handleChange}
        mb={4}
        />
        <FormLabel>Password</FormLabel>
        <Input
        placeholder='Password'
        value={formState.password}
        type="password"
        name='password'
        onChange={handleChange}
        />
        <Center gap={10}>
        <Button 
        my={4}
        id='patient-login'
        onClick={handleSubmit}
        bg="brand.callToActionButtons"
        w='fit-content'
        >Login Patient</Button>
        <Button
        id='provider-login'
        onClick={handleSubmit}
        bg="brand.callToActionButtons"
        w='fit-content'
        >Login Provider</Button>
        </Center>

      </FormControl>
    </Center>
    <Box 
    display='flex'
    justifyContent='center'
    flexDirection='row'
    gap={10}
    my={4}
      >
    <Text
    lineHeight='1.5em'
    >Forgot Password?</Text>
    <Text  className="reset-password-link">
    <Link
    onClick={onOpen}
    >Reset Password</Link>
    </Text>

    </Box>
      <ForgotPasswordModal isOpen={isOpen} onClose={onClose}/>
      </Stack>

  );
};

export default Login;
