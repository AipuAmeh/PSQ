export const formattedBday = (bday) => {
    if (isNaN(bday)) {
        return
      }
      const date = new Date(parseInt(bday, 10));
      const month = date.getMonth() + 1;
      const day = date.getDate() + 1;
      const year = date.getFullYear();
      const newBirthday = `${month}/${day}/${year}`; 
      // if day is one digit, add 0 in front of it 
      return newBirthday; 
};

