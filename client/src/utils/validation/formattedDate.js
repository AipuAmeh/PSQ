export const formattedDate = (newDate) => {
    if (isNaN(newDate)) {
        return
      }
      
      const timestamp = new Date(parseInt(newDate));
      const date = new Date(timestamp);
      const month = date.getUTCMonth() + 1;
      const day = date.getUTCDate();
      const year = date.getUTCFullYear();
      const formattedDate = `${month}/${day}/${year}`; 
      return formattedDate; 
};
