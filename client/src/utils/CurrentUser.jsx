import { createContext, useContext } from 'react';
// import { useCookies } from 'react-cookie';
// import { jwtDecode } from 'jwt-decode';


export const CurrentUserContext = createContext();

export const useCurrentUserContext = () => useContext(CurrentUserContext);



