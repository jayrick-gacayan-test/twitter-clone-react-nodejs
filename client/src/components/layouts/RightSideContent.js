import React from "react";

import DummyImage from "./DummyImage";
const RightSideContent = () => {
    return (
        <aside className='col-3 py-3 d-none d-lg-block'>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text bg-light"
                        style={{
                            borderTopLeftRadius: "50rem",
                            borderBottomLeftRadius: "50rem"
                        }} >
                        <i className="bi bi-search"></i>
                    </span>
                </div>
                <input type="text"
                    className="form-control bg-light border border-start-0"
                    style={{
                        borderTopRightRadius: "50rem",
                        borderBottomRightRadius: "50rem"
                    }} 
                    placeholder="Search Twitter"
                    onChange={ null }/>
                
            </div>
            <div className="card bg-light mb-3 rounded-3">
                <div className="card-header bg-light">
                    <h5>Who to follow</h5>
                </div>
                <div className="card-body">
                    <ul className="list-group list-group-flush d-flex">
                        <li className="list-group-item d-flex bg-light">
                            <div className="me-2">
                                <DummyImage 
                                    className="bg-light text-dark"
                                    style={{
                                        width: "60px",
                                        height: "60px",
                                        maxWidth: "60px",
                                        maxHeight: "60px",
                                    }}
                                />
                            </div>
                            <div className="flex-grow-1">
                                <div className="d-flex flex-xl-row">
                                    <div className="">
                                        <p className="font-weight-bold">Name
                                            <a className="text-secondary d-block text-decoration-none" 
                                                href="#">Link username</a>
                                        </p>
                                    </div>
                                    <div className="ms-xl-auto">
                                        <button className="btn btn-outline-info">Follow</button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </aside>
    );
}

export default RightSideContent;