import {
  Box,
  Text,
  Stack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useBreakpointValue,
} from "@chakra-ui/react";

import { useCurrentUserContext } from "../../utils/context/CurrentUser";
import DashboardAvatar from "../Avatar";

import { QUERY_PROVIDER } from "../../utils/queries";
import { QUERY_ALL_PATIENTS } from "../../utils/queries";
import PatientDetails from "../Provider-Components/PatientDetails";
import Demographics from "../Profile/UserDemographicsRow";
import { useQuery } from "@apollo/client";
import SignupForm from "../Forms/SignupForm";
import { formattedDate } from "../../utils/validation/formattedDate";
import { Link } from "react-router-dom";

const ProviderDashboard = () => {
  // breakpoints for mobile screens
  const mobileDemographics = useBreakpointValue({
    base: "column",
    sm: "column",
    md: "row",
    lg: "row",
  });
  const demographicsLayout = useBreakpointValue({
    base: "center",
    sm: "center",
    md: "0",
    lg: "0",
  });
  const demographicsMargin = useBreakpointValue({
    base: "0em",
    sm: "0em",
    md: "3em",
    lg: "3em",
  });
  const demographicsGap = useBreakpointValue({
    base: "10",
    sm: "10",
    md: "20",
    lg: "20",
  });
  const accordionLayout = useBreakpointValue({
    base: "column",
    sm: "column",
    md: "row",
    lg: "row",
  });
  const accordionMargin = useBreakpointValue({ base: '1em', sm: '1em', md: 0, lg: 0});
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
  } = useQuery(QUERY_ALL_PATIENTS, {
    pollInterval: 500,
  });

  // checking for loading and error states
  if (loading || patientLoading) return <p>Loading...</p>;
  if (error || patientError) return <p>Error: {error.message}</p>;

  // sort patient data by alphabetical order
  const sortedPatients = [...patientData.allPatients].sort((a, b) => {
    if (a.lastName < b.lastName) {
      return -1;
    } else if (a.lastName > b.lastName) {
      return 1;
    } else {
      return 0;
    }
  });
  // create 3 different columns for: patient name, email, dob
  return (
    <Box display="flex" mt={6} flexDirection="column">
      <Text display="flex" justifyContent="center" fontSize="1.8em" mt="3em">
        Provider Portal
      </Text>
      <Box
        className="provider-details"
        alignItems={demographicsLayout}
        display="flex"
        flexDirection={mobileDemographics}
        justifyContent="center"
        gap={demographicsGap}
        mt={demographicsMargin}
      >
        <DashboardAvatar name={data.provider.providerName} />
        <Stack className="demographics" mt="2em">
          <Demographics
            field={"Provider Name"}
            value={data.provider.providerName}
          />
          <Demographics field={"Email"} value={data.provider.email} />
          <Demographics field={"Password"} value={"******"} />
        </Stack>
      </Box>
      <Box px={10} display="flex" flexDirection="column" mt={6}>
        <Accordion defaultIndex={[0]} allowToggle mt={8}>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left" fontSize="xl">
                  View All Patients
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} className="patient-accordion">
              <Box
                display="flex"
                justifyContent="space-between"
                flexDirection={accordionLayout}
              >
                <Box id="patient-name">
                  <Text fontSize="xl" className="accordion-header">
                    Patient Name
                  </Text>
                  {sortedPatients.map((patient) => {
                    return (
                      <Box key={patient._id}>
                        <Text fontSize="lg">
                          <Link
                            className="pt-page-link"
                            to={`/patient/${patient._id}`}
                          >
                            {patient.lastName}, {patient.firstName}
                          </Link>
                        </Text>
                      </Box>
                    );
                  })}
                </Box>
                <Box id="email">
                  <Text fontSize="xl" className="accordion-header"     mt={accordionMargin}>
                    Email
                  </Text>
                  {sortedPatients.map((patient) => {
                    return (
                      <PatientDetails key={patient._id} field={patient.email}/>
                    );
                  })}
                </Box>
                <Box id="date-of-birth">
                  <Text fontSize="xl" className="accordion-header"     mt={accordionMargin}>
                    Date of Birth
                  </Text>
                  {sortedPatients.map((patient) => {
                    return (
                      <PatientDetails key={patient._id} field={formattedDate(patient.dob)}/>
                    );
                  })}
                </Box>
              </Box>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left" fontSize="xl">
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
