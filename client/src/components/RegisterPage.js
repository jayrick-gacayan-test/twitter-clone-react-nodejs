import React, { useState } from 'react';

/* services */
import AuthService from '../services/auth_service';

import RegisterBackground from '../assets/img_register_background.jpeg';

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
            
            AuthService.register(
                email.trim(),
                password.trim(),
                cfpswd.trim()
            )
            .then(
                (response) => {
                    setMessage(response.data.message);
                    setSuccessful(true);
                },
                (error) => {
                    console.log("Error ---- ", error);
                    const resMessage =
                        (error.response &&
                        error.response.data &&
                        error.response.data.error) ||
                        error.message ||
                        error.toString() || error;
                    
                    if(resMessage.cfpswd){
                        setMessage(resMessage.cfpswd[0]);
                    }else{
                    setMessage(resMessage);
                    }
                    setSuccessful(false);
                    setIsLoading(false);
                }
            );
        }, 2000);
        
    };
    
    return (
        <div className="d-flex w-100 justify-content-center align-items-center"
            style={{
                backgroundImage: `url(${ RegisterBackground})`,
                backgroundSize: "cover",
                backgroundAttachment: "fixed",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                height: "100vh"
            }}>
            <div className="card d-flex justify-content-center"
                style={{
                    width: "700px",
                    maxWidth: "80vh",
                    minWidth: "400px",

                    height: "650px",
                    maxHeight: "90vh",
                    minHeight: "400px",

                    borderRadius: "50px"

                }}>
                <div className="card-body d-flex justify-content-center">
                    <div></div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" 
                            fill="currentColor" 
                            className="bi bi-twitter text-info" 
                            viewBox="0 0 16 16"
                            style={{
                                width: "50px",
                                height: "50px",
                                maxHeight: "300px",
                                maxWidth: "300px"
                            }}>
                            <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                        </svg>
                    </div>
                    <div></div>
                    
                </div>
                <div className="card-body px-5">
                    <div className="py-3">
                        <span className="fs-2 fw-bold">Create your account</span>
                    </div>
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
                            <form id="registerForm" onSubmit={
                                handleRegisterSubmit
                            }>
                                <div className="form-floating mb-3 mt-3">
                                    <input type="email" 
                                        className="form-control px-4 rounded-pill" 
                                        id="email" 
                                        placeholder="Enter email" 
                                        name="email"
                                        value={ user.email }
                                        onChange={ handleInputChange } />
                                    <label htmlFor="email">Email</label>
                                </div>
                                <div className="form-floating mb-3 mt-3">
                                    <input type="password" 
                                        className="form-control px-4 rounded-pill" 
                                        id="password" 
                                        placeholder="Enter email" 
                                        name="password"
                                        value={ user.password }
                                        onChange={ handleInputChange } />
                                    <label htmlFor="password">Password</label>
                                </div>
                                <div className="form-floating mb-3 mt-3">
                                    <input type="password" 
                                        className="form-control px-4 rounded-pill" 
                                        id="cfpswd" 
                                        placeholder="Confirm Password" 
                                        name="cfpswd"
                                        value={ user.cfpswd }
                                        onChange={ handleInputChange } />
                                    <label htmlFor="cfpswd">Confirm Password</label>
                                </div>
                                
                            </form>
                        )
                    }
                </div>
                <div className="card-body px-5">
                    <div className="form-group mb-3 mt-3" >
                        <button type="submit" 
                                className="btn btn-info p-3 form-control text-white rounded-pill" 
                                disabled={ isLoading }
                                form="registerForm">
                            {
                                isLoading ? 
                                (<React.Fragment>
                                    <span className="spinner-grow spinner-grow-sm"></span> Loading...
                                </React.Fragment>) :
                                (<span>Register</span>)
                            }
                        </button>
                    </div>
                </div> 
            </div>
        </div>
    );
}

export default RegisterPage;