import { Box, Image, Text, useBreakpointValue } from "@chakra-ui/react";

const About = () => {
    // breakpoints for responsiveness
    const mobileText = useBreakpointValue({ base: '100%', sm: '100%', md: '60%', lg: '60%'});
    const mobilePadding = useBreakpointValue({ base: '2em', sm: '2em', md: '1em', lg: '1em'});

  return (
    <Box display="flex" alignItems='center' flexDirection="column" px={mobilePadding}>
      <Text fontSize="1.8em" mt="3em">
        About Our Provider
      </Text>
      <Box boxSize="sm" mt='3em' px={mobilePadding} height='fit-content' >
        <Image src="src/images/moms-headshot.png" objectFit='cover' 
       rounded='md'
       />
       <Text textAlign='center' mt='2em' fontWeight='bold'>Dr. Mary Ameh, FNP-C</Text>
      </Box>
      <Box w={mobileText} mb='3em' display='flex' justifyContent='center'>
      <Text fontSize='1.25em' mt='2em'>
      Lorem ipsum odor amet, consectetuer adipiscing elit. Elementum faucibus mauris libero condimentum fames justo, conubia facilisis magna. Viverra porta quisque vel pretium diam semper id. Libero sodales convallis adipiscing non id. Etiam vitae laoreet donec imperdiet adipiscing. Eu nam aliquam eleifend justo metus.
      </Text>
      </Box>

    </Box>
  );
};

export default About;
