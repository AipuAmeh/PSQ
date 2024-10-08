import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_CURRENT_PATIENT } from "../utils/queries";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  VisuallyHidden,
  UnorderedList,
  ListItem,
  Input,
  useBreakpointValue,
} from "@chakra-ui/react";
import { AddIcon, } from "@chakra-ui/icons";
import DashboardAvatar from "../components/Avatar";
import { formattedDate } from "../utils/validation/formattedDate";
import SinglePatientDemographics from "../components/Patient-Components/SinglePatientDemographics";
import { useCurrentUserContext } from "../utils/context/CurrentUser";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import ChartNoteModal from "../components/Provider-Components/ChartNoteModal";
import { ADD_MED } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import DeletePatient from "../components/Provider-Components/DeletePatient";
import ChartNoteDetails from "../components/Provider-Components/ChartNoteDetails";

const PatientPage = () => {

  // breakpoints for mobile screens
  const mobileLayout = useBreakpointValue({ base: 'column', sm: 'column', md: 'row', lg: 'row'});
  const mobileBoxLayout = useBreakpointValue({ base: '100%', sm: '100%', md: '40%', lg: '40%'});
  const mobileBoxGap = useBreakpointValue({base: 10, sm: 10, md: 24, lg: 24});

  const { id } = useParams();
  const { isProvider } = useCurrentUserContext();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [addMed, setAddMeds] = useState(false);
  const [formState, setFormState] = useState({
    medication: "",
  });

  // if not a provider, return back to homepage
  useEffect(() => {
    if (!isProvider) {
      navigate("/");
      return;
    }
  });

  // query current patient
  // use poll interval to "refresh" with any updates to patient page
  const { loading, error, data } = useQuery(QUERY_CURRENT_PATIENT, {
    variables: { patientId: id },
    pollInterval: 500,
  });


  const [addMedication, { error: medError }] = useMutation(ADD_MED);
  // check for loading and error states
  if (loading) return <p>Loading...</p>;
  if (error || medError) return <p>Error: {error}</p>;

  const chartNotes = data.patient.chartNotes;
  const medications = data.patient.medications;

  const onClickMed = () => {
    setAddMeds(true);
  };

  const handleMedChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onMedSubmit = async () => {
    try {
      const medResponse = await addMedication({
        variables: {
          medications: formState.medication,
          patientId: id,
        },
      });
      setAddMeds(false);
      setFormState("");
      return medResponse;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Box display="flex" my="6" flexDirection="column" alignItems="center" px='2em'>
        <DashboardAvatar
          name={`${data.patient.firstName} ${data.patient.lastName}`}
        />
        <Text mt='2em' fontSize="1.8em">
          {data.patient.firstName} {data.patient.lastName}'s Chart
        </Text>
        <Box display="flex" flexDirection="column" my='2em'>
          <SinglePatientDemographics
            field={"Date of Birth"}
            value={formattedDate(data.patient.dob)}
          />
          <SinglePatientDemographics
            field={"Email"}
            value={data.patient.email}
          />
          {data.patient.pharmacies[0] == undefined ? (
            <>
              <Link to={`/${data.patient._id}/add-pharmacy`}>
                <Button size="md" bg="brand.accentBtns" w="100%">
                  Add Pharmacy
                </Button>
              </Link>
            </>
          ) : (
            <>
              <SinglePatientDemographics
                field="Pharmacy"
                value={`${data.patient.pharmacies[0].pharmacyName} ${data.patient.pharmacies[0].address}, ${data.patient.pharmacies[0].state}, ${data.patient.pharmacies[0].zipcode}`}
              />
              <SinglePatientDemographics
                field="Pharmacy Number"
                value={`${data.patient.pharmacies[0].phone}`}
              />
            </>
          )}
        </Box>
      </Box>

      <Flex gap={mobileBoxGap} justifyContent="center" my={3} flexDirection={mobileLayout} mx='2em'>
        <Box
          w={mobileBoxLayout}
          border="4px"
          borderColor="brand.cambridgeBlue"
          h="fit-content"
            p='1em'
        >
          <Text
            display="flex"
            justifyContent="center"
            fontSize="xl"
            lineHeight="2.3em"
            mt={2}
          >
            Chart Notes
            <IconButton
              aria-label="Add chartnote"
              onClick={onOpen}
              icon={<AddIcon />}
              size="sm"
              m={2}
            />
          </Text>
          <ChartNoteModal _id={id} isOpen={isOpen} onClose={onClose} />
          {chartNotes.map((note) => {
            return (
              <>
              <ChartNoteDetails noteId={note._id} dateCreated={note.dateCreated} subject={note.subject} noteText={note.noteText}/>
              </>
            );
          })}
        </Box>
        <Box
          w={mobileBoxLayout}
          border="4px"
          borderColor="brand.cambridgeBlue"
          h="fit-content"
          p='1em'
        >
          <Text
            fontSize="xl"
            display="flex"
            justifyContent="center"
            lineHeight="2.3em"
            mt={2}
          >
            Medication List
            {addMed ? (
              <VisuallyHidden>
                <IconButton
                  onClick={onClickMed}
                  aria-label="Add medication"
                  icon={<AddIcon />}
                  size="sm"
                  m={2}
                />
              </VisuallyHidden>
            ) : (
              <IconButton
                onClick={onClickMed}
                aria-label="Add medication"
                icon={<AddIcon />}
                size="sm"
                m={2}
              />
            )}
          </Text>
          {addMed ? (
            <Box display="flex" p={4} gap={2}>
              <Input
                onChange={handleMedChange}
                value={formState.medication}
                name="medication"
              />
              <Button onClick={onMedSubmit}>Save</Button>
              <Button color="red" onClick={() => setAddMeds(false)}>
                Cancel
              </Button>
            </Box>
          ) : null}
          <UnorderedList px={4}>
            {medications.map((med) => {
              return <ListItem key={1}>{med}</ListItem>;
            })}
          </UnorderedList>
        </Box>
      </Flex>
      <DeletePatient _id={id} />
    </Box>
  );
};

export default PatientPage;
