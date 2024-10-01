import { Box, Text, Image, Spacer, Flex, Button} from "@chakra-ui/react";
import { Link } from "react-router-dom";


// for dashboard link, make clickable only when logged in
const Footer = () => {

  return (
    <Box bg='brand.footer' className='footer'>
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent='space-around' >
      <Box display="flex" flexDirection="row" gap={10} pt={4} >
        <Box w='50%'>
          <Text as='b' fontSize='1.0em'>Sources</Text>
          <ul className="sources-list">
            <li>NIH</li>
          </ul>
        </Box>
        <Box w='10%' className="vertical-line"></Box>
        <Box w='40%'>
          <ul className="footer-list">
            <Link to='/'>  <li>HOME</li></Link>
          
            <Link to='#'>  <li>ABOUT</li></Link>
            <Link to='#'>  <li>DASHBOARD</li></Link>
            <Link to='/contact'>  <li>CONTACT</li></Link>
            <Link to='#'>  <li>SERVICES</li></Link>
          </ul>
        </Box>
      </Box>
    </Box>
      <Flex minWidth='max-content' alignItems='center' gap={2} px={5}>
        <Link to='/'>
        <Box pb={1}>
        <Image
            boxSize="45px"
            src="src/images/logo-trans.png"
            alt="psychquiconsult-logo"
            className="brand-logo-homepage"
          ></Image>
        </Box>
        </Link>

        <Spacer />
        <Link to='/contact'>
        <Box>
  <Button px={8} borderWidth='3px' borderColor='brand.homePageLoginBtns' bg='brand.homePageLoginSection'>Contact Us</Button>
</Box>
</Link>

      </Flex>

      <Box display='flex'justifyContent='center'>
          <Text fontSize='0.90em'>  &copy;2024 ABA Creations{" "}</Text>
      
        </Box>
    </Box>

  );
};

export default Footer;
