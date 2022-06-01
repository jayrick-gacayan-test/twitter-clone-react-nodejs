import React, { useState, useEffect } from "react";
import UserService from "../../services/user_service";

import FollowerList from "../Follower/FollowerList";


const RightSideContent = () => {

    const [users, setUsers] = useState([]);
    
    useEffect(
        () =>
        {
            fetchAllUsers();
        }
        ,[]
    );

    const fetchAllUsers = () => {
        UserService.getAllUsers()
            .then(
                (response) => {
                    console.log("Users --- ", response.data);
                    setUsers(response.data);
                },
                (error) => {
                    console.log("Error ---- ",error);
                    
                }
            );
    }


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
            {
            
            <div className="card bg-light mb-3 rounded-3">
                <div className="card-header bg-light">
                    <h5>Who to follow</h5>
                </div>
                <div className="card-body">
                    <ul className="list-group list-group-flush d-flex">
                        <FollowerList users={ users }/>
                    </ul>
                </div>
            </div>
            }
        </aside>
    );
}

export default RightSideContent;