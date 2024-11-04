import {
  Box,
  Heading,
  Image,
  ListItem,
  Text,
  UnorderedList,
  useBreakpointValue,
  Icon,
} from "@chakra-ui/react";
import { FaBriefcaseMedical } from "react-icons/fa";
import { FaFileMedicalAlt } from "react-icons/fa";
import { CgPill } from "react-icons/cg";
import ContactUsBlock from "../components/ContactUsBlock";

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
    base: "0.5em",
    sm: "0.5em",
    md: "6em",
    lg: "6em",
  });
  const mobileHeading = useBreakpointValue({
    base: "center",
    sm: "center",
    md: "none",
    lg: "none",
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
        <Box
          boxSize="sm"
          px={mobilePadding}
          height="fit-content"
          w={mobileText}
        >
          <Text fontSize="1.8em" mb="1.5em" textAlign={mobileHeading}>
            About Our Provider
          </Text>
          <Image
            src="src/images/moms-headshot.png"
            objectFit="cover"
            rounded="md"
          />
          <Text textAlign="center" mt="2em" fontSize="1em" mb="3em">
            Mary Ameh, DNP, MSN, APRN, FNP-BC, PMHNP-BC
          </Text>
        </Box>
        <Box w={mobileText}>
          <Text fontSize="1.1em" mt={mobileMargin}>
            Mary Ameh is a board certified Primary and Psychiatric Nurse
            Practitioner. She focuses primarily on managing mental health
            conditions across the lifespan.
          </Text>
          <br />
          <Text fontSize="1.1em">
            Following her Undergraduate studies, she received a Master&lsquo;s
            degree from Winston Salem State University in North Carolina. She
            then completed her Doctor of Nursing Practice from East Tennessee
            State University in Johnson City Tennessee.{" "}
          </Text>
          <br />
          <Text fontSize="1.1em">
            Ameh is an ardent believer in patient centered care using Evidence
            Based Practice with Motivational approach within the safety confines
            of mental health management. Ameh also believes that the
            Patient&lsquo;s wellbeing is primary to care delivery. As such, she
            is compassionate, empathetic, and casual with her patients as
            necessary to maintain provider-patient relationships, an integral in
            planning care and effective therapeutic management.{" "}
          </Text>
          <br />

          <Heading size="md" mb="1em" textAlign={mobileHeading}>
            Conditions Managed:
          </Heading>
          <UnorderedList>
            <ListItem>Neurodevelopmental and Neurocognitive Disorders</ListItem>
            <ListItem>Anxiety and Trauma-Related Disorders</ListItem>
            <ListItem>Mood and Personality Disorders</ListItem>
            <ListItem>Dissociative and Psychotic Disorders</ListItem>
            <ListItem>Eating and Addiction Disorders</ListItem>
            <ListItem>Sexual and Gender-Related Disorders</ListItem>
          </UnorderedList>
          <br />
        </Box>
      </Box>
      <Box my={8} display="flex" justifyContent="center">
        <Icon boxSize="3em" color="brand.callToActionButtons">
          <FaBriefcaseMedical />
        </Icon>
        <Icon boxSize="3em" color="brand.callToActionButtons">
          <FaFileMedicalAlt />
        </Icon>
        <Icon boxSize="3em" color="brand.callToActionButtons">
          <CgPill />
        </Icon>
      </Box>
      <ContactUsBlock />
    </Box>
  );
};

export default About;
