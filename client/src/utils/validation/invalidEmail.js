export const isInvalidEmail = (email) => {
    const emailFormat = /\S+@\S+\.\S+/;
    if (email.match(emailFormat) && email.length > 0) {
      return false;
    } else {
      return true;
    }
  };

  