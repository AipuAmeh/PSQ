import { Avatar  } from '@chakra-ui/react'

const DashboardAvatar = ({ name }) => {
return (
    <Avatar bg='brand.callToActionButtons' size='2xl' name={name} mt='2em' />
)
};

export default DashboardAvatar;