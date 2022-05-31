import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

/* Components */
import LeftSideContent from './layouts/LeftSideContent';
import RightSideContent from './layouts/RightSideContent';
import Modal from './layouts/Modal';

/* services */
import UserService from '../services/user_service';
import AuthService from '../services/auth_service';

/* utilities */
import ModalUtility from '../utilities/modal_utility';

const Profile = () => {
    const { id } = AuthService.getCurrentUser();
    const { userId } = useParams();
    
    const initialPersonName = {
        firstName: "",
        lastName: ""
    }

    const [ user, setUser ] = useState({});
    const [ personName, setPersonName ] = useState(initialPersonName);
    const [ thereUser, hasThereUser ] = useState(false);
    const [ errorText, setErrorText ] = useState(null);
    
    useEffect(
        () => {
            UserService.getUser(userId)
                .then(
                    (response) =>{
                        const { firstName, lastName } = response.data;
                        setUser(response.data);
                        hasThereUser(true);
                        setErrorText(null);

                        if(firstName !== null && lastName !== null) setPersonName({ ...personName, firstName, lastName });
                        else{
                            if(firstName !== null) setPersonName({ ...personName, firstName });
                            else if(lastName !== null) setPersonName({ ...personName, lastName });
                        }
                    },
                    (error) => {
                        console.log("Error ---- ",error);
                        const resMessage =
                            (error.response &&
                            error.response.data &&
                            error.response.data.error) ||
                            error.message ||
                            error.toString() || error;

                        setErrorText(resMessage);
                        hasThereUser(false);
                    }
                );
        }
        ,[ userId ]
    );

    const joinedAt = !user ? null : new Date(user.createdAt);
    const firstName = user.firstName !== null ? user.firstName : "";
    const lastName = user.lastName !== null ? user.lastName : "";
    
    const openEditProfileForm = () => {
        const modalEditProfileForm = document.getElementById('editProfileModal');

        ModalUtility.showModal(modalEditProfileForm);    
    }
    const closeEditProfileForm = () => {
        const { firstName, lastName } = user;

        if(firstName !== null) setPersonName({ ...personName, firstName });
                        
        if(lastName !== null) setPersonName({ ...personName, lastName });
        else setPersonName(initialPersonName);

        const modalEditProfileForm = document.getElementById('editProfileModal');
        ModalUtility.hideModal(modalEditProfileForm);
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setPersonName({ ...personName, [name]: value });
    }

    const handleEditProfileSubmit = (event) => {
        event.preventDefault();

        if(!personName.firstName || !personName.lastName){
            alert("Input fields are required.");
            return;
        }
        
        const { firstName, lastName } = personName;
        UserService.updateProfile(userId, firstName, lastName)
            .then(
                (response) => {
                    console.log("Response ", response.data); 
                    setUser({ ...user, ...personName });
                },
                (error) => { console.log("Error ---- ", error); }
            );
        closeEditProfileForm();
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
                    {
                        errorText &&
                        (
                            <div className="container-fluid py-2 px-3">
                                <div className="alert alert-danger">
                                    { errorText }
                                </div>
                            </div>
                        )
                    }
                    {   
                        thereUser &&    
                        (
                            <div className="container-fluid py-2 px-3">
                                {
                                    id === user.id && 
                                    (
                                        <button type="button" 
                                            className="btn btn-outline-info rounded-pill float-end" 
                                            onClick={ openEditProfileForm }>Edit Profile</button>
                                    )
                                }
                                
                                <p className="font-weight-bold mt-3">
                                    <span className="fs-5 me-1 text-dark fw-bold">{ `${ firstName } ${ lastName }`}</span>
                                    <span className="lead fs-5 align-baseline">@ { user.email }</span>
                                    <span className="d-block">
                                        Joined { " " }
                                        { user && joinedAt.toLocaleString("default", { month: "long" }) } { " " }
                                        { joinedAt.getDate() }, { joinedAt.getFullYear() } 
                                    </span>
                                    
                                </p>    
                            </div>
                        )
                    }
                    <hr/>
                    
                </main>
                <RightSideContent />
            </div>
            {
                thereUser && 
                (
                    <Modal idModal="editProfileModal"
                        ariaLabel="Profile Edit">
                        <div className="modal-header">
                            <h4 className="modal-title">Edit Profile</h4>
                            <button type="button" 
                                className="btn-close"
                                onClick={ closeEditProfileForm }
                                aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
                            <form id="formProfileEdit" onSubmit={
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
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" 
                                className="btn btn-danger" 
                                onClick={ closeEditProfileForm }>Close</button>
                            <button type="submit"
                                form="formProfileEdit"
                                className="btn btn-primary">Update</button>
                        </div>
                    </Modal>
                )
            }
            
        </React.Fragment>
    );
}

export default Profile;