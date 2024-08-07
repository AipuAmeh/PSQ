import { Box, Text, IconButton, Input, useToast } from "@chakra-ui/react";
import { CheckIcon, EditIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { isInvalidEmail }from "../../utils/validation/invalidEmail.js";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_PATIENTS } from "../../utils/queries";

const Demographics = ({ field, value }) => {
  const toast = useToast();
  const [updateField, setUpdates] = useState(false);
  const [valueState, setValueState] = useState(value);
  const [errorResponse, setErrorResponse] = useState(false);
  // query all patients and make sure username is not the same as one that already exists
  const { loading, error, data } = useQuery(QUERY_ALL_PATIENTS);

  // checking for loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log("ALL PATIENTS:", data);

  const onChange = (e) => {
    setValueState(e.target.value);
  };

  const onClickEdit = () => {
    setUpdates(!false);
  };

  const onClickCheck = () => {
    if (valueState === value) {
      setUpdates(!updateField);
      return;
    }

    if (field === "Email") {
      const emailValidation = isInvalidEmail(valueState);
      if (emailValidation) {
        toast({
          title: "Error",
          description: `Please enter a valid email.`,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        setValueState(value);
        return;
      }
    } else {
      if (valueState === "") {
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
          if (existingUsers[i].userName === valueState) {
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

      // no values changed when clicked don't do anything
    }
    setUpdates(!updateField);

    // change account details logic here
  };

  return (
    <>
      <Box display="flex" gap={6}>
        <Text flex={1} lineHeight="30px">
          {field}:
        </Text>
        {updateField ? (
          <Box>
            <Input
              value={valueState}
              h="32px"
              variant="filled"
              flex={1}
              onChange={onChange}
              borderColor={errorResponse ? 'crimson' : 'white'}
              type={field === "Password" ? "password" : "text"}
            />
          </Box>
        ) : (
          <>
            <Text lineHeight="32px">{value}</Text>{" "}
          </>
        )}
        <Box display="flex" flexDirection="row" justifyContent="flex-end">
          {field == "Email" || field == "Username" || field == "Password" ? (
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
