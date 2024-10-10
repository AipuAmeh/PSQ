import { Avatar, useBreakpointValue  } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const DashboardAvatar = ({ name }) => {
    const mobileMargin = useBreakpointValue({ base: '1.2em', sm: '1.2em', md: '0.7em', lg: '0.7em'})
return (
    <Avatar bg='brand.callToActionButtons' size='2xl' name={name} mt={mobileMargin}/>
)
};

DashboardAvatar.propTypes = {
    name:  PropTypes.string.isRequired,
    };
export default DashboardAvatar;