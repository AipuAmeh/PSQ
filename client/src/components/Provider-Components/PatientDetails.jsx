import PropTypes from 'prop-types';
import { Box, Text, } from "@chakra-ui/react";

const PatientDetails = ({field, id}) => {
return (
    <Box display='flex' key={id} >
   <Text fontSize='lg'>{field}</Text>
    </Box>
)

};

PatientDetails.propTypes = {
    field: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
}

export default PatientDetails;