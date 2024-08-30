import { CheckIcon, AddIcon } from "@chakra-ui/icons";
import { Box, IconButton, Input, ListItem, UnorderedList } from "@chakra-ui/react";
import { useState } from "react";

const AddMedication = () => {
  // const [addMed, setAddMeds] = useState(false);
  // const [formState, setFormState] = useState({
  //   Medication: field === "Medication" ? value : "",
  // });
  // const handleChange = (e) => {
  //   setFormState({
  //     ...formState,
  //     [field]: e.target.value,
  //   });
  // };
  return (
    <Box>
    <IconButton
  aria-label="Add medication"
//   onClick={onOpen}
  icon={<AddIcon />}
  size="sm"
  m={2}
/>
{/* {addMed ? (
<Box>
<Input value={formState[field]} name="Medication" onChange={handleChange} type="text" />
</Box>
) : (
<>
<UnorderedList>
<ListItem>{value}</ListItem>
</UnorderedList>
</>
)} */}
{/* <Box>
<IconButton 
          aria-label="Add Medication"
          icon={addMed ? <AddIcon /> : <CheckIcon />}
          size="sm"
          m={2}
/>
</Box> */}
</Box>
  )

};

export default AddMedication;
