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

const AddPharmacy = () => {
  const { id } = useParams();
  console.log("PATIENTS ID: " + id);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" px={10}>
      <Text fontSize="3xl" mt={6}>
        Add Pharmacy
      </Text>
      <FormControl>
        <FormLabel>Pharmacy Name</FormLabel>
        <Input placeholder="Pharmacy Name"/>

        <FormLabel mt={4}>Address</FormLabel>
        <Input placeholder="Pharmacy Address"/>

        <Box display="flex" justifyContent="center" gap={4}>
          <FormControl>
            <FormLabel mt={4}>State</FormLabel>
            <Input placeholder="e.g. Washington"/>
          </FormControl>

          <FormControl>
            <FormLabel mt={4}>Zipcode</FormLabel>
            <Input w="80%" placeholder='99999'/>
          </FormControl>
        </Box>
        <FormLabel mt={4} >Phone</FormLabel>
        <InputGroup mb={4} w='49.5%'>
    <InputLeftAddon>+1</InputLeftAddon>
    <Input type='tel' placeholder='Phone Number' />
  </InputGroup>

      </FormControl>
      <Button>Submit</Button>
    </Box>
  );
};

export default AddPharmacy;
