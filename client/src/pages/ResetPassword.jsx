import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
const ResetPassword = () => {
const { id, token } = useParams();
return (
    <Box>Reset Page</Box>
)
}

export default ResetPassword;