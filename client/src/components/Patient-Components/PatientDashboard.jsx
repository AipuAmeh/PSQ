import {
  Box,
  Text,
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Spacer,
} from "@chakra-ui/react";
import { useCurrentUserContext } from "../../utils/context/CurrentUser";
import { useToast } from "@chakra-ui/react";
import { useQuery } from "@chakra-ui/react";
import DashboardAvatar from "../Avatar";
import { QUERY_CURRENT_PATIENT } from "../../utils/queries";

const PatientDashboard = () => {
  // const toast = useToast();
  const { currentUser } = useCurrentUserContext();
  console.log(currentUser);
//   const [currentPatient] = useQuery(QUERY_CURRENT_PATIENT);
//   console.log('CURRENT PATIENT', currentPatient);
  // const welcomeMessage = () => {
  //     return toast({
  //         title: `Welcome!`,
  //         description: `Welcome back ${currentUser.userName}`,
  //         status: 'success',
  //         duration: 3000,
  //         isClosable: true,
  //     });
  // }

  return (
    <Box display="flex" alignItems="center" mt={6} flexDirection="column">
      <Text fontSize="2xl">Patient Portal</Text>
      <Box display="flex" flexDirection="row" gap={20} mt={10}>
        <DashboardAvatar name='Aipu Ameh' />
        <Spacer />
        <Text fontSize="xl" lineHeight="9em">
          Demographics
        </Text>
      </Box>
    </Box>
  );
};

export default PatientDashboard;
