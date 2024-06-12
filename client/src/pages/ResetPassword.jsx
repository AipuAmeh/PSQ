import { Box, Button, Center, FormControl, FormLabel, Input, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";




const ResetPassword = () => {
const { id, token } = useParams();
const navigate = useNavigate();
const toast = useToast();
const [password, setPassword] = useState('');
const [secondPassword, setSecondPassword] = useState('');

const [submitPassword, setSubmitPassword] = useState(false);
const [submitSecondPassword, setSubmitSecondPassword] = useState(false);

const isErrorPassword = password === "" && submitPassword;
const isErrorSecondPassword = password !== secondPassword && submitSecondPassword;

const onChangePassword = (e) => {
    setPassword(e.target.value);
    setSubmitPassword(false);
    setSubmitSecondPassword(false);
};

const onChangeSecondPassword = (e) => {
    setSecondPassword(e.target.value);
    setSubmitSecondPassword(false);
}   

return (
    <Center>
    <Box display='flex' flexDirection='column' w='65%' mt={4} alignItems='center'>
        <Text my={6} fontSize='3xl'>Reset Your Password</Text>
        <FormControl isRequired isInvalid={isErrorPassword}>
            <FormLabel>Password</FormLabel>
          <Input
          name='password'
          value={password}
          onChange={onChangePassword}
          />
        </FormControl>
        <FormControl isRequired isInvalid={isErrorSecondPassword}>
            <FormLabel mt={4}>Re-enter Password</FormLabel>
          <Input
          name='password'
          value={secondPassword} 
             onChange={onChangeSecondPassword}
          />
        </FormControl>
        <Button
        size='lg'
        mt={6}
        w='30%'
        >Submit</Button>
    </Box>
    </Center>

)
}

export default ResetPassword;