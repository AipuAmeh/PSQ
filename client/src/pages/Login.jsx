import { Box, FormControl, FormLabel, Input, Center, Text } from "@chakra-ui/react";
import { useState } from "react";

const Login = () => {
    const [formState, setFormState] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value
        });
        console.log(formState);
    }
    
    return (
    <Center className="login-form" display='flex' flexDirection='column'>
                <Text fontSize='2xl' display='flex' justifyContent='center' flexDirection='column' my={6}>Login To Your Account</Text>
      <FormControl
        isRequired
        mt={4}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        w="80%"
      >
        <FormLabel>Email</FormLabel>
        <Input
        placeholder='Email'
        value={formState.email}
        type="text"
        name='email'
        onChange={handleChange}
        />
        <FormLabel>Password</FormLabel>
        <Input
        placeholder='Email'
        value={formState.password}
        type="text"
        name='password'
        onChange={handleChange}
        />
      </FormControl>
    </Center>
  );
};

export default Login;
