import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);

    const logUser = (user) =>{
        setUser(user);
    }

    useEffect(()=>{

    }, )

    return(
        <AuthContext.Provider value={ { user, logUser } }>
            { children }
        </AuthContext.Provider>
    );
};
