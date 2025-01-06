import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputLeftAddon,
  InputGroup,
  Text,
  useToast,
  useBreakpointValue
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { ADD_PHARMACY } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";


const AddPharmacy = () => {

    // breakpoints for mobile screens
    const mobileFormWidth = useBreakpointValue({ base: '100%', sm: '100%', md: '70%', lg: '70%'});

  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const [addPharmacy] = useMutation(ADD_PHARMACY);
  const [formState, setFormState] = useState({
    patientId: id,
    pharmacyName: '',
    address: '',
    state: '',
    zipcode: 0,
    phone: ""

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
   setFormState({
    ...formState,
    [name]: value
   });
  };

  const handleSubmit = async () => {
    console.log(formState);
    // validation for empty fields
    if (formState.pharmacyName === "" || formState.address === "" || formState.state === "" || parseInt(formState.zipcode) === 0 || formState.phone === "") {
      return toast({
        title: "Error",
        description: "Please complete all fields.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
        // validation for zipcode 
        const zipcodeCheck = formState.zipcode;
        if (zipcodeCheck.length > 5) {
          console.log(' too long');
          return toast({
            title: "Error",
            description: "Zipcode not found",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        }
      // validation for phone number
      const numberCheck = formState.phone;
      console.log(numberCheck.length);
      if (numberCheck.length > 10 || numberCheck.length < 10) {
        return toast({
          title: "Error",
          description: "Please enter a valid pharmacy phone number.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
      // regex for checking if string is composed of all strings
      const onlyDigits = (str) => {
        return /^\d+$/.test(str);
      };

      if (!onlyDigits(numberCheck)) {
        return toast({
          title: "Error",
          description: "Please enter a valid pharmacy phone number.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }

    try {
      const dataResponse = await addPharmacy({
        variables: { 
          patientId: id,
          pharmacyName: formState.pharmacyName,
          address: formState.address,
          state: formState.state,
          zipcode: parseInt(formState.zipcode),
          phone: formState.phone
         }
      });
      navigate('/dashboard');
     return dataResponse;
    } catch (error) {
      console.log(error);
        }
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" px={10}>
      <Text fontSize="3xl" mt='3em'>
        Pharmacy Details
      </Text>
      <FormControl mt={8} isRequired w={mobileFormWidth}>
        <FormLabel>Pharmacy Name</FormLabel>
        <Input placeholder="Pharmacy Name" onChange={handleChange} name='pharmacyName'/>

        <FormLabel mt={4}>Address</FormLabel>
        <Input placeholder="Pharmacy Address" onChange={handleChange} name='address'/>

        <Box display="flex" justifyContent="center" gap={4}>
          <FormControl isRequired>
            <FormLabel mt={4}>State</FormLabel>
            <Input placeholder="e.g. WA" onChange={handleChange} name='state'/>
          </FormControl>

          <FormControl isRequired>
            <FormLabel mt={4}>Zipcode</FormLabel>
            <Input placeholder='99999' onChange={handleChange} name='zipcode' type='number'/>
          </FormControl>
        </Box>
        <FormLabel mt={4} >Phone</FormLabel>
        <InputGroup mb={4} w='49.5%'>
    <InputLeftAddon>+1</InputLeftAddon>
    <Input type='tel' placeholder='Phone Number' onChange={handleChange} name='phone'/>
  </InputGroup>

      </FormControl>
      <Box my={5}>
      <Button onClick={handleSubmit} bg='brand.callToActionButtons'>Add Pharmacy</Button>
      </Box>

    </Box>
  );
};

export default AddPharmacy;
