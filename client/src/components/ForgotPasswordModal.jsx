import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Box,
    Button
  } from '@chakra-ui/react'
import { useState } from 'react';
import { useToast } from '@chakra-ui/react';

const ForgotPasswordModal = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const toast = useToast();

    const saveEmail = (e) => {
        setEmail(e.target.value);
    };

return (
    <Box>
<Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Modal Title</ModalHeader>
    <ModalCloseButton />
    <ModalBody>

    </ModalBody>

    <ModalFooter>
      <Button colorScheme='blue' mr={3} onClick={onClose}>
        Close
      </Button>
      <Button variant='ghost'>Secondary Action</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
    </Box>
)

}

export default ForgotPasswordModal;