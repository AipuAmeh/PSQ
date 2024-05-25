import { Box, Flex, Heading, Spacer, useBreakpointValue } from '@chakra-ui/react'
import { Link } from 'react-router-dom';



const Header = () => {
  // mobile development
  // const isMobile = useBreakpointValue({ base: true, md: false, sm: false });

  // add image for header

return (
<Flex minWidth='max-content'  mt={3}>
  <Box p='2'>
    <Heading size='md'>PsychQuiConsult</Heading>
  </Box>
  <Spacer gap={15} />
<Box display='flex' justifyContent='flex-end' gap={2} mr={4}>
  <h2>
  <Link to='/signup'>Sign Up</Link>
  </h2>
  <h2>
  <Link >Log in</Link>
  </h2>
</Box>


</Flex>
)
}

export default Header;