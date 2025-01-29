import { Box, Text, IconButton, Input, useToast } from "@chakra-ui/react";
import { CheckIcon, EditIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { isInvalidEmail }from "../../utils/validation/invalidEmail.js";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_PATIENTS } from "../../utils/queries";
import { useMutation } from "@apollo/client";
import { CHANGE_ACCOUNT_DETAILS } from "../../utils/mutations.js";


// eslint-disable-next-line react/prop-types
const  Demographics = ({ field, value, _id }) => {
  const toast = useToast();
  const [updateField, setUpdates] = useState(false);
  const [formState, setFormState] = useState({
    Email: field === "Email" ? value : '',
    Username: field === "Username" ? value : '',
    Password: field === "Password" ? value : ''
  });
  const [errorResponse, setErrorResponse] = useState(false);

  // query all patients and make sure username is not the same as one that already exists
  const { loading, error, data } = useQuery(QUERY_ALL_PATIENTS);
  const [changePatientAccountDetails] = useMutation(CHANGE_ACCOUNT_DETAILS);

  // checking for loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const onChange = (e) => {
    setFormState({
      ...formState,
      [field]: e.target.value
    });
  };

  const onClickEdit = () => {
    setUpdates(!false);
  };

  const onClickCheck = async () => {
    const updatedFields = {};
    if (formState.Email !== value && formState.Email !== "") {
      updatedFields.email = formState.Email;
    }  
    if (formState.Username !== value && formState.Username !== "") {
      updatedFields.userName = formState.Username;
    }
   if (formState.Password !== value && formState.Password !== "") {
      updatedFields.password = formState.Password;
    }
    if (formState[field] === value) {
      setUpdates(!updateField);
      return;
    }

    if (field === "Email") {
      const emailValidation = isInvalidEmail(formState.Email);
      if (emailValidation) {
        toast({
          title: "Error",
          description: `Please enter a valid email.`,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        return;
      }
    } else {
      if (formState[field] === "") {
        toast({
          title: "Error",
          description: `Please enter a value.`,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        return;
      } else {
        // check for existing user
        const existingUsers = data.allPatients;
        for (let i = 0; i < existingUsers.length; i++) {
          if (existingUsers[i].userName === formState.Username) {
            setErrorResponse(true);
            return toast({
              title: 'Error',
              description: 'Username already exists.',
              status: 'error',
              isClosable: true,
            });
          }
        }
      } 
      try {
        if (updatedFields) {
          console.log('Sending mutation with variables:', {
            _id, ...updatedFields
          });
          const result = await changePatientAccountDetails({
            variables: {
              _id,
              ...updatedFields       
            }
          });
          setUpdates(false);
          toast({
            title: 'Success',
            description: 'Successfully changed account details',
            status: 'success',
            isClosable: true,
          })
          return result
         
        }
      } catch (error) {
        console.log(error.message);
      }
      // no values changed when clicked don't do anything
    }
  };

  return (
    <>
      <Box display="flex" gap={6}>
        <Text flex={1} lineHeight="30px" fontSize='1.1em' fontWeight='bold'>
          {field}:
        </Text>
        {updateField ? (
          <Box>
            <Input       
              value={formState[field]}
              h="32px"
              variant="filled"
              flex={1}
              onChange={onChange}
              borderColor={errorResponse ? 'crimson' : 'brand.coolGray'}
              type={field === "Password" ? "password" : "text"}
            />
          </Box>
        ) : (
          <>
            <Text lineHeight="32px" fontSize='1em'>{value}</Text>{" "}
          </>
        )}
        <Box display="flex" justifyContent="flex-end">
          {field == "Email" || field == "Username" || field == "Password" || field == 'Pharmacy' || field == 'Pharmacy Number' ? (
            <IconButton
              lineHeight="32px"
              aria-label="Edit Button"
              icon={updateField ? <CheckIcon /> : <EditIcon />}
              size="sm"
              onClick={updateField ? onClickCheck : onClickEdit}
            />
          ) : (
            false
          )}
        </Box>
      </Box>
    </>
  );
};

export default Demographics;
