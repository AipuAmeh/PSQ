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
import { useMutation } from "@apollo/client";
import { EDIT_NOTE, DELETE_NOTE } from "../../utils/mutations";


const ChartNoteDetails = ({ dateCreated, subject, noteText, noteId }) => {
  const [editNote, setEditNote] = useState(false);
  // just working on editing the note text for now
  const [formState, setFormState] = useState({
    noteText: "",
  });
  const [editChartNote] = useMutation(EDIT_NOTE);
  const [deleteChartNote] = useMutation(DELETE_NOTE);

  const clickNoteEdit = () => {
    setEditNote(!false);
  };

  const handleNoteChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const clickNoteSave = async () => {
    setEditNote(false);
    console.log(formState);
  
    if (formState.noteText === noteText) {
      setEditNote(!editNote);
      return;
    }
 
    if (formState.noteText === "") {
      return;
    } else if (formState.noteText === noteText) {
      return;
    }

    try {
      const result = await editChartNote({
        variables: {
          noteId,
          ...formState
        }
      });
      setEditNote(false)
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const onClickDelete = async () => {
    try {
      const deletedNote = await deleteChartNote({
        variables: { noteId }
      });
      // what can i do to update automatically on delete
      // update cache directly
      // update: (cache) => {
      //   // Read the existing data from the cache
      //   const { notes } = cache.readQuery({ query: GET_NOTES_QUERY });

      //   // Remove the deleted note from the cache
      //   const updatedNotes = notes.filter(note => note.id !== noteId);

      //   // Write the updated notes back to the cache
      //   cache.writeQuery({
      //     query: GET_NOTES_QUERY,
      //     data: { notes: updatedNotes },
      //   });
      // },
     return deletedNote;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Card key={noteId}>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                {formattedDate(dateCreated)} {subject}
              </Heading>
              <Flex>
                {editNote ? (
                  <Input
                    size="sm"
                    onChange={handleNoteChange}
                    value={formState.noteText}
                    name="noteText"
                  />
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
                    onClick={onClickDelete}
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
  noteId: PropTypes.string.isRequired,
  dateCreated: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  noteText: PropTypes.string.isRequired,
};

export default ChartNoteDetails;
