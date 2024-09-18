import { Box, Heading, Text } from "@chakra-ui/react";
import PropTypes from 'prop-types';



const Features = ({ title, desc, icon, ...rest }) => {
    return (
      <Box p={5} shadow='md' borderWidth='2px' {...rest} borderColor='brand.cardBorder'>
        {icon}
        <Heading fontSize='1.3em' pt={2}>{title}</Heading>
        <Text mt={4}>{desc}</Text>
      </Box>
    )
  };

  Features.propTypes = {
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  }
  export default Features;