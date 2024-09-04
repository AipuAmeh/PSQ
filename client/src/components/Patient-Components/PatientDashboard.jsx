import {
  Box,
  Text,
  Spacer,
  Stack,
  Flex,
  Button,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { useCurrentUserContext } from "../../utils/context/CurrentUser";
import { useQuery } from "@apollo/client";
import DashboardAvatar from "../Avatar";
import { QUERY_CURRENT_PATIENT } from "../../utils/queries";
import Demographics from "../Profile/UserDemographicsRow";
import ConfirmationModal from "../ConfirmationModal";
import { useDisclosure } from "@chakra-ui/react";
import { formattedDate } from "../../utils/validation/formattedDate";
import { Link } from "react-router-dom";

// spacing issue with patients that have pharmacies
const PatientDashboard = () => {
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
    <Flex display="flex" mt={6} flexDirection="column">
      <Text fontSize="2xl" display="flex" justifyContent="center">
        Patient Portal
      </Text>
      <Box display="flex" flexDirection="row" mt={10} mx="20%">
        <DashboardAvatar
          name={`${data.patient.firstName} ${data.patient.lastName}`}
        />

        <Spacer />
        <Stack>
          <Text fontSize="2xl" mt="3em" mb="1em">
            Demographics
          </Text>
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
      <Flex gap={24} justifyContent="center" mb={4}>
        <Box
          mt={4}
          ml={8}
          w="40%"
          border="4px"
          borderColor="brand.cambridgeBlue"
          h="fit-content"
          p={2}
        >
          <Text fontSize="2xl" ml={8}>
            Pharmacy Information
          </Text>
          {data.patient.pharmacies[0] == undefined ? (
            <Box p={3} ml={4}>
              <Link to={`/${currentUser._id}/add-pharmacy`}>
                <Button size="md" bg="brand.accentBtns" w="100">
                  Add Pharmacy
                </Button>
              </Link>
            </Box>
          ) : (
            <>
              <Demographics
                _id={currentUser._id}
                field="Pharmacy"
                value={`${data.patient.pharmacies[0].pharmacyName} ${data.patient.pharmacies[0].address}, ${data.patient.pharmacies[0].state}, ${data.patient.pharmacies[0].zipcode}`}
              />
              <Demographics
                _id={currentUser._id}
                field="Pharmacy Number"
                value={`${data.patient.pharmacies[0].phone}`}
              />
            </>
          )}
        </Box>
        <Box
          mt={4}
          ml={8}
          w="40%"
          border="4px"
          borderColor="brand.cambridgeBlue"
          h="fit-content"
          p={2}
        >
          <Text fontSize="2xl" ml={8}>
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

      <Box display="flex" justifyContent="center" mt={8}>
        <Button
          onClick={onOpen}
          size="md"
          w="fit-content"
          bg="brand.accentBtns"
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
