import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_CURRENT_PATIENT } from "../utils/queries";
import { Box, Flex, Text, IconButton} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import DashboardAvatar from "../components/Avatar";
import { formattedBday } from "../utils/validation/formattedBday";
import SinglePatientDemographics from "../components/Patient-Components/SinglePatientDemographics";
import { useCurrentUserContext } from "../utils/context/CurrentUser";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';


const PatientPage = () => {
    const { id }= useParams();
    const { isProvider } = useCurrentUserContext();
    const navigate = useNavigate();
 
    useEffect(() => {
        if (!isProvider) {
            navigate('/');
            return;
        }
    })

// query current patient
const { loading, error, data } = useQuery(QUERY_CURRENT_PATIENT, {
    variables: { patientId: id },

})

// check for loading and error states
if (loading) return <p>Loading...</p>
if (error) return <p>Error: {error.message}</p>






return (
    <Box>
    <Box display='flex' m='6' flexDirection='column' alignItems='center'> 
        <DashboardAvatar name={`${data.patient.firstName} ${data.patient.lastName}`}/>
     <Text mt={2} fontSize='3xl'>{data.patient.firstName} {data.patient.lastName}</Text>
     <Box display='flex' flexDirection='column'>
     <SinglePatientDemographics field={'Date of Birth'} value={formattedBday(data.patient.dob)}/>
    <SinglePatientDemographics field={'Email'} value={data.patient.email} />
     </Box>


    </Box>

<Flex gap={24} justifyContent='center'>

    <Box w='40%' h='15em' bg='brand.mintCream' border='4px' borderColor='brand.cambridgeBlue'>
        <Text fontSize='xl'  display='flex' justifyContent='center' lineHeight='2.3em' mt={2}>Medication List
        <IconButton aria-label='Add medication' icon={<AddIcon />} size='sm' m={2}  />
        </Text>
    </Box>
    <Box w='40%' h='15em' bg='brand.mintCream'  border='4px' borderColor='brand.cambridgeBlue'>
        <Text display='flex' justifyContent='center' fontSize='xl' lineHeight='2.3em' mt={2}>Chart Notes
            <IconButton aria-label='Add chartnote' icon={<AddIcon />} size='sm' m={2}  />
        </Text>
    </Box>
</Flex>
    </Box>

)
};

export default PatientPage;