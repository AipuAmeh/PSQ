import { CheckIcon, AddIcon } from "@chakra-ui/icons";
import {
  Box,
  IconButton,
  Input,
  ListItem,
  UnorderedList,
  VisuallyHidden,
  VisuallyHiddenInput,
} from "@chakra-ui/react";
import { useState } from "react";

const AddMedication = ({ field, value, _id }) => {
  const [addMed, setAddMeds] = useState(false);
  const [formState, setFormState] = useState({
    Medication: field === "Medication" ? value : "",
  });
  const handleChange = (e) => {
    setFormState({
      ...formState,
      [field]: e.target.value,
    });
  };

  const onClickMed = () => {
    setAddMeds(true);
  };
  // click on add button and hide btn
  // show input on hide btn with save button
  // on save, show add btn again and input as list item on section
  return (
    <Box>
      <UnorderedList>
        <ListItem>{value}</ListItem>
      </UnorderedList>
    </Box>
  );
};

export default AddMedication;
