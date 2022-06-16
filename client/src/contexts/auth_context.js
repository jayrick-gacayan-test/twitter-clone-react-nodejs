import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);
    const [ token, setToken ] = useState(null);

    const logUser = (token, user) =>{
        setToken(token);
        setUser(user);
    }

    const setCurrentAccount = (token, user) => {
        setToken(token);
        setUser(user);
    }

    const logoutUser = () => {
        setUser(null);
        setToken(null);
    }
    
    useEffect(
        () => {
           
        }
        ,[]);

    return(
        <AuthContext.Provider value={ { user, token, logUser, logoutUser, setCurrentAccount} }>
            { children }
        </AuthContext.Provider>
    );
};

export default AuthProvider;
