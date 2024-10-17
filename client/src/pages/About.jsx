import { Box, Heading, Image, ListItem, Text, UnorderedList, useBreakpointValue } from "@chakra-ui/react";

const About = () => {
  // breakpoints for responsiveness
  const mobileText = useBreakpointValue({
    base: "100%",
    sm: "100%",
    md: "100%",
    lg: "100%",
  });
  const mobilePadding = useBreakpointValue({
    base: "2em",
    sm: "2em",
    md: "2.5em",
    lg: "2.5em",
  });
  const mobileLayout = useBreakpointValue({
    base: "column",
    sm: "column",
    md: "row",
    lg: "row",
  });
  const mobileMargin = useBreakpointValue({
    base: '2em',
    sm: '2em',
    md: '6em',
    lg: '6em'
  });
  // add logos for nursing at the bottom of screen
  // contact us block 
  return (
    <Box>
    <Box
      display="flex"
      flexDirection={mobileLayout}
      px={mobilePadding}
      mt="4em"
    >
      <Box boxSize="sm" px={mobilePadding} height="fit-content" w={mobileText}>
        <Text fontSize="1.8em" mb="1.5em">
          About Our Provider
        </Text>
        <Image
          src="src/images/moms-headshot.png"
          objectFit="cover"
          rounded="md"
        />
        <Text textAlign="center" mt="2em" fontWeight="bold" fontSize="1em" mb="3em">
           Mary Ameh, DNP, MSN, APRN, FNP-BC, PMHNP-BC
        </Text>
      </Box>
      <Box w={mobileText} >
        <Text fontSize="1.1em" mt={mobileMargin}>
        Mary Ameh is a board certified Primary and Psychiatric Nurse Practitioner. She focuses primarily on managing mental health conditions across the lifespan. 
        </Text>
        <br />
        <Text>
        Following her Undergraduate studies, she received a Master&lsquo;s degree from Winston Salem State University in North Carolina. She then completed her Doctor of Nursing Practice from East Tennessee State University in Johnson City Tennessee. </Text>
        <br />
        <Text>
        Ameh is an ardent believer in patient centered care using Evidence Based Practice with Motivational approach within the safety confines of mental health management. Ameh also believes that the Patient&lsquo;s wellbeing is primary to care delivery. As such, she is compassionate, empathetic, and casual with her patients as necessary to maintain provider-patient relationships, an integral in planning care and effective therapeutic management. </Text>
        <br />
        <Text>
        On her days off, she enjoys hiking, reading, music, cooking, writing, watching documentaries, and trying intercontinental cuisine.
        </Text>
        <br />
        <Heading size='md'>Conditions Managed:</Heading>
        <UnorderedList>
          <ListItem>ADHD (adult and children) and Disruptive behavioral issues</ListItem>
          <ListItem>Anxiety disorders, Obsessive-Compulsive Disorders, Trauma intervention and management</ListItem>
          <ListItem>Dissociative Disorders</ListItem>
          <ListItem>Eating Disorders</ListItem>
          <ListItem>Mood Disorders: Depression, Bipolar, Cyclothymia </ListItem>
          <ListItem>Neurocognitive and neurodiverse Disorders</ListItem>
          <ListItem>Personality Disorders </ListItem>
          <ListItem>Psychotic Disorders: schizophrenia</ListItem>
          <ListItem>Sexual and Gender Identity Disorders</ListItem>
          <ListItem>Sexual Dysfunctions</ListItem>
          <ListItem>Tobacco-Related Disorders</ListItem>
          <ListItem>Drug use addiction issues</ListItem>
        </UnorderedList>
      </Box>
    </Box>
    <Box>
    
        </Box>
    </Box>


  );
};

export default About;
