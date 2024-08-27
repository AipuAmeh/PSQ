import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputLeftAddon,
  InputGroup,
  Text,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useState } from "react";

const AddPharmacy = () => {
  const { id } = useParams();
//   console.log("PATIENTS ID: " + id);
  const [formState, setFormState] = useState({
    patientId: id,
    pharmacyName: '',
    address: '',
    state: '',
    zipcode: 0,
    phone: 0

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
   setFormState({
    ...formState,
    [name]: value
   });
  };

  const handleSubmit = () => {
    console.log(formState);
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" px={10}>
      <Text fontSize="3xl" mt={6}>
        Pharmacy Details
      </Text>
      <FormControl mt={8}>
        <FormLabel>Pharmacy Name</FormLabel>
        <Input placeholder="Pharmacy Name" onChange={handleChange} name='pharmacyName'/>

        <FormLabel mt={4}>Address</FormLabel>
        <Input placeholder="Pharmacy Address" onChange={handleChange} name='address'/>

        <Box display="flex" justifyContent="center" gap={4}>
          <FormControl>
            <FormLabel mt={4}>State</FormLabel>
            <Input placeholder="e.g. Washington" onChange={handleChange} name='state'/>
          </FormControl>

          <FormControl>
            <FormLabel mt={4}>Zipcode</FormLabel>
            <Input w="80%" placeholder='99999' onChange={handleChange} name='zipcode'/>
          </FormControl>
        </Box>
        <FormLabel mt={4} >Phone</FormLabel>
        <InputGroup mb={4} w='49.5%'>
    <InputLeftAddon>+1</InputLeftAddon>
    <Input type='tel' placeholder='Phone Number' onChange={handleChange} name='phone'/>
  </InputGroup>

      </FormControl>
      <Button onClick={handleSubmit} bg='brand.callToActionButtons'>Add Pharmacy</Button>
    </Box>
  );
};

export default AddPharmacy;
