import PropTypes from 'prop-types';
import { Box, Text, } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const PatientDetails = ({firstname, lastname, email, dob, id}) => {
return (
    <Box display='flex' key={id} gap={7} justifyContent='space-between' py={2}>
   <Text fontSize='lg'> <Link className='pt-page-link' to={`/patient/${id}`}>{lastname}, {firstname}</Link></Text>
       <Text fontSize='lg'>{email}</Text>
        <Text fontSize='lg'>{dob}</Text>
    </Box>
)

};

PatientDetails.propTypes = {
    firstname: PropTypes.bool.isRequired,
    lastname: PropTypes.bool.isRequired,
    email: PropTypes.bool.isRequired,
    dob: PropTypes.bool.isRequired,
    id: PropTypes.bool.isRequired
}

export default PatientDetails;