import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from './services/auth_service';

export const PrivateRoute = ({ children }) => {
    return (
        AuthService.getCurrentUser() ?
        children : <Navigate to="/" />
    );
}

export const ProtectedRoute = ({ children }) => {
    return (
        !AuthService.getCurrentUser() ?
        children : <Navigate to="/dashboard" />
    );
};