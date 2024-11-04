import { Box, FormControl, Text, Input, Textarea } from "@chakra-ui/react";



const ContactUsBlock = () => {
return (
    <Box display='flex' justifyContent='center' bg='brand.mintCream' my='3em' borderColor='brand.coolGray'>
        <Box w='40%'>
            <Text fontSize='2em'> Get In Touch With Us</Text>
            <Text>
            Lorem ipsum odor amet, consectetuer adipiscing elit. Magna maecenas commodo blandit rhoncus; condimentum nulla eu. Sed lobortis netus dis, metus et dis? Nisi donec malesuada amet congue bibendum nibh fusce. Et metus tempor metus magna mauris efficitur leo. Ullamcorper finibus habitasse volutpat erat mi ultricies magna luctus neque. Venenatis cras et efficitur accumsan fusce ornare aenean.
            </Text>
           
        </Box>
        <Box w='40%'>
            <FormControl>
                <Input />
                <Input />
                <Textarea />
            </FormControl>
        </Box>
    </Box>
)

}

export default ContactUsBlock;