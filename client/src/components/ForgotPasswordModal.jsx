import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Box,
    Button,
    Text,
    Input
  } from '@chakra-ui/react'
import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { isInvalidEmail } from '../utils/validation/invalidEmail';
import { useMutation } from '@apollo/client';
import { RESET_PASSWORD } from '../utils/mutations';

const ForgotPasswordModal = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const toast = useToast();
    const [sendResetPasswordEmail, { error, data }] = useMutation(RESET_PASSWORD);
    const saveEmail = (e) => {

        setEmail(e.target.value);
    };

    const submitEmail = async () => {
      const invalidEmail = isInvalidEmail(email);
      if (invalidEmail) {
        return toast({
          title: "Error",
          description: "Please enter a valid email.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      } else {
        try {
          const patientResponse = await sendResetPasswordEmail({
            variables: { email }
          });
          setEmail('');
          console.log(patientResponse);
          return toast({
            title: "Success",
            description: "Please check your email for further directions.",
            status: "success",
            duration: 2000,
            isClosable: true,
          });      
        } catch (error) {
          console.log(error);
        }

      }
      onClose();
    }

return (
    <Box>
<Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalCloseButton />
    <ModalHeader></ModalHeader>
    <ModalBody>
<Box>
<Text mb={4}>Enter the email address associated with your account.</Text>
<Input 
type='text'
onChange={saveEmail}
/>
</Box>
    </ModalBody>

    <ModalFooter>
      <Button 
      mb={4} mx={6} mt={2}
      onClick={submitEmail}
      >Send Verification Email</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
    </Box>
)

}

export default ForgotPasswordModal;