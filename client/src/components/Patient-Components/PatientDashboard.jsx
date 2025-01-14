import {
  Box,
  Text,
  useBreakpointValue,
  Stack,
  Flex,
  Button,
  UnorderedList,
  ListItem,
  IconButton,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useCurrentUserContext } from "../../utils/context/CurrentUser";
import { useQuery } from "@apollo/client";
import DashboardAvatar from "../Avatar";
import { QUERY_CURRENT_PATIENT } from "../../utils/queries";
import Demographics from "../Profile/UserDemographicsRow";
import ConfirmationModal from "../ConfirmationModal";
import { useDisclosure } from "@chakra-ui/react";
import { formattedDate } from "../../utils/validation/formattedDate";
import { Link } from "react-router-dom";
import PharmacyDemographics from "../Profile/PharmacyDemographics";

// spacing issue with patients that have pharmacies
const PatientDashboard = () => {
  // breakpoints for mobile screens
  const demographicsGap = useBreakpointValue({
    base: "10",
    sm: "10",
    md: "20",
    lg: "20",
  });
  const mobileLayout = useBreakpointValue({
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
  const mobileBoxLayout = useBreakpointValue({
    base: "100%",
    sm: "100%",
    md: "40%",
    lg: "40%",
  });
  const mobileBoxGap = useBreakpointValue({ base: 10, sm: 10, md: 24, lg: 24 });

  const { currentUser } = useCurrentUserContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loading, error, data } = useQuery(QUERY_CURRENT_PATIENT, {
    variables: { patientId: currentUser._id },
  });
  console.log(data);
  // variable for all patients medications
  // if (!data.patient.medications) {
  // console.log('meds here')
  // } else {
  // console.log('no meds here')
  // }

  // const medicationList = data.patient.medications;

  // checking for loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Flex display="flex" flexDirection="column">
      <Text fontSize="1.8em" display="flex" justifyContent="center" mt="3em">
        Patient Portal
      </Text>
      <Box
        display="flex"
        flexDirection={mobileLayout}
        justifyContent="center"
        mt={demographicsMargin}
        mx="20%"
        gap={demographicsGap}
        alignItems={demographicsLayout}
      >
        <DashboardAvatar
          name={`${data.patient.firstName} ${data.patient.lastName}`}
        />
        <Stack my="2em">
          <Demographics
            field={"Name"}
            value={`${data.patient.firstName} ${data.patient.lastName}`}
          />
          <Demographics
            field={"Date of Birth"}
            value={formattedDate(data.patient.dob)}
          />
          <Demographics
            _id={currentUser._id}
            field={"Email"}
            value={data.patient.email}
          />
          <Demographics
            _id={currentUser._id}
            field={"Username"}
            value={data.patient.userName}
          />
          <Demographics
            _id={currentUser._id}
            field={"Password"}
            value={"******"}
          />
        </Stack>
      </Box>

      <Flex
        gap={mobileBoxGap}
        justifyContent="center"
        my={3}
        mx="2em"
        flexDirection={mobileLayout}
      >
        <Box
          w={mobileBoxLayout}
          border="4px"
          borderColor="brand.cambridgeBlue"
          h="fit-content"
          p={'1em'}
        >
          <Text
            display="flex"
            flexDirection="column"
            justifyContent="center"
            fontSize="xl"
            lineHeight="2.3em"
            mt={2}
          >
            {data.patient.pharmacies[0] == undefined ? (
              <Link to={`/${currentUser._id}/add-pharmacy`}>
                <IconButton
                  aria-label="Add pharmacy"
                  m={2}
                  size="sm"
                  icon={<AddIcon />}
                  w="100"
                ></IconButton>
              </Link>
            ) : (
              <>
                <PharmacyDemographics
                  _id={currentUser._id}
                  field="Pharmacy"
                  value={`${data.patient.pharmacies[0].pharmacyName} ${data.patient.pharmacies[0].address}, ${data.patient.pharmacies[0].state}, ${data.patient.pharmacies[0].zipcode}`}
                />
                <PharmacyDemographics
                  _id={currentUser._id}
                  field="Pharmacy Number"
                  value={`${data.patient.pharmacies[0].phone}`}
                />
              </>
            )}
          </Text>
        </Box>
        <Box
          w={mobileBoxLayout}
          border="4px"
          borderColor="brand.cambridgeBlue"
          h="fit-content"
          p={2}
        >
          <Text
            display="flex"
            justifyContent="center"
            fontSize="xl"
            lineHeight="2.3em"
            mt={2}
          >
            Medication List
          </Text>
          <UnorderedList ml={10} mt={4}>
            {data.patient.medictions == []
              ? false
              : data.patient.medications.map((meds) => {
                  return <ListItem key={currentUser._id}>{meds}</ListItem>;
                })}
          </UnorderedList>
        </Box>
      </Flex>

      <Box display="flex" justifyContent="center" my={8}>
        <Button
          onClick={onOpen}
          size="md"
          w="fit-content"
          variant="ghost"
          color="red"
          borderColor="red"
        >
          Delete My Account
        </Button>
        <ConfirmationModal
          _id={currentUser._id}
          isOpen={isOpen}
          onClose={onClose}
        />
      </Box>
    </Flex>
  );
};

export default PatientDashboard;
