import { Box, Text, Stack, Accordion, Center,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon, } from "@chakra-ui/react";
import { useCurrentUserContext } from "../../utils/context/CurrentUser";
import DashboardAvatar from "../Avatar";

import { QUERY_PROVIDER } from "../../utils/queries";
import { QUERY_ALL_PATIENTS } from "../../utils/queries";

import Demographics from "../Profile/UserDemographicsRow";
import { useQuery } from "@apollo/client";


const ProviderDashboard = () => {
  const { currentUser } = useCurrentUserContext();

  // retrieving provider data for demographics
  const { loading, error, data } = useQuery(QUERY_PROVIDER, {
    variables: { providerId: currentUser._id },
  });

  // retrieving all patients name, email, dob
  const { loading: patientLoading, error: patientError, data: patientData } = useQuery(QUERY_ALL_PATIENTS);
  
  if (patientLoading) {
    console.log('Loading patient data...');
  } else if (patientError) {
    console.error('Error loading patient data:', patientError);
  } else if (patientData) {
    console.log('ALL PATIENT DATA:', patientData);
  } else {
    console.log('No patient data available.');
  }


  // checking for loading and error states
  if (loading || patientLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Box display="flex" mt={6} flexDirection="column">
      <Text display='flex'justifyContent='center' fontSize="2xl">Provider Portal</Text>
      <Box display="flex" flexDirection="row" justifyContent='center' gap={20} mt={10}>
        <DashboardAvatar name={data.provider.providerName} />
        <Stack>
          <Text fontSize="xl" mt="3em">
            Demographics
          </Text>
          <Demographics field={"Provider Name"} value={data.provider.providerName} />
          <Demographics field={"Email"} value={data.provider.email} />
          <Demographics field={"Password"} value={'******'} />
        </Stack>
      </Box>
      <Box px={10} display='flex' flexDirection='column'>
      <Text fontSize="xl" mt="3em">
            Patients
          </Text>
          <Accordion defaultIndex={[0]} allowMultiple mt={8}>
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as='span' flex='1' textAlign='left'>
         View All Patients
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as='span' flex='1' textAlign='left'>
          Add a Patient
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </AccordionPanel>
  </AccordionItem>
</Accordion>
      </Box>
    </Box>
  );
};

export default ProviderDashboard;
