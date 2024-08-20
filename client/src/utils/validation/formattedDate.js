export const formattedDate = (newDate) => {
    if (isNaN(newDate)) {
        return
      }
      const date = new Date(parseInt(newDate, 10));
      const month = date.getMonth() + 1;
      const day = date.getDate() + 1;
      const year = date.getFullYear();
      const formattedDate = `${month}/${day}/${year}`; 
      // if day is one digit, add 0 in front of it 
      return formattedDate; 
};


// fix birthday bug to make sure birthday is formatted corrrectly with the right contraints and is accurate