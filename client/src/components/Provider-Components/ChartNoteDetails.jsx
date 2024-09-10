import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardBody,
  StackDivider,
  Stack,
  Heading,
  Flex,
  Input,
  Text,
  Spacer,
  IconButton,
  ButtonGroup,
} from "@chakra-ui/react";
import { EditIcon, CheckIcon, DeleteIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { formattedDate } from "../../utils/validation/formattedDate";

const ChartNoteDetails = ({ dateCreated, subject, noteText, noteId }) => {
  const [editNote, setEditNote] = useState(false);
  // just working on editing the note text for now
  const [formState, setFormState] = useState({
    noteText: '',
  });

  const clickNoteEdit = () => {
    setEditNote(true);
  };

  const handleNoteChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value
    });
  }; 

  const clickNoteSave = () => {
    setEditNote(false);
    console.log(formState);
  };



  return (
    <Box>
      <Card>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                {formattedDate(dateCreated)} {subject}
              </Heading>
              <Flex>
                {editNote ? (
                  <Input size="sm" onChange={handleNoteChange} value={formState.noteText} name='noteText' />
                ) : (
                  <Text pt="2" fontSize="sm">
                    {noteText}
                  </Text>
                )}
                <Spacer />
                <ButtonGroup gap="2">
                  {editNote ? (
                    <IconButton
                      aria-label="Save note"
                      lineHeight="32px"
                      icon={<CheckIcon />}
                      size="sm"
                      onClick={clickNoteSave}
                    />
                  ) : (
                    <IconButton
                      aria-label="Edit Chart note"
                      size="sm"
                      icon={<EditIcon />}
                      onClick={clickNoteEdit}
                    />
                  )}

                  <IconButton
                    aria-label="Delete Chart note"
                    size="sm"
                    icon={<DeleteIcon />}
                    color="red"
                  />
                </ButtonGroup>
              </Flex>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </Box>
  );
};

ChartNoteDetails.propTypes = {
  noteId: PropTypes.bool.isRequired,
  dateCreated: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  noteText: PropTypes.string.isRequired,
};

export default ChartNoteDetails;
