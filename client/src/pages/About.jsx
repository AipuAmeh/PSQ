import { Box, Image, Text } from "@chakra-ui/react";

const About = () => {
  return (
    <Box display="flex" alignItems='center' flexDirection="column">
      <Text fontSize="1.8em" mt="3em">
        About Our Provider
      </Text>
      <Box boxSize="sm" mt='3em' >
        <Image src="src/images/moms-headshot.png" objectFit='cover' 
       rounded='md'
       />
       <Text textAlign='center' mt='1em' fontWeight='bold'>Dr. Mary Ameh, FNP-C</Text>
      </Box>
      <Box w='60%' mb='3em'>
      <Text fontSize='1.25em'>
      Lorem ipsum odor amet, consectetuer adipiscing elit. Elementum faucibus mauris libero condimentum fames justo, conubia facilisis magna. Viverra porta quisque vel pretium diam semper id. Libero sodales convallis adipiscing non id. Etiam vitae laoreet donec imperdiet adipiscing. Eu nam aliquam eleifend justo metus.
      </Text>
      </Box>

    </Box>
  );
};

export default About;
