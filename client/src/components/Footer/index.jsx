import { Box, Text, Image, Spacer, Flex } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box bg='brand.footer' className='footer'>
      <Box >

      </Box>
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent='space-around' >
      <Box display="flex" flexDirection="row" gap={10} p={4} >
        <Box>
          <Text>Sources</Text>
          <ul className="sources-list">
            <li>NIH</li>
          </ul>
        </Box>
        <Box className="vertical-line"></Box>
        <Box>
          <ul className="footer-list">
            <li>HOME</li>
            <li>ABOUT</li>
            <li>DASHBOARD</li>
          </ul>
        </Box>
      </Box>
      <Flex display="flex" min-width='max-content' alignItems='center' gap={2} border='1px' borderColor='black.400'>
      <Box w='20%' border='1px' borderColor='black.400'>
        <Image
            boxSize="50px"
            src="src/images/logo-trans.png"
            alt="psychquiconsult-logo"
            className="brand-logo-homepage"
          ></Image>
        </Box>
        <Spacer />
        <Box w='80%%' border='1px' borderColor='black.400'>
        &copy;2024 ABA Creations{" "}
        </Box>
      </Flex>
      {/* <Box display="flex"p={3} >
          <Image
            lineHeight='32px'
            boxSize="50px"
            src="src/images/logo-trans.png"
            alt="psychquiconsult-logo"
            className="brand-logo-homepage"
          ></Image>
        </Box> */}
    </Box>
    </Box>

  );
};

export default Footer;
