import React, { createContext, useEffect, useState } from 'react';
import AuthService from '../services/auth_service';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);
    const [ token, setToken ] = useState(null);

    const logUser = (token, user) =>{
        setToken(token);
        setUser(user);
    }

    useEffect(
        () => {

        }
        ,[]);

    return(
        <AuthContext.Provider value={ { user, logUser } }>
            { children }
        </AuthContext.Provider>
    );
};
