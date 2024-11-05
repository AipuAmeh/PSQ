import { Box, Text,Button } from "@chakra-ui/react";
import { Link } from "react-router-dom"



const ContactUsBlock = () => {
return (
    <Box display='flex' justifyContent='center'>
<Box display='flex' flexDirection='column' alignItems='center' py='1.5em' bg='brand.cambridgeBlue' w='90%' p='3em'>
 <Text fontSize='1em' mb='1em'>INTERESTED IN LEARNING MORE?</Text>
 <Text fontSize='1.5em' fontWeight='bold' mb='1em'>Schedule a Consultation Now</Text>
 <Link to='/contact'>
 <Button w='fit-content' size='lg' bg='brand.mintCream'> Contact Us Today!</Button>
 </Link>

</Box>
    </Box>

)

}

export default ContactUsBlock;