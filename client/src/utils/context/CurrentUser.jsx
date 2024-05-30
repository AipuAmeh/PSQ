import { createContext, useContext, useState, useCallback, useMemo} from 'react';
import { useCookies } from 'react-cookie';
import { jwtDecode } from 'jwt-decode';

export const CurrentUserContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCurrentUserContext = () => useContext(CurrentUserContext);

// eslint-disable-next-line react/prop-types
export default function CurrentUserContextProvider({ children }){
const [ cookies, setCookies, removeCookies ] = useCookies(['auth_token']);

let initialUser = { isAuthenticated: false };

if (cookies.auth_token) {
    const decodedToken = jwtDecode(cookies.auth_token);
    initialUser = { ...decodedToken.data, isAuthenticated: true }
  }  

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

const contextValue = useMemo(() => 
({
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
);
}


