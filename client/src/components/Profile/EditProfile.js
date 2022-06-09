import React, { useState, useEffect } from 'react';
import TopMostContent from '../layouts/TopMostContent';
import './profile.css';

const fileImageBaseUrl = "http://localhost:3001/files";
const EditProfile = (props) => {

    const initialUserUpdate = {
        userImage: null,
        firstName: "",
        lastName: ""
    }

    const [currentUser, setCurrentUser] = useState(initialUserUpdate);

    useEffect(
        () => {
            const { user } = props;
            if(user)
                setCurrentUser({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    userImage: user.userImage && `${fileImageBaseUrl}/profile/${ user.userImage }`
                });
        },[ props ]
    );
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setCurrentUser({ ...currentUser, [name]: value })
    }

    const handleFileInputChange = (event) => {
        const { name, files } = event.target;
        console.log("Name of the input file --- ", event.target.name);
        console.log("File preview to be uploaded.... ", files)
        setCurrentUser({ ...currentUser, [name]: URL.createObjectURL(files[0])})
    }

    const handleSubmitUserUpdate = (event) => {
        event.preventDefault();

        const updateUser = {
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            userImage: event.target["userImage"].files[0]
        }
        console.log("Event ---- ", event.target["userImage"].files);

        props.handleUserUpdate(updateUser);
    }
    return (
        <React.Fragment>
            <TopMostContent title="Edit Profile" />
            <hr className="m-0"/>
            <div className="container-fluid py-2 px-3">
                <form id="updateUserForm"
                    onSubmit={ handleSubmitUserUpdate }>
                    <div className="mb-3">
                        <label htmlFor="userImage"
                            className="overlay-box d-block m-auto position-relative"
                            style={{
                                height: "200px",
                                width: "200px"
                            }}>
                            <img src={ currentUser.userImage && currentUser.userImage }
                                alt={`${ currentUser.firstName }-pic`}
                                className="rounded-circle d-block h-100 w-100"
                                />
                            <div className="overlay-content d-flex flex-column justify-content-center align-items-center">
                                <i className="d-block bi bi-camera"></i>
                                <span className="d-block">Upload Photo</span>
                            </div>
                        </label>
                        <input type="file"
                                id="userImage"
                                name="userImage" 
                                className="d-none"
                                onChange={ handleFileInputChange }
                                />
                    </div>
                    <div className="form-floating mb-3 mt-3">
                        <input type="text" 
                            className="form-control border-0 border-bottom" 
                            id="firstName" 
                            placeholder="Enter firstname: " 
                            name="firstName"
                            value={ currentUser.firstName }
                            onChange={ handleInputChange }
                            />
                        <label htmlFor="firstName">Firstname: </label>
                    </div>
                    <div className="form-floating mb-3 mt-3">
                        <input type="text" 
                            className="form-control border-0 border-bottom" 
                            id="lastName" 
                            placeholder="Enter lastname: " 
                            name="lastName"
                            value={ currentUser.lastName }
                            onChange={ handleInputChange }
                            />
                        <label htmlFor="lastName">Lastname: </label>
                    </div>
                    <div className="form-group">
                        <button type="submit"
                                className="btn btn-primary rounded-pill text-white p-3 w-50 d-block m-auto">Update</button>
                    </div>
                </form>
            </div>
        </React.Fragment>
    );
}

export default EditProfile;

