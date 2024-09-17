import PropTypes from 'prop-types';
import { useMutation } from "@apollo/client";
import { Box, Button, useToast } from "@chakra-ui/react";
import { DELETE_ACCOUNT } from "../../utils/mutations";
import { useNavigate } from "react-router-dom";


const DeletePatient = ({ _id }) => {
const [deletePatientAccount] = useMutation(DELETE_ACCOUNT);
const navigate = useNavigate();
const toast = useToast();


    const handleSubmit = async () => {
      try {
        const dataResponse = await deletePatientAccount({
          variables: { _id }
        });
        navigate('/dashboard');
        toast({
          title: "Success",
          description: "Patients's account successfully deleted",
          status: "success",
          duration: 2000,
          isClosable: true,
      });
      return dataResponse;
      } catch (error) {
        console.log(error);
      }
    }
    return (
      <Box display='flex' justifyContent='flex-start' m={4} >
      <Button variant='ghost' color='red' onClick={handleSubmit} borderColor='red'>Delete Patient Account</Button>
    </Box>
    )
}

DeletePatient.propTypes = {
  _id: PropTypes.string.isRequired
};

export default DeletePatient;