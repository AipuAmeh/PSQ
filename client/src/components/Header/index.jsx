import {
  Box,
  Flex,
  Heading,
  Spacer,
  Image,
  Text,
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
  // const isMobile = useBreakpointValue({ base: true, md: false, sm: false });

  // add image for header

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
            <Text onClick={logout} cursor='pointer'>Logout</Text>
            <Text fontSize="md">
              <Link to="/dashboard/">
                Dashboard
              </Link>
            </Text>
          </Box>
        ) : (
          <>
            <Text fontSize="md">
              <Link to="/signup">Sign up</Link>
            </Text>
            <Text fontSize="md">
              <Link to="/login">Login</Link>
            </Text>
          </>
        )}
      </Box>
    </Flex>
  );
};

export default Header;
