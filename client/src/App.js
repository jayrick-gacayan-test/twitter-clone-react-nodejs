import React from 'react';
import { Routes, Route } from 'react-router-dom';

/* bootstrap node module */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle';

import { PrivateRoute, ProtectedRoute } from './PageRoute';

/* Components */
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';
import Profile from './components/Profile';
import Tweet from './components/Tweet';

/* context */
import { AuthProvider } from './contexts/auth_context'

function App(){
    return(
        <React.Fragment>
            <AuthProvider>
                
                <Routes>
                    <Route exact path="/" 
                        element={ <HomePage /> }/>
                    <Route path="/profile/:userId"
                        element={ <Profile /> }/>
                    <Route path="/tweets/:tweetId" 
                        element={ <Tweet /> } />
                    <Route path="/dashboard" 
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/login" 
                        element={
                            <ProtectedRoute>
                                <LoginPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/register" 
                        element={
                            <ProtectedRoute>
                                <RegisterPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*"
                        element={ <h1>404 not found</h1> }/>       
                </Routes>
            </AuthProvider>
        </React.Fragment>
    );
}

export default App;