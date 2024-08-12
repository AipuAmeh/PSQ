import PropTypes from 'prop-types';
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
    Text
  } from '@chakra-ui/react';
  import { useMutation } from '@apollo/client';
  import { DELETE_ACCOUNT } from '../utils/mutations';
  import { useNavigate } from 'react-router-dom';
  import { useToast } from '@chakra-ui/react';
  import { useCurrentUserContext } from '../utils/context/CurrentUser';



const ConfirmationModal = ({ _id, isOpen,onClose }) => {
    const navigate = useNavigate();
    const toast = useToast();
    const { logoutUser } = useCurrentUserContext();

    const [deletePatientAccount] = useMutation(DELETE_ACCOUNT);

    const handleSubmit = async () => {
        try {
            const dataResponse = await deletePatientAccount({
                variables: { _id }
            });
            logoutUser();
            navigate('/')
            toast({
                title: "Success",
                description: "Account successfully deleted",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
            return dataResponse;
        } catch (error) {
            console.log(error);
        }

    };

    return (
<Box>
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
   <ModalContent>
   <ModalHeader>Delete My Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
      <Text>Are you sure you want to delete your account?</Text>
          </ModalBody>

          <ModalFooter>
            <Button bg='brand.callToActionButtons' mr={3} onClick={onClose}>
              No
            </Button>
            <Button variant='ghost' color='red' onClick={handleSubmit}>Yes, delete my account</Button>
          </ModalFooter>
   </ModalContent>
    <ModalCloseButton />

    </Modal>
</Box>
);

};

ConfirmationModal.propTypes = {
    isOpen:  PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  };

export default ConfirmationModal;