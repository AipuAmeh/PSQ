import React from "react";
import { useMutation } from "@apollo/client";
import {
  FormControl,
  FormLabel,
  Input,
  Center,
  Text,
  Button,
  useToast,
  Stack,
  Box,
  Link,
  InputGroup,
  InputRightElement,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { LOGIN_PATIENT, LOGIN_PROVIDER } from "../utils/mutations";
import { useCurrentUserContext } from "../utils/context/CurrentUser";
import { useNavigate } from "react-router-dom";
import { isInvalidEmail } from "../utils/validation/invalidEmail";
import ForgotPasswordModal from "../components/ForgotPasswordModal";
import { useDisclosure } from "@chakra-ui/react";

const Login = () => {

  // breakpoints for mobile screens
  const mobileFormWidth = useBreakpointValue({ base: '80%', sm: '80%', md: '60%', lg: '60%'});

  // SEE USER DEMOGRAPHICS ROW FOR ERRORS AND OUTLINE
  // LESS TOAST MESSAGES
  const { loginUser } = useCurrentUserContext();
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: false,
    password: false,
  });
  const [show, setShow] = React.useState(false);
  const [input, setInput] = useState("");
  const [loginPatient] = useMutation(LOGIN_PATIENT);
  const [loginProvider] = useMutation(LOGIN_PROVIDER);

  const handlePasswordClick = () => setShow(!show);

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
    const submitterId = await e.target.id;
    console.log("Form submitted by:", submitterId);
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
        navigate("/dashboard");
      } else if (e.target.id == "provider-login") {
        const providerResponse = await loginProvider({
          variables: { ...formState },
        });
        const { token, provider } = providerResponse.data.loginProvider;
        loginUser(provider, token);
        navigate("/dashboard");
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
      <Center className="login-form" display="flex" flexDirection="column">
        <Box display="flex" justifyContent="center" flexDirection="column">
          <Text fontSize="1.8em" mt="3em">
            Login To Your Account
          </Text>
        </Box>

        <FormControl
          as="form"
          isRequired
          mt="3em"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          w={mobileFormWidth}
        >
          <FormLabel>Email</FormLabel>
          <Input
            id="email"
            placeholder="Email"
            value={formState.email}
            autoComplete="email"
            type="text"
            name="email"
            onChange={handleChange}
            mb={4}
          />
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              placeholder="Password"
              value={formState.password}
              autoComplete="password"
              type={show ? "text" : "password"}
              name="password"
              onChange={handleChange}
            />
            <InputRightElement width="4.5rem">
              <IconButton h="1.75rem" size="sm" onClick={handlePasswordClick}>
                {show ? <ViewIcon /> : <ViewOffIcon />}
              </IconButton>
            </InputRightElement>
          </InputGroup>

          <Center gap={10} mt={5}>
            <Button
              my={6}
              id="patient-login"
              onClick={handleSubmit}
              bg="brand.callToActionButtons"
              w="fit-content"
              px={8}
            >
              Login Patient
            </Button>
            <Button
              id="provider-login"
              onClick={handleSubmit}
              bg="brand.callToActionButtons"
              w="fit-content"
              px={7}
            >
              Login Provider
            </Button>
          </Center>
        </FormControl>
      </Center>
      <Box display="flex" justifyContent="center" flexDirection="row" gap={10} mb={5}>
        <Text lineHeight="1.5em">Forgot Password?</Text>
        <Text className="reset-password-link">
          <Link onClick={onOpen}>Reset Password</Link>
        </Text>
      </Box>
      <ForgotPasswordModal isOpen={isOpen} onClose={onClose} />
    </Stack>
  );
};

export default Login;
