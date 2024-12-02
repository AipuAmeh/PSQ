import {
  Box,
  Flex,
  Spacer,
  Image,
  Text,
  Button,
  useBreakpointValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { useCurrentUserContext } from "../../utils/context/CurrentUser";

const Header = () => {
  const { isLoggedIn, logoutUser } = useCurrentUserContext();
  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    logoutUser();
    navigate("/");
  };

  // header for mobile screens
  const isMobile = useBreakpointValue({ base: true, md: false, sm: false });

  // add sticky position?
  return (
    <Flex
      minWidth="max-content"
      p={4}
      boxShadow="lg"
      alignItems="center"
      className="header"
    >
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
      {isMobile ? (
        <>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Menu Options"
              icon={<HamburgerIcon />}
              variant='outline'
            />
            <MenuList>
              <MenuItem>
                <Link to="/about">About</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/services">Services</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/contact">Contact</Link>
              </MenuItem>
              {isLoggedIn() ? (
                <>
                  <MenuItem>
                    <Link to="/dashboard">Dashboard</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link onClick={logout}>Logout</Link>
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem>
                    <Link to="/signup">Sign up</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/login">Login</Link>
                  </MenuItem>
                </>
              )}
            </MenuList>
          </Menu>
        </>
      ) : (
        <Box display="flex" justifyContent="flex-end" gap={5} mr={4}>
          {isLoggedIn() ? (
            <Box display="flex" flexDirection="row" gap={5}>
              <Button
                onClick={logout}
                cursor="pointer"
                bg="brand.callToActionButtons"
              >
                Logout
              </Button>
              <Text fontSize="md" lineHeight="40px">
                <Link to="/dashboard/">Dashboard</Link>
              </Text>
            </Box>
          ) : (
            <>
              <Text fontSize="md" lineHeight="40px">
                <Link to="/signup">Sign up</Link>
              </Text>
              <Text fontSize="md" lineHeight="40px">
                <Link to="/login">Login</Link>
              </Text>
            </>
          )}
          <Text fontSize="md" lineHeight="40px">
            <Link to="/about">About</Link>
          </Text>
          <Text fontSize="md" lineHeight="40px">
            <Link to="/services">Services</Link>
          </Text>
          <Text fontSize="md" lineHeight="40px">
            <Link to="/contact">Contact</Link>
          </Text>
        </Box>
      )}
    </Flex>
  );
};

export default Header;
