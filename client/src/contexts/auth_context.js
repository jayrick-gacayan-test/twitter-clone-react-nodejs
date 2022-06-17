import React, { createContext, useEffect, useState } from 'react';
import AuthService from '../services/auth_service';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [ authUser, setAuthUser ] = useState(null);
    const [ token, setToken ] = useState(null);

    const logUser = (token, user) =>{
        setToken(token);
        setAuthUser(user);
    }

    const logoutUser = () => {
        setAuthUser(null);
        setToken(null);
        localStorage.removeItem("user");
    }
    
    useEffect(
        () => {
            if(AuthService.getCurrentUser()){
                let { accessToken, id } = AuthService.getCurrentUser();

                if(accessToken)
                    AuthService.getAuthUser(id)
                            .then(
                                (response) => {
                                    setToken(token);
                                    setAuthUser(response.data)
                                },
                                (error) => {
                                    console.log(error);
                                } 
                            );
            }
            else localStorage.removeItem("user");
        }
        ,[ token ]);

    return(
        <AuthContext.Provider value={ { authUser, token, logUser, logoutUser } }>
            { children }
        </AuthContext.Provider>
    );
};
