import { Box, Text } from "@chakra-ui/react";

// eslint-disable-next-line react/prop-types
const SinglePatientDemographics = ({field, value}) => {
return (
<Box display='flex' gap={6}>
    <Text flex={1} lineHeight='30px'>{field}:</Text>
    <Text lineHeight='32px'>{value}</Text>{" "}
</Box>
)
};

export default SinglePatientDemographics;