import {
  Box,
  Text,
  Spacer,
  Stack,
  Flex,
  Button
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
// const patientName = `${data.patient.firstName} ${data.patient.lastName}`;

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
    <Flex display="flex"  mt={6} flexDirection="column">
      <Text fontSize="2xl" display='flex' justifyContent='center'>Patient Portal</Text>
      <Box display="flex" flexDirection="row" mt={10} mx='30%' >
        <DashboardAvatar name={`${data.patient.firstName} ${data.patient.lastName}`} />

        <Spacer />
        <Stack>
        <Text fontSize="2xl" mt='3em' mb='1em'>
          Demographics
        </Text>
        <Demographics  field={'Name'} value={`${data.patient.firstName} ${data.patient.lastName}`} />
        <Demographics field={'Date of Birth'} value={formattedBday} />
        <Demographics _id={currentUser._id} field={'Email'} value={data.patient.email} />
        <Demographics _id={currentUser._id} field={'Username'} value={data.patient.userName} />
        <Demographics _id={currentUser._id} field={'Password'} value={'******'} />
        </Stack>

      </Box>
      <Box display='flex' justifyContent='center' mt={8}>
      <Button size='md' w='fit-content' bg='brand.accentBtns'>Delete My Account</Button>
      </Box>

    </Flex>
  );
};

export default PatientDashboard;
