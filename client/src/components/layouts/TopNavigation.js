import React, { useEffect, useState } from 'react';

import AuthService from '../../services/auth_service';

const TopNavigation = () => {

    const [ currentUser, setCurrentUser ] = useState(undefined);

    useEffect(
        () => {
            const user = AuthService.getCurrentUser();

            if(user) setCurrentUser(user);
        }
        ,[]
    );

    const logOut = () => {
        AuthService.logout();
        
    };

    return (
        <nav className="navbar navbar-expand-md bg-dark navbar-dark fixed-top">
            <div className="container">
                <a className="navbar-brand"
                    href={ void(0) }>Twitter Logo</a>
                <div className="collapse navbar-collapse" id="collapsibleTopNavigation">
                    <ul className="navbar-nav me-md-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                    </ul>
                    {
                        currentUser ? 
                        (
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link" href="/dashboard">{ currentUser.email }</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/login" 
                                        onClick = { logOut }>Logout</a>
                                </li>
                            </ul>
                        ) :
                        (
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link" href="/login">Login</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/register">Register</a>
                                </li>
                            </ul>
                        )
                    }
                </div>
            </div>
        </nav>
    );
};

export default TopNavigation;
