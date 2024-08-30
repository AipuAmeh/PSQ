import { CheckIcon, AddIcon } from "@chakra-ui/icons";
import { Box, IconButton, Input, ListItem, UnorderedList,   VisuallyHidden, VisuallyHiddenInput } from "@chakra-ui/react";
import { useState } from "react";

const AddMedication = () => {
  const [addMed, setAddMeds] = useState(false);
  // const [formState, setFormState] = useState({
  //   Medication: field === "Medication" ? value : "",
  // });
  // const handleChange = (e) => {
  //   setFormState({
  //     ...formState,
  //     [field]: e.target.value,
  //   });
  // };

  const onClickMed = () => {
    setAddMeds(true);
  }
  return (
    <Box>
                {addMed ? (
<VisuallyHidden><IconButton
onClick={onClickMed}
aria-label="Add medication"
icon={<AddIcon />}
size="sm"
m={2}/></VisuallyHidden>
            ): <IconButton
            onClick={onClickMed}
            aria-label="Add medication"
            icon={<AddIcon />}
            size="sm"
            m={2}/>}

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
