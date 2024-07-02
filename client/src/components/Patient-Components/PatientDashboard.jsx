import { Box, Text } from "@chakra-ui/react";
import { useCurrentUserContext } from "../../utils/context/CurrentUser";
import { useToast } from "@chakra-ui/react";
import { useQuery } from "@chakra-ui/react";

const PatientDashboard = () => {
    const toast = useToast();

    const { currentUser } = useCurrentUserContext();
    console.log(currentUser);

    const welcomeMessage = () => {
        return toast({
            title: `Welcome!`,
            description: `Welcome back ${currentUser.userName}`,
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    }


return (
    <Box display='flex' justifyContent='center' mt={6}>
        <Text fontSize='2xl'>Patient Portal</Text>
        {/* {welcomeMessage()} */}
    </Box>
)
};

export default PatientDashboard;