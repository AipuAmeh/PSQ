export const isInvalidBday = (bday) => {
    const currentYear = new Date().getFullYear();
    const birthDate = new Date(bday);
    const bdayYear = birthDate.getFullYear();   
    // if bday year is greater than current year, error
if (bdayYear < currentYear) {
    return false;
} else {
    return true;
}
}
