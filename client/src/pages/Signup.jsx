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
    Center
  } from '@chakra-ui/react'

const Signup = () => {
    return (
        <Box className='signup-form'   w='100%'>
            <Text fontSize='2xl'>Create Your Account</Text>
<Center>
<FormControl 
         isRequired
        mt={4} 
        display="flex"
        flexDirection="column"
        w='65%'
    >
  <FormLabel>First name</FormLabel>
  <Input placeholder='First name' />
  <FormLabel pt={4}>Last name</FormLabel>
  <Input placeholder='Last name' />
  <FormLabel pt={4}>Date of Birth</FormLabel>
  <Input placeholder='MM/DD/YYYY' />
  <FormLabel pt={4}>Email address</FormLabel>
  <Input placeholder='Email address' />
  <FormLabel pt={4}>Username</FormLabel>
  <Input placeholder='Username' />
  <FormLabel pt={4}>Password</FormLabel>
  <Input 
  placeholder='Password'
  type='password' />
</FormControl>
</Center>
<Button mt={3}>Sign Up</Button>

        </Box>
    )
}

export default Signup;