import {
  Box,
  Flex,
  Heading,
  Spacer,
  Image,
  Text,
  Button
  // useBreakpointValue
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useCurrentUserContext } from "../../utils/context/CurrentUser";

const Header = () => {
  const { isLoggedIn, logoutUser } = useCurrentUserContext();
  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    logoutUser();
    navigate('/');
  };
  // mobile development
  // const isMobile = useBreakpointValue({ base: true, md: false, sm: false });sla

  // add sticy position?
  return (
    <Flex minWidth="max-content" p={4} boxShadow="lg" alignItems='center'>
      <Box>
        {" "}
        <Link to="/">
          <Image
            boxSize="50px"
            w="100%"
            src="src/images/logo-trans.png"
            alt="psychquiconsult-logo"
            className="brand-logo-homepage"
          ></Image>
        </Link>
      </Box>
      <Spacer gap={15} />
      <Box display="flex" justifyContent="flex-end" gap={2} mr={4}>
        {isLoggedIn() ? (
          <Box display="flex" flexDirection="row" gap={2} >
            <Button onClick={logout} cursor='pointer' bg='brand.callToActionButtons'>Logout</Button>
            <Text fontSize="md" lineHeight='40px'>
              <Link to="/dashboard/">
                Dashboard
              </Link>
            </Text>
          </Box>
        ) : (
          <>
            <Text fontSize="md" lineHeight='40px'>
              <Link to="/signup" >Sign up</Link>
            </Text>
            <Text fontSize="md" lineHeight='40px'>
              <Link to="/login" >Login</Link>
            </Text>
          </>
        )}
          <Text fontSize="md" lineHeight='40px'>
              <Link to="/contact">
               Contact
              </Link>
            </Text>
      </Box>
    </Flex>
  );
};

export default Header;
