import { 
  Box, 
  Flex, 
  Heading, 
  Spacer, 
  // useBreakpointValue 
} from '@chakra-ui/react'
import { Link } from 'react-router-dom';



const Header = () => {
  // mobile development
  // const isMobile = useBreakpointValue({ base: true, md: false, sm: false });

  // add image for header

return (
<Flex minWidth='max-content'  p={4}  >
  <Box p='2'>
    <Heading 
    size='md'> <Link to='/'> PsychQuiConsult</Link></Heading>
  </Box>
  <Spacer gap={15} />
<Box display='flex' justifyContent='flex-end' gap={2} mr={4}>
  <h2>
  <Link to='/signup'>Sign Up</Link>
  </h2>
  <h2>
  <Link to='/login'>Log in</Link>
  </h2>
</Box>
</Flex>
)}

export default Header;