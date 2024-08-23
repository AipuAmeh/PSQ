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
import ConfirmationModal from "../ConfirmationModal";
import { useDisclosure } from "@chakra-ui/react";
import { formattedDate } from "../../utils/validation/formattedDate";


const PatientDashboard = () => {
  const { currentUser } = useCurrentUserContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
    const { loading, error, data } = useQuery(QUERY_CURRENT_PATIENT, {
        variables: { patientId: currentUser._id }
      });  

// checking for loading and error states
if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error.message}</p>;

console.log(data);
if (data.patient.pharmacies[0] == undefined) {
  console.log('no pharmacy on file');
} else {
  console.log('not empty');
  console.log(data.patient.pharmacies[0]);
}
// if (data.patient.pharmacies) {
  // const pharmacy = data.patient.pharmacies[0];

  // console.log(pharmacy);
  
  // const pharmacyAddress = `${data.patient.pharmacies[0].pharmacyName} ${data.patient.pharmacies[0].address}, ${data.patient.pharmacies[0].state}, ${data.patient.pharmacies[0].zipcode}`;
  // console.log('FORMATTED ADDRESS:' + pharmacyAddress);
// } else {
//   false
// }


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
        <Demographics field={'Date of Birth'} value={formattedDate(data.patient.dob)} />
        <Demographics _id={currentUser._id} field={'Email'} value={data.patient.email} />
        <Demographics _id={currentUser._id} field={'Username'} value={data.patient.userName} />
        <Demographics _id={currentUser._id} field={'Password'} value={'******'} />
        {
        data.patient.pharmacies[0] == undefined ? (
          <>
               <Button size='md'  bg='brand.accentBtns'>Add Pharmacy</Button>
          </>
   
      ) :
        (<Demographics _id={currentUser._id} field='Pharmacy' value={`${data.patient.pharmacies[0].pharmacyName} ${data.patient.pharmacies[0].address}, ${data.patient.pharmacies[0].state}, ${data.patient.pharmacies[0].zipcode}`}/>)
         }
 
        </Stack>

      </Box>
      <Box h='20em' mt={4}>
        This is another box where i will display medications
      </Box>
      <Box display='flex' justifyContent='center' mt={8}>
      <Button onClick={onOpen} size='md' w='fit-content' bg='brand.accentBtns'>Delete My Account</Button>
      <ConfirmationModal _id={currentUser._id} isOpen={isOpen} onClose={onClose} />
      </Box>
    </Flex>
  );
};

export default PatientDashboard;
