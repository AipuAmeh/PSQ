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
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
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

  // add sticy position?
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
            />
            <MenuList>
              <MenuItem>
                <Link to="#">About</Link>
              </MenuItem>
              <MenuItem>
                <Link to="#">Services</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/contact">Contact</Link>
              </MenuItem>
              {isLoggedIn() ? (
                <>
                  <MenuItem>
                    <Link onClick={logout}>Logout</Link>
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem>
                    <Link>Sign up</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link>Login</Link>
                  </MenuItem>
                </>
              )}
            </MenuList>
          </Menu>
        </>
      ) : (
        <Box display="flex" justifyContent="flex-end" gap={5} mr={4}>
          {isLoggedIn() ? (
            <Box display="flex" flexDirection="row" gap={2}>
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
            <Link to="/#">About</Link>
          </Text>
          <Text fontSize="md" lineHeight="40px">
            <Link to="/#">Services</Link>
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
