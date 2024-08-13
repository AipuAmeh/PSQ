import { Box, Text, } from "@chakra-ui/react";

const PatientDetails = ({firstname, lastname, email, dob, id}) => {
return (
    <Box display='flex' gap='4em' key={id} justifyContent='space-between' p={2}>
        <Text flex={1} fontSize='lg'>{lastname}, {firstname}</Text>
        <Text flex={1} fontSize='lg'>{email}</Text>
        <Text flex={1} fontSize='lg'>{dob}</Text>
    </Box>
)

};

export default PatientDetails;