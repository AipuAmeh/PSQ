import {
  Box,
  Text,
  Spacer,
  Stack
} from "@chakra-ui/react";
import { useCurrentUserContext } from "../../utils/context/CurrentUser";
import { useQuery } from "@apollo/client";
import DashboardAvatar from "../Avatar";
import { QUERY_CURRENT_PATIENT } from "../../utils/queries";
import Demographics from "../Profile/UserDemographicsRow";

const PatientDashboard = () => {
  const { currentUser } = useCurrentUserContext();
 
    const { loading, error, data } = useQuery(QUERY_CURRENT_PATIENT, {
        variables: { patientId: currentUser._id }
      });  
const patientName = `${data.patient.firstName} ${data.patient.lastName}`;

// checking for loading and error states
if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error.message}</p>;

// formatting birthday
      const birthday = data.patient.dob;
    // check if birthday is a number, if not return
      if (isNaN(birthday)) {
        return;
      }
        const date = new Date(parseInt(birthday, 10));
          const month = date.getMonth() + 1;
          const day = date.getDate() + 1;
          const year = date.getFullYear();  
          const formattedBday = `${month}/${day}/${year}`;  
 
     

  return (
    <Box display="flex" alignItems="center" mt={6} flexDirection="column">
      <Text fontSize="2xl">Patient Portal</Text>
      <Box display="flex" flexDirection="row" gap={20} mt={10}>
        <DashboardAvatar name={patientName} />

        <Spacer />
        <Stack>
        <Text fontSize="xl" mt='3em'>
          Demographics
        </Text>
        <Demographics field={'First Name'} value={data.patient.firstName} />
        <Demographics field={'Last Name'} value={data.patient.lastName} />
        <Demographics field={'Username'} value={data.patient.userName} />
        <Demographics field={'Email'} value={data.patient.email} />
        <Demographics field={'Date of Birth'} value={formattedBday} />
        <Demographics field={'Password'} value={'******'} />
        </Stack>
  
      </Box>
 
    </Box>
  );
};

export default PatientDashboard;
