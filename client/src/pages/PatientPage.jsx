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
import { useDisclosure } from "@chakra-ui/react";
import ChartNoteModal from "../components/Provider-Components/ChartNoteModal";


const PatientPage = () => {
    const { id }= useParams();
    const { isProvider } = useCurrentUserContext();
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
 
    useEffect(() => {
        if (!isProvider) {
            navigate('/');
            return;
        }
    })

// query current patient
const { loading, error, data } = useQuery(QUERY_CURRENT_PATIENT, {
    variables: { patientId: id },
});



// check for loading and error states
if (loading) return <p>Loading...</p>
if (error) return <p>Error: {error.message}</p>

const chartNotes = data.patient.chartNotes;
console.log(chartNotes);






return (
    <Box>
    <Box display='flex' m='6' flexDirection='column' alignItems='center'> 
        <DashboardAvatar name={`${data.patient.firstName} ${data.patient.lastName}`}/>
     <Text mt={2} fontSize='3xl'>{data.patient.firstName} {data.patient.lastName}'s Chart</Text>
     <Box display='flex' flexDirection='column'>
     <SinglePatientDemographics field={'Date of Birth'} value={formattedBday(data.patient.dob)}/>
    <SinglePatientDemographics field={'Email'} value={data.patient.email} />
     </Box>


    </Box>

<Flex gap={24} justifyContent='center' mb={4}>

    <Box w='40%' h='15em'  border='4px' borderColor='brand.cambridgeBlue'>
        <Text fontSize='xl'  display='flex' justifyContent='center' lineHeight='2.3em' mt={2}>Medication List
    
        </Text>
    </Box>
    <Box w='40%' h='15em'   border='4px' borderColor='brand.cambridgeBlue'>
        <Text display='flex' justifyContent='center' fontSize='xl' lineHeight='2.3em' mt={2}>Chart Notes
            <IconButton aria-label='Add chartnote' onClick={onOpen}icon={<AddIcon />} size='sm' m={2}  />
        </Text>
        <ChartNoteModal _id={id} isOpen={isOpen} onClose={onClose} />
        text box
    </Box>
</Flex>
    </Box>

)
};

export default PatientPage;