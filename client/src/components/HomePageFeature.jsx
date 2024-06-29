import { Box, Heading, Text } from "@chakra-ui/react";



const Features = ({ title, desc, icon, ...rest }) => {
    return (
      <Box p={5} shadow='md' borderWidth='1px' {...rest}>
        {icon}
        <Heading fontSize='xl'>{title}</Heading>
        <Text mt={4}>{desc}</Text>
      </Box>
    )
  };

  export default Features;