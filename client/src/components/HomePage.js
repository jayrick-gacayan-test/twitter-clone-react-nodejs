import React from 'react';

import HomeBackground from '../assets/img_home_background.jpeg';

const styleWidthOne = { width: "300px" };

const HomePage = () => {
    
    return(
        <div className="d-flex w-100 align-content-stretch vw-100 vh-100">
            <div className="d-flex flex-column w-100">
                <div className="d-flex flex-lg-row-reverse flex-column h-100">
                    <div className="flex-fill p-3">
                        <div className="p-3 justify-content-center">
                            <svg xmlns="http://www.w3.org/2000/svg" 
                                fill="currentColor" 
                                className="bi bi-twitter text-info mh-100 mw-100" 
                                viewBox="0 0 16 16"
                                style={{
                                    width: "75px",
                                    height: "75px"
                                }}>
                                <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                            </svg>
                        
                            <div className="my-5">
                                <span className="display-3 fw-bold">Welcome</span>
                            </div>
                            <div className="mb-3">
                                <span className="fw-bold fs-3">Join to our community now.</span>
                            </div>
                            <div className="d-flex flex-column align-items-stretch">
                                <a  href="/register"
                                    className="btn btn-info rounded-pill text-white mw-100"
                                    style={ styleWidthOne }>
                                    Get Started
                                </a>
                                <div className="mt-5">
                                    <div className="mb-3">
                                        <span className="fw-bold fs-6">Already have an account ?</span>
                                    </div>
                                    <a  href="/login"
                                    className="btn btn-outline-light rounded-pill text-info mw-100"
                                    style={ styleWidthOne }>
                                    Log in
                                </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="position-relative flex-fill d-flex justify-content-center align-items-center">
                        <img src={ HomeBackground }
                            className="h-100 w-100"
                            style={{
                                position: "absolute",
                                top: 0,
                                zIndex: -1
                            }}
                            alt="homebackground-pic"
                             />
                        <svg xmlns="http://www.w3.org/2000/svg" 
                            fill="currentColor" 
                            className="bi bi-twitter text-white h-auto mh-100 mw-100" 
                            viewBox="0 0 16 16"
                            style={ styleWidthOne }>
                            <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                        </svg>
                    </div>
                </div>
                <div className="p-2 d-flex justify-content-center bg-light text-dark"
                    style={{
                        maxHeight:"5vh",
                    }}>
                    &#169; Copyright 2022. Twitter Clone Jayrick Gacayan.
                </div>
            </div>
        </div>
    );
}

export default HomePage;