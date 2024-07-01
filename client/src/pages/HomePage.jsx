import { Box, Button, Flex, Text, Stack, Image } from "@chakra-ui/react";
import Features from "../components/HomePageFeature";
import { Icon } from "@chakra-ui/react";
import { PiStethoscopeDuotone } from "react-icons/pi";
import { BsClockHistory } from "react-icons/bs";
import { FaHandHoldingHeart } from "react-icons/fa6";

const HomePage = () => {
  return (
    <Flex alignItems="center" flexDirection="column">
      <Box
        className="brand-hero"
        display="flex"
        flexDirection="row"
        justifyContent="space-evenly"
        m={6}
      >
        <Stack pt={10} gap={9}>
          <Text fontSize="6xl" textShadow="3px 3px #93B48B">
            PSYCHQUICONSULT
          </Text>
          <Text fontSize="xl">
            Bridging the gap in psychiatry management through consultation and
            integration
          </Text>
          <Button size="lg" w="fit-content" bg="brand.callToActionButtons">
            Book Consultation Now!
          </Button>
        </Stack>

        <Image
          boxSize="15%"
          src="src/images/logo-trans.png"
          alt="psychquiconsult-logo"
          className="brand-logo-homepage"
          pt={10}
          mb={6}
        ></Image>
      </Box>
      <Box
        className="login-section"
        p={8}
        w="100%"
        h='300px'
        display="flex"
        justifyContent="center"
        alignItems='center'
        flexDirection="column"
        bg="brand.homePageLoginSection"
      >
        <Text fontSize="2xl" align='center'>New Here? Login or Sign up</Text>
     
      
        <Box display="flex" flexDirection="row" gap={10} mt={6}>
          <Button bg="brand.callToActionButtons" size="lg">
            Login
          </Button>
          <Button bg="brand.callToActionButtons" size="lg">
            Sign up
          </Button>
        </Box>
      </Box>
      <Box
        border="1px"
        borderColor="gray.200"
        w="100%"
        bg="brand.homePageSecondSection"
        align="center"
        p={4}
        className="how-we-help"
      >
        <Text fontSize="2xl" m={6}>
          How We Help
        </Text>
        <Stack spacing={8} direction="row" mb={6}>
          <Features
            icon={<Icon as={PiStethoscopeDuotone} boxSize={8} />}
            title="Consultations"
            desc="Speak directly to a healthcare provider at  your own convenience"
          />
          <Features
            icon={<Icon as={BsClockHistory} boxSize={8} />}
            title="Timely Response"
            desc="Respond to e-consultations from your Primary Care Providers"
          />
          <Features
            icon={<Icon as={FaHandHoldingHeart} boxSize={8} />}
            title="Care"
            desc="Provide care and customized treatment plans to meet individual needs "
          />
        </Stack>
      </Box>
    </Flex>
  );
};

export default HomePage;
