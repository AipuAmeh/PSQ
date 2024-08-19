import PropTypes from 'prop-types';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
  } from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import { ADD_PATIENT_NOTE } from '../../utils/mutations';
import { useState } from 'react';

const ChartNoteModal = ({ _id, isOpen, onClose}) => {
    const [formState, setFormState] = useState({
        patientId: _id,
        dateCreated: '',
        subject: '',
        noteText: ''
    });
    const [errorResponse, setErrorResponse] = useState(false);
    const [addChartNoteToPatient] = useMutation(ADD_PATIENT_NOTE);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value
        });
    }

    // create chart note for specific patient
    const handleSaveNote = async () => {
        if (formState.dateCreated === '' || formState.subject === '' || formState.noteText === '') {
            setErrorResponse(true);
            return;
        }
        try {
            const chartNoteResponse = await addChartNoteToPatient({
                variables: { ...formState }
            });
            console.log(chartNoteResponse);
        } catch (error) {
            console.log(error);
        }
        setFormState('');
        onClose();
    }
       
return (
    <Box>
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <FormControl>
  <FormLabel>Consultation Date</FormLabel>
  <Input type='date' onChange={handleChange} name='dateCreated' borderColor={errorResponse ? 'crimson' : 'brand.coolGray'}/>
  <FormLabel mt={3}>Subject</FormLabel>
  <Input type='text' mb={2} placeholder='Subject' onChange={handleChange} name='subject' borderColor={errorResponse ? 'crimson' : 'brand.coolGray'}/>

  <Textarea type='text' placeholder='Note' onChange={handleChange} name='noteText' borderColor={errorResponse ? 'crimson' : 'brand.coolGray'}/>
</FormControl>
          </ModalBody>
          <ModalFooter>
            <Button  mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button bg='brand.callToActionButtons' onClick={handleSaveNote}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
)
};

ChartNoteModal.propTypes = {
    isOpen:  PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  };

export default ChartNoteModal;