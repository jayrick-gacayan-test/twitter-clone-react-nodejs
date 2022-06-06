import React from 'react';

const EditProfile = () => {
    return (
        <React.Fragment>
            <div className="container-fluid py-2 px-3">
                <h4>Edit Profile</h4>
            </div>
            <hr className="m-0" />
            <div className="container-fluid py-2 px-3">
                <form>
                    <div className="form-floating mb-3 mt-3">
                        <input type="text" 
                            className="form-control" 
                            id="firstName" 
                            placeholder="Enter firstname: " 
                            name="firstName"
                            />
                        <label htmlFor="firstName">Firstname: </label>
                    </div>
                    <div className="form-floating mb-3 mt-3">
                        <input type="text" 
                            className="form-control" 
                            id="lastName" 
                            placeholder="Enter lastname: " 
                            name="lastName"
                            />
                        <label htmlFor="lastName">Lastname: </label>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-info p-3 w-50 m-auto">Update</button>
                    </div>
                </form>
            </div>
        </React.Fragment>
    );
}

export default EditProfile;

