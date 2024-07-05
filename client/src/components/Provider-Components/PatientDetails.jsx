import { Box, Text } from "@chakra-ui/react";

const PatientDetails = ({name, email, dob, id}) => {
return (
    <Box display='flex' gap={10} key={id}>
        {/* <ul> */}
        <Text flex={1} fontSize='lg'>{name}</Text>
        <Text flex={1} fontSize='lg'>{email}</Text>
        <Text flex={1} fontSize='lg'>{dob}</Text>
        {/* </ul> */}

    </Box>
)

};

export default PatientDetails;