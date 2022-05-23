import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth_service';

import { AuthContext } from '../contexts/auth_context';
import TopNavigation from './layouts/TopNavigation';


const LoginPage = () => {
    const { logUser } = useContext(AuthContext);
    let navigate = useNavigate();
    
    const initialUser = {
        email: "",
        password: ""
    }

    const [user, setUser] = useState(initialUser);
    const [message, setMessage] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setUser({ ...user, [name] : value });
    };

    const handleLoginSubmit = (event) => {
        event.preventDefault();
        const { email, password } = user;
        
        setIsLoading(true);

        setTimeout(() => {
            if(!email.trim() || !password.trim()) 
            {
                setMessage("Inputs are required");
                setSuccessful(false);
                setIsLoading(false);
                return;
            }
            
            AuthService.login(email, password)
            .then(
                (response) => {
                    const { id, email, accessToken } = response;
                    logUser({id, email, accessToken });
                    console.log("response ==== ", response);
                    
                    setMessage(response.message);
                    setSuccessful(true);
                    setTimeout(() => {
                        navigate('/dashboard');
                        window.location.reload();
                    }, 5000);
                },
                (error) => {
                    console.log("Error ---- ", error);
                    const resMessage =
                        (error.response &&
                        error.response.data &&
                        error.response.data.error) ||
                        error.message ||
                        error.toString() || error;
                    setMessage(resMessage);
                    setSuccessful(false);
                    setIsLoading(false);
                }
            );
        },2000);
    };

    return (
        <React.Fragment>
            <header>
                <TopNavigation />
            </header>
            <main className="container-fluid"
                style={{ marginTop: "100px" }}>
                <section className="container">
                    <div className="col-md-12">
                        <div className="card m-auto" 
                            style={{ 
                                maxWidth: "400px",
                            }}>
                            <div className="card-header text-center">
                                <h2>Login</h2>
                            </div>
                            <div className="card-body">
                            {
                                message && (
                                    <div className="container-fluid mb-3">
                                        <div
                                            className={ `alert alert-${ successful ? "success":"danger" }` }
                                            role="alert">
                                            { message }
                                        </div>
                                    </div>
                                )
                            }
                            {
                                    !successful && (
                                        <form onSubmit={
                                            handleLoginSubmit
                                        }>
                                            <div className="form-floating mb-3 mt-3">
                                                <input type="email" 
                                                    className="form-control" 
                                                    id="email" 
                                                    placeholder="Enter email" 
                                                    name="email"
                                                    value={ user.email }
                                                    onChange={ handleInputChange } />
                                                <label htmlFor="email">Email</label>
                                            </div>
                                            <div className="form-floating mb-3 mt-3">
                                                <input type="password" 
                                                    className="form-control" 
                                                    id="password" 
                                                    placeholder="Enter email" 
                                                    name="password"
                                                    value={ user.password }
                                                    onChange={ handleInputChange } />
                                                <label htmlFor="password">Password</label>
                                            </div>
                                            <div className="form-group">
                                                <button type="submit"
                                                        className="btn btn-primary btn-block"
                                                        disabled={ isLoading }>
                                                    {
                                                        isLoading ? 
                                                        (<React.Fragment>
                                                            <span className="spinner-grow spinner-grow-sm"></span> Loading...
                                                        </React.Fragment>) :
                                                        (<span>Login</span>)
                                                    }
                                                </button>
                                            </div>
                                        </form>
                                )
                            }
                            </div>  
                        </div>
                    </div>
                </section>
            </main>
        </React.Fragment>
        
    );
};

export default LoginPage;