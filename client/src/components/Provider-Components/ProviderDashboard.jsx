import {
  Box,
  Text,
  Stack,
  Accordion,
  Center,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { useCurrentUserContext } from "../../utils/context/CurrentUser";
import DashboardAvatar from "../Avatar";

import { QUERY_PROVIDER } from "../../utils/queries";
import { QUERY_ALL_PATIENTS } from "../../utils/queries";

import Demographics from "../Profile/UserDemographicsRow";
import { useQuery } from "@apollo/client";
import PatientDetails from "./PatientDetails";
import SignupForm from "../Forms/SignupForm";

const ProviderDashboard = () => {
  const { currentUser } = useCurrentUserContext();

  // retrieving provider data for demographics
  const { loading, error, data } = useQuery(QUERY_PROVIDER, {
    variables: { providerId: currentUser._id },
  });

  // retrieving all patients name, email, dob
  const {
    loading: patientLoading,
    error: patientError,
    data: patientData,
  } = useQuery(QUERY_ALL_PATIENTS);

  console.log("PATIENT DATA ARRAY:", patientData);

  // function for formatting each patient's birthday
  const formattedBirthday = (bday) => {
    if (isNaN(bday)) {
      return
    }
    const date = new Date(parseInt(bday, 10));
    const month = date.getMonth() + 1;
    const day = date.getDate() + 1;
    const year = date.getFullYear();
    const newBirthday = `${month}/${day}/${year}`; 
    // if day is one digit, add 0 in front of it 
    return newBirthday;  
  }

  // checking for loading and error states
  if (loading || patientLoading) return <p>Loading...</p>;
  if (error || patientError) return <p>Error: {error.message}</p>;

  return (
    <Box display="flex" mt={6} flexDirection="column">
      <Text display="flex" justifyContent="center" fontSize="2xl">
        Provider Portal
      </Text>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        gap={20}
        mt={10}
      >
        <DashboardAvatar name={data.provider.providerName} />
        <Stack>
          <Text fontSize="xl" mt="3em">
            Demographics
          </Text>
          <Demographics
            field={"Provider Name"}
            value={data.provider.providerName}
          />
          <Demographics field={"Email"} value={data.provider.email} />
          <Demographics field={"Password"} value={"******"} />
        </Stack>
      </Box>
      <Box px={10} display="flex" flexDirection="column" mt={6}>
        <Accordion defaultIndex={[0]} allowMultiple mt={8}>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left" fontSize='xl'>
                  View All Patients
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Box display='flex' justifyContent='space-between'  mr='20em'>
                <Text fontSize='xl' className="accordion-header">Patient Name</Text>
                <Text fontSize='xl' className="accordion-header">Email</Text>
                <Text fontSize='xl' className="accordion-header" >Date of Birth</Text>
              </Box>
              {patientData.allPatients.map((patient) => {
                return (
                  <>
                    <PatientDetails
                      firstname={patient.firstName}
                      lastname={patient.lastName}
                      email={patient.email}
                      dob={formattedBirthday(patient.dob)}
                    />
                  </>
                );
              })}
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left" fontSize='xl'>
                  Add a Patient
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <SignupForm />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </Box>
  );
};

export default ProviderDashboard;
