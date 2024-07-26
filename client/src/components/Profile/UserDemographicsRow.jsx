import { Box, Text } from "@chakra-ui/react"

const Demographics = ({field, value}) => {
    return (
        <Box display='flex' gap={4} >
               <Text flex={1} lineHeight="30px">
        {field}:
      </Text>
      
      <Text lineHeight="32px">{value}</Text>
        </Box>
    )
}

export default Demographics;