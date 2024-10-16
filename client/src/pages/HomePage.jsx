import {
  Box,
  Button,
  Flex,
  Text,
  Stack,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Features from "../components/HomePageFeature";
import { Icon } from "@chakra-ui/react";
import { PiStethoscopeDuotone } from "react-icons/pi";
import { BsClockHistory } from "react-icons/bs";
import { FaHandHoldingHeart } from "react-icons/fa6";
import { useCurrentUserContext } from "../utils/context/CurrentUser";
import HomeButtons from "../components/HomeButtons";

const HomePage = () => {
  const { isLoggedIn } = useCurrentUserContext();

  // breakpoint for all home page sections
  const siteName = useBreakpointValue({
    base: "2.2em",
    sm: "2.2em",
    md: "4em",
    lg: "5em",
  });
  const boxLayout = useBreakpointValue({
    base: "center",
    sm: "center",
    md: "space-evenly",
    lg: "space-evenly",
  });
  const boxMobileLayout = useBreakpointValue({
    base: "center",
    sm: "center",
    md: "none",
    lg: "none",
  });
  const heroDirection = useBreakpointValue({
    base: "column-reverse",
    md: "row",
    lg: "row",
  });
  const heroSize = useBreakpointValue({
    base: "30%",
    sm: "30%",
    md: "17%",
    lg: "15%",
  });
  const mobileSiteNamePadding = useBreakpointValue({
    base: "0.5em",
    sm: "0.5em",
    md: "2.5em",
    lg: "2.5em",
  });
  const howWeHelp = useBreakpointValue({
    base: "column",
    sm: "column",
    md: "row",
    lg: "row",
  });

  return (
    <Flex alignItems="center" flexDirection="column">
      <Box
        className="brand-hero"
        display="flex"
        flexDirection={heroDirection}
        justifyContent={boxLayout}
        alignItems={boxMobileLayout}
        m={6}
      >
        <Stack pt={mobileSiteNamePadding} gap={9} alignItems={boxMobileLayout}>
          <Text fontSize={siteName} textShadow="3px 3px #93B48B">
            PSYCHQUICONSULT
          </Text>
          <Text fontSize="1em">
            Bridging the gap in psychiatric management through consultation and
            integration.
          </Text>

          <Link to="/contact">
            <Button size="md" w="fit-content" bg="brand.callToActionButtons">
              Book Your Consultation Now!
            </Button>
          </Link>
        </Stack>
        <Image
          boxSize={heroSize}
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
        h="300px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        bg="brand.homePageLoginSection"
      >
        <Text fontSize="1.6em" align="center">
          New Here? Login or Sign up
        </Text>

        <Box display="flex" flexDirection="row" gap={10} mt={6}>
          {isLoggedIn() ? (
            <Link to="/">
              <HomeButtons title="Login" />
        </Link>
          ) : (
            <Link to="/login">
              <HomeButtons title="Login" />
          </Link>
          )}

          {isLoggedIn() ? (
            <Link to="/">
              <HomeButtons title="Sign up" />
            </Link>
          ) : (
            <Link to="/signup">
              <HomeButtons title="Sign up" />
            </Link>
          )}
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
        <Text fontSize="1.6em" m={6}>
          How We Help
        </Text>
        <Flex spacing={8} direction={howWeHelp} mb={6} gap={5} px={6} py='3em'>
          <Features
            icon={<Icon as={PiStethoscopeDuotone} boxSize={6} />}
            title="Consultations"
            desc="Speak directly to a healthcare provider at  your own convenience."
          />
          <Features
            icon={<Icon as={BsClockHistory} boxSize={6} />}
            title="Timely Responses"
            desc="Guaranteed quick responses between us and your Primary Care Provider."
          />
          <Features
            icon={<Icon as={FaHandHoldingHeart} boxSize={6} />}
            title="Care"
            desc="Utilize a customized treatment plan to meet your individual needs."
          />
        </Flex>
      </Box>
    </Flex>
  );
};

export default HomePage;
