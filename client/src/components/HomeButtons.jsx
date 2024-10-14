import { Button } from "@chakra-ui/react";
import PropTypes from "prop-types";

const HomeButtons = ({ title }) => {
return (
    <Button bg="brand.homePageLoginBtns" size="lg" px={8}>
   {title}
  </Button>   
)
};

HomeButtons.propTypes = {
    title:  PropTypes.string.isRequired,
    };
    
export default HomeButtons