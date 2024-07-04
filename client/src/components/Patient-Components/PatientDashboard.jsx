import {
  Box,
  Text,
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Spacer,
  Stack
} from "@chakra-ui/react";
import { useCurrentUserContext } from "../../utils/context/CurrentUser";
import { useToast } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import DashboardAvatar from "../Avatar";
import { QUERY_CURRENT_PATIENT } from "../../utils/queries";
import Demographics from "../Profile/UserDemographicsRow";

const PatientDashboard = () => {
  // const toast = useToast();
  const { currentUser } = useCurrentUserContext();
  console.log(currentUser);
 
    const { loading, error, data } = useQuery(QUERY_CURRENT_PATIENT, {
        variables: { patientId: currentUser._id }
      });  
      console.log('QUERIED DATA:', data)

if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error.message}</p>;

      const formattedBirthday = new Date(data.patient.dob);
      console.log(formattedBirthday);

  return (
    <Box display="flex" alignItems="center" mt={6} flexDirection="column">
      <Text fontSize="2xl">Patient Portal</Text>
      <Box display="flex" flexDirection="row" gap={20} mt={10}>
        <DashboardAvatar name={currentUser.userName} />

        <Spacer />
        <Stack>
        <Text fontSize="xl" mt='3em'>
          Demographics
        </Text>
        <Demographics field={'First Name'} value={data.patient.firstName} />
        <Demographics field={'Last Name'} value={data.patient.lastName} />
        <Demographics field={'Username'} value={data.patient.userName} />
        <Demographics field={'Email'} value={data.patient.email} />
        <Demographics field={'Date of Birth'} value={data.patient.dob} />
        <Demographics field={'Password'} value={'******'} />
        </Stack>
  
      </Box>
 
    </Box>
  );
};

export default PatientDashboard;
