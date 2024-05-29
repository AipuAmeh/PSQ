import { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { jwtDecode } from 'jwt-decode';




export const CurrentUserContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCurrentUserContext = () => useContext(CurrentUserContext);

// eslint-disable-next-line react/prop-types
export default function CurrentUserContextProvider({ children }){
const [ cookies, setCookies, removeCookies ] = useCookies(['auth_token']);

let initialUser = { isAuthenticated: false };


useEffect(() => {
    if (cookies.auth_token) {
      try {
        const decodedToken = jwtDecode(cookies.auth_token);
        console.log('DECODED TOKEN', decodedToken);
        setCurrentUser({ ...decodedToken.data, isAuthenticated: true });
      } catch (error) {
        console.error('Invalid token:', error);
        // Optionally remove the invalid token
        removeCookies('auth_token');
      }
    }
  }, [cookies.auth_token, removeCookies]);
// if (cookies.auth_token) {
//     const decodedToken = jwtDecode(cookies.auth_token);
//     console.log('DECODED TOKEN', decodedToken);
//     initialUser = { ...decodedToken.data, isAuthenticated: true }
//   }

const [ currentUser, setCurrentUser ] = useState(initialUser);
const isProvider = currentUser?.providerName != undefined;

const loginUser = useCallback((user, token) => {
setCurrentUser({ ...user, isAuthenticated: true});
setCookies('auth_token', token, { 
    path: '/',
    maxAge: 60*60*24,
    secure: true,
    sameSite: 'Strict'
});
},[setCookies]);

const logoutUser = useCallback(() => {
removeCookies('auth_token', {path: '/'});
setCurrentUser({ isAuthenticated: false});
},[removeCookies]);

const isLoggedIn = useCallback(() => currentUser.isAuthenticated, [currentUser.isAuthenticated]);

const contextValue = useMemo(() => ({
    currentUser,
    isProvider,
    loginUser,
    logoutUser,
    isLoggedIn,
}),
[currentUser, isProvider, loginUser, logoutUser, isLoggedIn]);

return (
    <CurrentUserContext.Provider value={contextValue}>
        {children}
    </CurrentUserContext.Provider>
)
}


