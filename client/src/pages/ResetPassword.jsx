import { Box, Button, Center, FormControl, FormLabel, Input, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SAVE_NEW_PASSWORD } from "../utils/mutations";



const ResetPassword = () => {
const { id, token } = useParams();
const navigate = useNavigate();
const toast = useToast();
const [password, setPassword] = useState('');
const [secondPassword, setSecondPassword] = useState('');

const [submitPassword, setSubmitPassword] = useState(false);
const [submitSecondPassword, setSubmitSecondPassword] = useState(false);

const [saveNewPassword, { error, data}] = useMutation(SAVE_NEW_PASSWORD);

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

const onSubmit = async () => {
console.log('PASSWORD:', password),
console.log('SECOND PASSWORD:', secondPassword);

setSubmitPassword(true);
setSubmitSecondPassword(true);

try {
    const dataResponse = await saveNewPassword({
        variables: { 
            newPassword: password,
            patientId: id,
            token
        }
    });
    console.log(dataResponse);
    navigate('/login');
    return toast({
        title: "Success",
        description: "Successfully changed password.",
        status: "success",
        duration: 2000,
        isClosable: true,
    })
} catch (error) {
    console.error(error);
}

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
          type='password'
          />
        </FormControl>
        <FormControl isRequired isInvalid={isErrorSecondPassword}>
            <FormLabel mt={4}>Re-enter Password</FormLabel>
          <Input
          name='password'
          value={secondPassword} 
        onChange={onChangeSecondPassword}
        type='password'
          />
        </FormControl>
        <Button
        size='lg'
        mt={6}
        w='50%'
        onClick={onSubmit}
        >Save New Password</Button>
    </Box>
    </Center>

)
}

export default ResetPassword;