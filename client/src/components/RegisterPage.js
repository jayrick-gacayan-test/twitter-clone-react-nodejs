import React, { useState } from 'react';

import AuthService from '../services/auth_service';

/* components */
import TopNavigation from './layouts/TopNavigation';

const RegisterPage = () => {
    const initialUser = {
        email: "",
        password: "",
        cfpswd: ""
    };

    const [user, setUser] = useState(initialUser);
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name] : value });
    };

    const handleRegisterSubmit = (event) => {
        event.preventDefault();
        
        setIsLoading(true);

        
        
        const { email, password, cfpswd } = user;
        
        setTimeout(()=> {
            if(!email.trim() || !password.trim() || !cfpswd.trim()) 
            {
                setMessage("Inputs are required.");
                setSuccessful(false);
                setIsLoading(false);
                return;
            }

            AuthService.register(email, password)
            .then(
                (response) => {
                    setMessage(response.data.message);
                    setSuccessful(true);
                },
                (error) => {
                    console.log("Error ---- ",error);
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
        }, 2000);
        
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
                                <h2>Register</h2>
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
                                            handleRegisterSubmit
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
                                            <div className="form-floating mb-3 mt-3">
                                                <input type="password" 
                                                    className="form-control" 
                                                    id="cfpswd" 
                                                    placeholder="Confirm Password" 
                                                    name="cfpswd"
                                                    value={ user.cfpswd }
                                                    onChange={ handleInputChange } />
                                                <label htmlFor="cfpswd">Confirm Password</label>
                                            </div>
                                            <div className="form-group" >
                                                <button type="submit" 
                                                        className="btn btn-primary btn-block" 
                                                        disabled={ isLoading }>
                                                    {
                                                        isLoading ? 
                                                        (<React.Fragment>
                                                            <span className="spinner-grow spinner-grow-sm"></span> Loading...
                                                        </React.Fragment>) :
                                                        (<span>Register</span>)
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
}

export default RegisterPage;