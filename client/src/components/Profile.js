import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import bootstrapBundle from 'bootstrap/dist/js/bootstrap.bundle';

/* Components */
import LeftSideContent from './layouts/LeftSideContent';
import RightSideContent from './layouts/RightSideContent';
import Modal from './layouts/Modal';

/* services */
import UserService from '../services/user_service';


const Profile = () => {
    const { userId } = useParams();
    

    const initialPersonName = {
        firstName: "",
        lastName: ""
    }

    const [ user, setUser ] = useState({});
    const [ personName, setPersonName ] = useState(initialPersonName);
    
    useEffect(
        () => {
            UserService.getUser(userId)
                .then(
                    (response) =>{
                        const { firstName, lastName } = response.data;
                        setUser(response.data);

                        if(firstName !== null ) setPersonName({ firstName });
                        if(lastName !== null) setPersonName({ lastName });
                    },
                    error => console.log(error)
                );
            
            
        }
        ,[ userId ]
    );

    const joinedAt = !user ? null : new Date(user.createdAt);
    
    const showModal = () => {
        const modalRef = document.getElementById('editProfileModal');

        const bsModal = new bootstrapBundle.Modal(modalRef,
                {
                    backdrop: "static",
                    keyboard: false
                }
        );

        bsModal.show();
    }

    const hideModal = () => {
        const modalRef = document.getElementById('editProfileModal');
        const bsModal= bootstrapBundle.Modal.getInstance(modalRef);
        bsModal.hide();

        const { firstName, lastName } = user;

        if(firstName !== null) setPersonName({ firstName });
        else if(lastName !== null) setPersonName({ lastName });
        else setPersonName(initialPersonName);
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setPersonName({ ...personName, [name]: value });
    }

    const handleEditProfileSubmit = (event) => {
        event.preventDefault();

        if(!personName.firstName || !personName.lastName) return;
    }

    return (
        <React.Fragment>
            
            <div className="container-fluid row">
                <LeftSideContent />
                
                <main className="col-lg-6 g-0 border border-top-0 border-bottom-0">
                    <div className="container-fluid py-2 px-3">
                        <h4>Profile</h4>
                    </div>
                    <hr className="m-0"/>
                    <div className="container-fluid py-2 px-3">
                        <button type="button" 
                            className="btn btn-outline-info rounded-pill float-end" 
                            onClick={ showModal }>Edit Profile</button>
                        <p className="font-weight-bold mt-3">
                            <span className="h4">@ { user.email }</span>
                            <span className="d-block">
                                Joined { " " }
                                { user && joinedAt.toLocaleString("default", { month: "long" }) } { " " }
                                { joinedAt.getDate() }, { joinedAt.getFullYear() } 
                            </span>
                            
                        </p>    
                    </div>
                    
                    <hr/>
                    
                </main>
                <RightSideContent />
            </div>
            <Modal idModal="editProfileModal">
                <div className="modal-header">
                    <h4 className="modal-title">Edit Profile</h4>
                    <button type="button" 
                        className="btn-close"
                        onClick={ hideModal }></button>
                </div>

                <div className="modal-body">
                    <form onSubmit={
                        handleEditProfileSubmit
                    }>
                        <div className="form-floating mb-3 mt-3">
                            <input type="text" 
                                className="form-control" 
                                id="firstName" 
                                placeholder="Enter firstname: " 
                                name="firstName"
                                value={ personName.firstName }
                                onChange={ handleInputChange } />
                            <label htmlFor="firstName">Firstname: </label>
                        </div>
                        <div className="form-floating mb-3 mt-3">
                            <input type="text" 
                                className="form-control" 
                                id="lastName" 
                                placeholder="Enter lastname: " 
                                name="lastName"
                                value={ personName.lastName }
                                onChange={ handleInputChange } />
                            <label htmlFor="lastName">Lastname: </label>
                        </div>
                        <button type="submit"
                            className="btn btn-primary text-white">Edit</button>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" 
                        className="btn btn-danger" 
                        onClick={ hideModal }>Close</button>
                </div>
            </Modal>
        </React.Fragment>
    );
}

export default Profile;