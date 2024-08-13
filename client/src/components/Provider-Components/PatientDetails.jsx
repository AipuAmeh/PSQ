import { Box, Text, } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const PatientDetails = ({firstname, lastname, email, dob, id}) => {
return (
    <Box display='flex' gap='4em' key={id} justifyContent='space-between' p={2}>
   <Link to={`/patient/${id}`}>
   <Text flex={1} fontSize='lg'> {lastname}, {firstname}</Text>
   </Link>

   
        <Text flex={1} fontSize='lg'>{email}</Text>
        <Text flex={1} fontSize='lg'>{dob}</Text>
    </Box>
)

};

export default PatientDetails;